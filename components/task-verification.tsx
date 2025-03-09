"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useWeb3 } from "@/hooks/use-web3"
import { CheckCircle, AlertCircle, ExternalLink, Loader2 } from "lucide-react"

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

type Task = {
  id: string
  title: string
  description: string
  link?: string
  completed: boolean
  required: boolean
}

export function TaskVerification({ onComplete }: { onComplete: (completed: boolean) => void }) {
  const { address, isConnected } = useWeb3()
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "telegram",
      title: "Entrar no grupo do Telegram",
      description: "Entre no grupo oficial do Telegram e permaneça até o final do airdrop.",
      link: "https://t.me/webytecoin",
      completed: false,
      required: true,
    },
    {
      id: "twitter",
      title: "Seguir no Twitter",
      description: "Siga a conta oficial da WebyteCoin no Twitter.",
      link: "https://twitter.com/webytecoin",
      completed: false,
      required: true,
    },
    {
      id: "retweet",
      title: "Compartilhar no Twitter",
      description: "Compartilhe o post do airdrop no Twitter.",
      link: "https://twitter.com/webytecoin/status/airdrop",
      completed: false,
      required: true,
    },
    {
      id: "discord",
      title: "Entrar no Discord",
      description: "Entre no servidor Discord da comunidade.",
      link: "https://discord.gg/webytecoin",
      completed: false,
      required: false,
    },
  ])
  const [isVerifying, setIsVerifying] = useState(false)
  const [allCompleted, setAllCompleted] = useState(false)

  // Carregar estado das tarefas do localStorage
  useEffect(() => {
    if (isConnected && address) {
      const savedTasks = localStorage.getItem(`tasks_${address.toLowerCase()}`)
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks)
          setTasks(parsedTasks)

          // Verificar se todas as tarefas obrigatórias estão completas
          const requiredCompleted = parsedTasks
            .filter((task: Task) => task.required)
            .every((task: Task) => task.completed)

          setAllCompleted(requiredCompleted)
          onComplete(requiredCompleted)
        } catch (e) {
          console.error("Erro ao carregar tarefas:", e)
        }
      }
    }
  }, [isConnected, address, onComplete])

  // Salvar estado das tarefas no localStorage
  useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem(`tasks_${address.toLowerCase()}`, JSON.stringify(tasks))

      // Verificar se todas as tarefas obrigatórias estão completas
      const requiredCompleted = tasks.filter((task) => task.required).every((task) => task.completed)

      setAllCompleted(requiredCompleted)
      onComplete(requiredCompleted)
    }
  }, [tasks, isConnected, address, onComplete])

  const handleTaskToggle = (taskId: string, completed: boolean) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, completed } : task)))
  }

  const handleVerifyAll = async () => {
    if (!isConnected) {
      toast({
        title: "Carteira não conectada",
        description: "Conecte sua carteira para verificar as tarefas.",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)

    try {
      // Simulação de verificação com atraso para melhor UX
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Marcar todas as tarefas como concluídas (em produção, isso seria verificado via API)
      setTasks((prevTasks) => prevTasks.map((task) => ({ ...task, completed: true })))

      toast({
        title: "Verificação concluída!",
        description: "Todas as tarefas foram verificadas com sucesso.",
      })
    } catch (error) {
      console.error("Erro na verificação:", error)
      toast({
        title: "Erro na verificação",
        description: "Não foi possível verificar as tarefas. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  if (!isConnected) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Conecte sua carteira para acessar as tarefas de participação.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="border-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 z-0"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Tarefas de Participação
        </CardTitle>
        <CardDescription>Complete as tarefas abaixo para participar do airdrop.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-2 p-3 rounded-md border border-primary/10 hover:border-primary/30 transition-colors"
          >
            <Checkbox
              id={task.id}
              checked={task.completed}
              onCheckedChange={(checked) => handleTaskToggle(task.id, checked === true)}
              className="mt-1"
            />
            <div className="space-y-1 flex-1">
              <label
                htmlFor={task.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                {task.title}
                {task.required && <span className="text-red-500 ml-1">*</span>}
                {task.completed && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
              </label>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              {task.link && (
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline flex items-center mt-1"
                >
                  Acessar <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between relative z-10">
        <div className="text-sm text-muted-foreground">
          {allCompleted ? (
            <span className="text-green-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" /> Todas as tarefas obrigatórias concluídas
            </span>
          ) : (
            <span>* Tarefas obrigatórias</span>
          )}
        </div>
        <Button
          onClick={handleVerifyAll}
          disabled={isVerifying || allCompleted}
          className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verificando...
            </>
          ) : allCompleted ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Verificado
            </>
          ) : (
            "Verificar Tarefas"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

