"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Twitter, MessageCircle, ExternalLink, Copy, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { useWeb3 } from "@/hooks/use-web3"
import { Progress } from "@/components/ui/progress"
import { ConfettiCelebration } from "@/components/confetti-celebration"

export function ParticipationInstructions() {
  const { toast } = useToast()
  const { address, isConnected } = useWeb3()

  // Estado para rastrear as tarefas
  const [tasks, setTasks] = useState({
    twitter_follow: { completed: false, username: "", verifying: false },
    twitter_retweet: { completed: false, link: "", verifying: false },
    twitter_like: { completed: false, verifying: false },
    telegram_join: { completed: false, username: "", verifying: false },
  })

  // Estado para o código de referência
  const [referralCode, setReferralCode] = useState("")

  // Estado para o processo de reivindicação
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimProgress, setClaimProgress] = useState(0)
  const [claimSuccess, setClaimSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Calcular progresso das tarefas
  const completedTasks = Object.values(tasks).filter((task) => task.completed).length
  const totalTasks = Object.keys(tasks).length
  const taskProgress = Math.round((completedTasks / totalTasks) * 100)

  // Verificar se todas as tarefas foram concluídas
  const allTasksCompleted = Object.values(tasks).every((task) => task.completed)

  // Carregar estado das tarefas do localStorage
  useEffect(() => {
    if (isConnected && address) {
      const savedTasks = localStorage.getItem(`tasks_${address.toLowerCase()}`)
      if (savedTasks) {
        try {
          setTasks(JSON.parse(savedTasks))
        } catch (e) {
          console.error("Erro ao carregar tarefas:", e)
        }
      }

      // Carregar código de referência
      const savedReferralCode = localStorage.getItem(`referral_${address.toLowerCase()}`)
      if (savedReferralCode) {
        setReferralCode(savedReferralCode)
      }

      // Verificar se já reivindicou com sucesso anteriormente
      const hasClaimedBefore = localStorage.getItem(`claim_success_${address.toLowerCase()}`) === "true"
      if (hasClaimedBefore) {
        setClaimSuccess(true)
      }
    }
  }, [isConnected, address])

  // Salvar estado das tarefas no localStorage
  useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem(`tasks_${address.toLowerCase()}`, JSON.stringify(tasks))
    }
  }, [tasks, isConnected, address])

  // Salvar código de referência no localStorage
  useEffect(() => {
    if (isConnected && address && referralCode) {
      localStorage.setItem(`referral_${address.toLowerCase()}`, referralCode)
    }
  }, [referralCode, isConnected, address])

  // Função para atualizar o estado de uma tarefa
  const updateTask = (taskId, data) => {
    setTasks((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        ...data,
      },
    }))
  }

  // Função para verificar uma tarefa
  const verifyTask = async (taskId) => {
    if (!isConnected) {
      toast({
        title: "Carteira não conectada",
        description: "Conecte sua carteira para verificar as tarefas.",
        variant: "destructive",
      })
      return
    }

    // Iniciar verificação
    updateTask(taskId, { verifying: true })

    try {
      // Simulação de verificação com atraso para melhor UX
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Marcar tarefa como concluída (em produção, isso seria verificado via API)
      updateTask(taskId, { completed: true, verifying: false })

      toast({
        title: "Verificação concluída!",
        description: "Tarefa verificada com sucesso.",
      })
    } catch (error) {
      console.error("Erro na verificação:", error)
      updateTask(taskId, { verifying: false })

      toast({
        title: "Erro na verificação",
        description: "Não foi possível verificar a tarefa. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  // Função para reivindicar tokens
  const claimTokens = async () => {
    if (!isConnected) {
      toast({
        title: "Carteira não conectada",
        description: "Conecte sua carteira para reivindicar tokens.",
        variant: "destructive",
      })
      return
    }

    if (!allTasksCompleted) {
      toast({
        title: "Tarefas incompletas",
        description: "Complete todas as tarefas antes de reivindicar tokens.",
        variant: "destructive",
      })
      return
    }

    setIsClaiming(true)
    setClaimProgress(0)

    // Atualizar o progresso durante a reivindicação
    const progressInterval = setInterval(() => {
      setClaimProgress((prev) => {
        if (prev < 95) return prev + 1
        return prev
      })
    }, 100)

    try {
      // Simulação de reivindicação com atraso para melhor UX
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Completar o progresso
      setClaimProgress(100)

      // Mostrar confetes
      setShowConfetti(true)

      // Marcar como reivindicado com sucesso
      setClaimSuccess(true)

      // Salvar no localStorage
      if (address) {
        localStorage.setItem(`claim_success_${address.toLowerCase()}`, "true")
      }

      toast({
        title: "Tokens reivindicados!",
        description: "Seus tokens foram reivindicados com sucesso e serão enviados para sua carteira em breve.",
      })
    } catch (error) {
      console.error("Erro na reivindicação:", error)

      toast({
        title: "Erro na reivindicação",
        description: "Não foi possível reivindicar os tokens. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      clearInterval(progressInterval)
      setIsClaiming(false)
    }
  }

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Instruções para Participantes</AlertTitle>
        <AlertDescription>
          Siga estas etapas para participar do airdrop Street Dog Coin e ter a chance de receber tokens gratuitos.
        </AlertDescription>
      </Alert>

      {!isConnected ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Conecte sua carteira para participar do airdrop.</AlertDescription>
        </Alert>
      ) : claimSuccess ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Reivindicação bem-sucedida!</AlertTitle>
          <AlertDescription>
            Seus tokens foram reivindicados com sucesso. Eles serão enviados para sua carteira em breve.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Barra de progresso das tarefas */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Progresso das tarefas</h3>
              <span className="text-sm font-medium">{taskProgress}%</span>
            </div>
            <Progress value={taskProgress} className="h-2" />
          </div>

          <TaskSection
            title="Tarefa 1: Seguir no Twitter"
            icon={Twitter}
            completed={tasks.twitter_follow.completed}
            steps={[
              <>
                Siga{" "}
                <a
                  key="twitter-link"
                  href="https://x.com/StreetDogCoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  @StreetDogCoin <ExternalLink className="inline h-4 w-4" />
                </a>
              </>,
              <Input
                key="twitter-input"
                placeholder="Digite seu nome de usuário do Twitter"
                value={tasks.twitter_follow.username}
                onChange={(e) => updateTask("twitter_follow", { username: e.target.value })}
                disabled={tasks.twitter_follow.completed}
              />,
              <Button
                key="twitter-verify"
                className="w-full mt-2"
                onClick={() => verifyTask("twitter_follow")}
                disabled={
                  tasks.twitter_follow.verifying || tasks.twitter_follow.completed || !tasks.twitter_follow.username
                }
              >
                {tasks.twitter_follow.verifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : tasks.twitter_follow.completed ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verificado
                  </>
                ) : (
                  "Enviar para verificação"
                )}
              </Button>,
            ]}
          />

          <TaskSection
            title="Tarefa 2: Retweet com Hashtags"
            icon={Twitter}
            completed={tasks.twitter_retweet.completed}
            steps={[
              <>
                Faça um quote retweet do{" "}
                <a
                  key="retweet-link"
                  href="https://x.com/StreetDogCoin/status/1829273641130873292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  tweet do Street Dog Coin <ExternalLink className="inline h-4 w-4" />
                </a>{" "}
                com as hashtags:
                <div key="hashtags" className="mt-2 p-3 bg-muted rounded-md text-sm">
                  #airdrop #Dogecoin #eth #ShibaInu #mainnet #pepecoin #web3 #crypto #arbitrum #OFFICIALTRUMP #memecoins
                  #StreetDogCoin #CryptoForACause #DogAdoption #BlockchainForGood #CryptoWithPurpose
                  #SupportAnimalRescue #DogRescue #StreetDogs #CharityCrypto #DogLovers
                </div>
                <Button
                  key="copy-hashtags-button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    const hashtags =
                      "#airdrop #Dogecoin #eth #ShibaInu #mainnet #pepecoin #web3 #crypto #arbitrum #OFFICIALTRUMP #memecoins #StreetDogCoin #CryptoForACause #DogAdoption #BlockchainForGood #CryptoWithPurpose #SupportAnimalRescue #DogRescue #StreetDogs #CharityCrypto #DogLovers"
                    navigator.clipboard.writeText(hashtags)
                    toast({
                      title: "Copiado!",
                      description: "Hashtags copiadas para a área de transferência.",
                      duration: 3000,
                    })
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar Hashtags
                </Button>
              </>,
              <Input
                key="retweet-input"
                placeholder="Cole o link do seu retweet"
                value={tasks.twitter_retweet.link}
                onChange={(e) => updateTask("twitter_retweet", { link: e.target.value })}
                disabled={tasks.twitter_retweet.completed}
              />,
              <Button
                key="retweet-verify"
                className="w-full mt-2"
                onClick={() => verifyTask("twitter_retweet")}
                disabled={
                  tasks.twitter_retweet.verifying || tasks.twitter_retweet.completed || !tasks.twitter_retweet.link
                }
              >
                {tasks.twitter_retweet.verifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : tasks.twitter_retweet.completed ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verificado
                  </>
                ) : (
                  "Enviar para verificação"
                )}
              </Button>,
            ]}
          />

          <TaskSection
            title="Tarefa 3: Curtir no Twitter"
            icon={Twitter}
            completed={tasks.twitter_like.completed}
            steps={[
              <>
                Curta o{" "}
                <a
                  key="like-link"
                  href="https://x.com/intent/like?tweet_id=1829273641130873292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  tweet do Street Dog Coin <ExternalLink className="inline h-4 w-4" />
                </a>
              </>,
              <Button
                key="like-verify"
                className="w-full mt-2"
                onClick={() => verifyTask("twitter_like")}
                disabled={tasks.twitter_like.verifying || tasks.twitter_like.completed}
              >
                {tasks.twitter_like.verifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : tasks.twitter_like.completed ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verificado
                  </>
                ) : (
                  "Verificar curtida"
                )}
              </Button>,
            ]}
          />

          <TaskSection
            title="Tarefa 4: Entrar no Grupo do Telegram"
            icon={MessageCircle}
            completed={tasks.telegram_join.completed}
            steps={[
              <>
                Entre no{" "}
                <a
                  key="telegram-group-link"
                  href="https://t.me/StreetDogCoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  grupo do Telegram do Street Dog Coin <ExternalLink className="inline h-4 w-4" />
                </a>
              </>,
              <>
                Obtenha seu ID de usuário do Telegram (use{" "}
                <a
                  key="telegram-userinfo-link"
                  href="https://t.me/userinfobot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  @userinfobot <ExternalLink className="inline h-4 w-4" />
                </a>
                )
              </>,
              <Input
                key="telegram-input"
                placeholder="Digite seu ID do Telegram (ex: 6123567677)"
                value={tasks.telegram_join.username}
                onChange={(e) => updateTask("telegram_join", { username: e.target.value })}
                disabled={tasks.telegram_join.completed}
              />,
              <Button
                key="telegram-verify"
                className="w-full mt-2"
                onClick={() => verifyTask("telegram_join")}
                disabled={
                  tasks.telegram_join.verifying || tasks.telegram_join.completed || !tasks.telegram_join.username
                }
              >
                {tasks.telegram_join.verifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : tasks.telegram_join.completed ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verificado
                  </>
                ) : (
                  "Enviar para verificação"
                )}
              </Button>,
            ]}
          />

          {/* Campo de código de referência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Código de Referência (Opcional)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Se você foi convidado por alguém, insira o endereço da carteira deles para que ambos recebam um bônus.
              </p>
              <Input
                placeholder="Endereço da carteira do referenciador (0x...)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </CardContent>
          </Card>

          <Alert className={`mt-8 ${allTasksCompleted ? "bg-green-50 border-green-200" : ""}`}>
            <CheckCircle className={`h-4 w-4 ${allTasksCompleted ? "text-green-500" : ""}`} />
            <AlertTitle>Reivindicar Airdrop</AlertTitle>
            <AlertDescription>
              {allTasksCompleted
                ? "Todas as tarefas foram concluídas! Você já pode reivindicar seus tokens."
                : "Após completar todas as tarefas, você poderá reivindicar seus tokens do airdrop. Certifique-se de ter uma carteira compatível conectada para receber os tokens."}
            </AlertDescription>
          </Alert>

          {isClaiming ? (
            <div className="space-y-4 mt-8">
              <div className="text-center mb-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                <p>Processando sua reivindicação...</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{claimProgress}%</span>
                </div>
                <Progress value={claimProgress} className="h-2 bg-primary/10" />
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Por favor, não feche esta janela. Você precisará confirmar a transação em sua carteira.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Button
                size="lg"
                onClick={claimTokens}
                disabled={!allTasksCompleted}
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
              >
                Reivindicar Airdrop
              </Button>
            </div>
          )}
        </>
      )}

      <ConfettiCelebration trigger={showConfetti} duration={5000} />
    </motion.div>
  )
}

function TaskSection({
  title,
  icon: Icon,
  completed,
  steps,
}: { title: string; icon: any; completed?: boolean; steps: React.ReactNode[] }) {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className={completed ? "border-green-200 bg-green-50/30" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className={`h-6 w-6 ${completed ? "text-green-500" : ""}`} />
            {title}
            {completed && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-4">
            {steps.map((step, index) => (
              <motion.li
                key={index}
                className="text-muted-foreground"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {step}
              </motion.li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </motion.div>
  )
}

