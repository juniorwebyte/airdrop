"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useWeb3 } from "@/hooks/use-web3"
import { getContractAddress } from "@/utils/constants"
import { AlertCircle, CheckCircle, Loader2, ExternalLink, Gift } from "lucide-react"
import { claimAirdrop } from "@/lib/airdrop"
import { ConfettiCelebration } from "@/components/confetti-celebration"

// Componente de animação para fade-in
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type TokenClaimProps = {
  referrer?: string
  tasksCompleted: boolean
  onClaimSuccess: () => void
}

export function TokenClaim({ referrer, tasksCompleted, onClaimSuccess }: TokenClaimProps) {
  const { address, isConnected, web3, chainId } = useWeb3()
  const { toast } = useToast()
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimProgress, setClaimProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // Resetar o progresso quando o componente é montado
  useEffect(() => {
    setClaimProgress(0)
    setError(null)
    setTxHash(null)
  }, [])

  // Atualizar o progresso durante a reivindicação
  useEffect(() => {
    if (isClaiming) {
      const interval = setInterval(() => {
        setClaimProgress((prev) => {
          // Aumentar o progresso gradualmente até 95% (os últimos 5% são para a confirmação da transação)
          if (prev < 95) {
            return prev + 1
          }
          return prev
        })
      }, 150)

      return () => clearInterval(interval)
    }
  }, [isClaiming])

  const handleClaim = async () => {
    if (!isConnected || !address || !web3) {
      toast({
        title: "Carteira não conectada",
        description: "Conecte sua carteira para reivindicar tokens.",
        variant: "destructive",
      })
      return
    }

    if (!tasksCompleted) {
      toast({
        title: "Tarefas incompletas",
        description: "Complete todas as tarefas obrigatórias antes de reivindicar tokens.",
        variant: "destructive",
      })
      return
    }

    setIsClaiming(true)
    setError(null)
    setClaimProgress(0)

    try {
      // Verificar se estamos em ambiente de desenvolvimento
      if (process.env.NODE_ENV === "development") {
        // Simulação para desenvolvimento
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Simular hash de transação
        const simulatedTxHash = `0x${Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")}`
        setTxHash(simulatedTxHash)
        setClaimProgress(100)

        // Mostrar confetes
        setShowConfetti(true)

        // Notificar sucesso
        toast({
          title: "Tokens reivindicados!",
          description: "Seus tokens foram reivindicados com sucesso (simulação).",
        })

        // Chamar callback de sucesso
        onClaimSuccess()
      } else {
        // Implementação real para produção
        const contractAddress = getContractAddress(chainId || 1)

        if (!contractAddress) {
          throw new Error("Endereço do contrato não configurado para esta rede.")
        }

        // Chamar a função de reivindicação
        const result = await claimAirdrop(address, web3, contractAddress, referrer)

        if (result && result.success) {
          setTxHash(result.txHash)
          setClaimProgress(100)
          setShowConfetti(true)

          toast({
            title: "Tokens reivindicados!",
            description: "Seus tokens foram reivindicados com sucesso.",
          })

          onClaimSuccess()
        } else {
          throw new Error("Falha na reivindicação. Tente novamente.")
        }
      }
    } catch (err) {
      console.error("Erro ao reivindicar tokens:", err)
      setError(err instanceof Error ? err.message : "Erro desconhecido ao reivindicar tokens")

      toast({
        title: "Erro na reivindicação",
        description: err instanceof Error ? err.message : "Erro desconhecido ao reivindicar tokens",
        variant: "destructive",
      })
    } finally {
      setIsClaiming(false)
    }
  }

  const getExplorerLink = () => {
    if (!txHash) return "#"

    // Determinar o explorador correto com base na rede
    let baseUrl = "https://etherscan.io/tx/"

    if (chainId) {
      switch (chainId) {
        case 56: // BSC
          baseUrl = "https://bscscan.com/tx/"
          break
        case 137: // Polygon
          baseUrl = "https://polygonscan.com/tx/"
          break
        case 5: // Goerli
          baseUrl = "https://goerli.etherscan.io/tx/"
          break
        case 97: // BSC Testnet
          baseUrl = "https://testnet.bscscan.com/tx/"
          break
      }
    }

    return `${baseUrl}${txHash}`
  }

  return (
    <Card className="border-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 z-0"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Reivindicar Tokens
        </CardTitle>
        <CardDescription>Reivindique seus tokens $WBC do airdrop da WebyteCoin.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        {!isConnected ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Conecte sua carteira para reivindicar tokens.</AlertDescription>
          </Alert>
        ) : !tasksCompleted ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Complete todas as tarefas obrigatórias para reivindicar tokens.</AlertDescription>
          </Alert>
        ) : txHash ? (
          <>
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Reivindicação bem-sucedida!</AlertTitle>
              <AlertDescription>
                Seus tokens foram reivindicados com sucesso. Eles serão enviados para sua carteira em breve.
              </AlertDescription>
            </Alert>

            <div className="flex justify-center">
              <a
                href={getExplorerLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center"
              >
                Ver transação no explorador <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>

            <ConfettiCelebration trigger={showConfetti} duration={5000} />
          </>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro na reivindicação</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : isClaiming ? (
          <div className="space-y-4">
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
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-primary/10">
              <div className="flex justify-between mb-2">
                <span>Tokens a receber:</span>
                <span className="font-bold">1000 $WBC</span>
              </div>

              {referrer && (
                <div className="flex justify-between">
                  <span>Bônus de referral:</span>
                  <span className="font-bold">+200 $WBC</span>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Ao reivindicar, você confirma que leu e concorda com os{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                Termos e Condições
              </a>
              .
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="relative z-10">
        {!txHash && !isClaiming && (
          <Button
            className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            onClick={handleClaim}
            disabled={!isConnected || !tasksCompleted || isClaiming}
          >
            Reivindicar Tokens
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

