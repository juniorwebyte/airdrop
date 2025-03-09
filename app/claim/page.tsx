"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WalletIntegration } from "@/components/wallet-integration"
import { TaskVerification } from "@/components/task-verification"
import { TokenClaim } from "@/components/token-claim"
import { ClaimStatusTracker } from "@/components/claim-status-tracker"
import { ReferralSystem } from "@/components/referral-system"
import { useWeb3 } from "@/hooks/use-web3"
import { AlertCircle, Gift } from "lucide-react"
import { WalletWarningDialog } from "@/components/wallet-warning-dialog"

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

export default function ClaimPage() {
  const searchParams = useSearchParams()
  const { isConnected } = useWeb3()
  const [referrer, setReferrer] = useState<string | null>(null)
  const [tasksCompleted, setTasksCompleted] = useState(false)
  const [claimSuccess, setClaimSuccess] = useState(false)

  // Verificar referral no URL
  useEffect(() => {
    const refParam = searchParams.get("ref")
    if (refParam && refParam.startsWith("0x")) {
      setReferrer(refParam)
    }
  }, [searchParams])

  // Verificar se já reivindicou com sucesso anteriormente
  useEffect(() => {
    if (isConnected) {
      const hasClaimedBefore = localStorage.getItem("claim_success") === "true"
      if (hasClaimedBefore) {
        setClaimSuccess(true)
      }
    }
  }, [isConnected])

  const handleTasksComplete = (completed: boolean) => {
    setTasksCompleted(completed)
  }

  const handleClaimSuccess = () => {
    setClaimSuccess(true)
    localStorage.setItem("claim_success", "true")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl relative">
      {/* Elementos de fundo animados */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
          <Gift className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Reivindicar Airdrop WebyteCoin
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete as tarefas necessárias e reivindique seus tokens $WBC gratuitamente.
        </p>
      </motion.div>

      {/* Adicionar o componente de aviso */}
      <WalletWarningDialog />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Carteira e Status */}
        <div className="md:col-span-1 space-y-6">
          <FadeIn>
            <WalletIntegration />
          </FadeIn>

          {isConnected && (
            <FadeIn delay={0.3}>
              <ClaimStatusTracker />
            </FadeIn>
          )}
        </div>

        {/* Coluna da direita - Tarefas e Reivindicação */}
        <div className="md:col-span-2 space-y-6">
          {!isConnected ? (
            <FadeIn>
              <Card className="border-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 z-0"></div>
                <CardHeader className="relative z-10">
                  <CardTitle>Conecte sua carteira</CardTitle>
                  <CardDescription>
                    Conecte sua carteira para participar do airdrop e reivindicar tokens.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Você precisa conectar sua carteira para verificar sua elegibilidade e completar as tarefas.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </FadeIn>
          ) : claimSuccess ? (
            <>
              <FadeIn>
                <Card className="border-primary/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 z-0"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle>Reivindicação Concluída</CardTitle>
                    <CardDescription>Você já reivindicou seus tokens com sucesso.</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <Alert className="bg-green-50 border-green-200">
                      <AlertDescription>
                        Parabéns! Seus tokens foram reivindicados e serão enviados para sua carteira em breve.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.3}>
                <ReferralSystem />
              </FadeIn>
            </>
          ) : (
            <>
              <FadeIn>
                <TaskVerification onComplete={handleTasksComplete} />
              </FadeIn>

              <FadeIn delay={0.3}>
                <TokenClaim referrer={referrer} tasksCompleted={tasksCompleted} onClaimSuccess={handleClaimSuccess} />
              </FadeIn>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

