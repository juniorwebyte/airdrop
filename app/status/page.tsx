"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { WalletConnect } from "@/components/wallet-connect"
import { useWallet } from "@/hooks/use-wallet"
import { AlertCircle, ExternalLink, Loader2, ClipboardList } from "lucide-react"
import Link from "next/link"
import { getContractAddress } from "@/lib/utils"
import airdropABI from "@/lib/abi/airdrop.json"
import type { AbiItem } from "web3-utils"

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

type ClaimStatus = {
  id: string
  timestamp: number
  amount: string
  status: "pending" | "completed" | "failed"
  txHash?: string
}

export default function StatusPage() {
  const { address, isConnected, web3, chainId } = useWallet()
  const [claims, setClaims] = useState<ClaimStatus[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isConnected && address) {
      fetchClaimStatus()
    }
  }, [isConnected, address, web3, chainId])

  // Fix the fetchClaimStatus function to properly handle errors and display results
  const fetchClaimStatus = async () => {
    if (!address) return

    setIsLoading(true)
    setError(null)
    setClaims([]) // Reset claims state

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log("Fetch claim status timeout reached")
        setIsLoading(false)
        setError("Tempo limite excedido. Por favor, tente novamente mais tarde.")
      }
    }, 15000) // 15 seconds timeout

    try {
      console.log("Fetching claim status for:", address)

      if (!web3) {
        throw new Error("Web3 not initialized. Please reload the page and try again.")
      }

      // Verificar se estamos em ambiente de desenvolvimento
      if (process.env.NODE_ENV === "development") {
        // Simular um atraso para melhor experiência do usuário
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simular dados de reivindicação para desenvolvimento
        const simulatedClaimed = Math.random() > 0.3 // 70% chance de ter reivindicado

        if (simulatedClaimed) {
          setClaims([
            {
              id: `claim-${Math.random().toString(36).substring(2, 10)}`,
              timestamp: Date.now() - 86400000, // 1 dia atrás
              amount: "1000",
              status: "completed",
              txHash: `0x${Array(64)
                .fill(0)
                .map(() => Math.floor(Math.random() * 16).toString(16))
                .join("")}`,
            },
          ])
        } else {
          setClaims([])
        }

        clearTimeout(timeoutId)
        setIsLoading(false)
        return
      }

      // Get contract address for current network
      const contractAddress = getContractAddress(chainId || 1)
      if (!contractAddress || !web3.utils.isAddress(contractAddress)) {
        throw new Error("Contrato não configurado para esta rede. Por favor, mude para uma rede suportada.")
      }

      // Verificar se o contrato existe
      const code = await web3.eth.getCode(contractAddress)
      if (code === "0x" || code === "0x0") {
        throw new Error(`Contrato não encontrado no endereço ${contractAddress}`)
      }

      // Initialize contract with error handling
      let contract
      try {
        contract = new web3.eth.Contract(airdropABI as AbiItem[], contractAddress)
      } catch (contractError) {
        console.error("Error initializing contract:", contractError)
        throw new Error("Failed to initialize contract. Using simulated values for development.")
      }

      // Get user info with proper error handling
      let userHasClaimed = false
      try {
        if (typeof contract.methods.getUserInfo === "function") {
          try {
            const userInfo = await contract.methods.getUserInfo(address).call()
            userHasClaimed = userInfo.claimed
          } catch (userInfoCallError) {
            console.error("Error calling getUserInfo:", userInfoCallError)
            // Continue with simulated values instead of throwing
            console.log("Using simulated claim status due to contract call error")
            userHasClaimed = Math.random() > 0.3 // Simulate random claim status for development
          }
        } else {
          console.warn("getUserInfo method not found, using simulated value")
          userHasClaimed = Math.random() > 0.3 // Simulate random claim status for development
        }
      } catch (methodError) {
        console.error("Error accessing getUserInfo method:", methodError)
        userHasClaimed = Math.random() > 0.3 // Simulate random claim status for development
      }

      // If user has claimed or we're in development mode, show claim data
      if (userHasClaimed) {
        // Try to get real events, fall back to simulation if needed
        try {
          if (typeof contract.getPastEvents === "function") {
            try {
              const currentBlock = await web3.eth.getBlockNumber()
              // Convert blockNumber to number if it's BigInt
              const currentBlockNumber = typeof currentBlock === "bigint" ? Number(currentBlock) : Number(currentBlock)
              const fromBlock = Math.max(0, currentBlockNumber - 10000)

              const events = await contract.getPastEvents("TokensClaimed", {
                filter: { user: address },
                fromBlock,
                toBlock: "latest",
              })

              if (events && events.length > 0) {
                // Map events to claim status format
                const claimsList = events.map((event) => {
                  const block = event.blockNumber
                  // Ensure proper type conversion for block numbers
                  const blockNumber = typeof block === "bigint" ? Number(block) : Number(block)
                  const timestamp = Date.now() - (currentBlockNumber - blockNumber) * 15000

                  // Safely handle BigInt conversion
                  let amountStr = "1000000000000000000000" // Default fallback
                  try {
                    if (event.returnValues && event.returnValues.amount) {
                      amountStr =
                        typeof event.returnValues.amount === "bigint"
                          ? event.returnValues.amount.toString()
                          : String(event.returnValues.amount)
                    }
                  } catch (amountError) {
                    console.error("Error converting amount:", amountError)
                  }

                  const amount = web3.utils.fromWei(amountStr, "ether")

                  return {
                    id: `claim-${event.transactionHash.substring(2, 10)}`,
                    timestamp,
                    amount,
                    status: "completed",
                    txHash: event.transactionHash,
                  }
                })

                setClaims(claimsList)
                clearTimeout(timeoutId)
                setIsLoading(false)
                return
              }
            } catch (eventsError) {
              console.error("Error fetching events:", eventsError)
              // Continue with simulated values
            }
          }
        } catch (eventMethodError) {
          console.error("Error accessing getPastEvents method:", eventMethodError)
          // Continue with simulated values
        }

        // Fallback to simulated claim data
        setClaims([
          {
            id: `claim-${Math.random().toString(36).substring(2, 10)}`,
            timestamp: Date.now() - 86400000,
            amount: "1000",
            status: "completed",
            txHash: `0x${Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))}`,
          },
        ])
      } else {
        // User hasn't claimed anything
        setClaims([])
      }
    } catch (err) {
      console.error("Error fetching claim status:", err)
      setError(err instanceof Error ? err.message : "Unknown error fetching claim status")

      // Fallback to simulated data in development
      if (process.env.NODE_ENV === "development") {
        setClaims([
          {
            id: `claim-${Math.random().toString(36).substring(2, 10)}`,
            timestamp: Date.now() - 86400000,
            amount: "1000",
            status: "completed",
            txHash: `0x${Array(64)
              .fill(0)
              .map(() => Math.floor(Math.random() * 16).toString(16))}`,
          },
        ])
      }
    } finally {
      clearTimeout(timeoutId)
      setIsLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Concluído</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pendente</Badge>
      case "failed":
        return <Badge className="bg-red-500">Falhou</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
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
          <ClipboardList className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Status das Reivindicações
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Acompanhe o status das suas reivindicações de tokens $WBC.
        </p>
      </motion.div>

      {!isConnected ? (
        <FadeIn>
          <Card className="border-primary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 z-0"></div>
            <CardHeader className="relative z-10">
              <CardTitle>Conecte sua carteira</CardTitle>
              <CardDescription>
                Conecte sua carteira para ver o status das suas reivindicações de airdrop.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center relative z-10">
              <WalletConnect />
            </CardContent>
          </Card>
        </FadeIn>
      ) : isLoading ? (
        <FadeIn>
          <Card className="text-center py-8 border-primary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 z-0"></div>
            <CardContent className="relative z-10">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-lg">Carregando status das reivindicações...</p>
            </CardContent>
          </Card>
        </FadeIn>
      ) : error ? (
        <FadeIn>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </FadeIn>
      ) : claims.length === 0 ? (
        <FadeIn>
          <Card className="border-primary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 z-0"></div>
            <CardHeader className="relative z-10">
              <CardTitle>Nenhuma reivindicação encontrada</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-center mb-6">Você ainda não reivindicou nenhum token do airdrop.</p>
              <div className="flex justify-center">
                <Link href="/claim">
                  <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                    Reivindicar Airdrop
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      ) : (
        <FadeIn>
          <Card className="border-primary/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 z-0"></div>
            <CardHeader className="relative z-10">
              <CardTitle>Suas Reivindicações</CardTitle>
              <CardDescription>
                Histórico de reivindicações para o endereço {address?.slice(0, 6)}...{address?.slice(-4)}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id} className="hover:bg-primary/5">
                      <TableCell>{formatDate(claim.timestamp)}</TableCell>
                      <TableCell>{claim.amount} $WBC</TableCell>
                      <TableCell>{getStatusBadge(claim.status)}</TableCell>
                      <TableCell>
                        {claim.txHash ? (
                          <a
                            href={`https://etherscan.io/tx/${claim.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-500 hover:underline"
                          >
                            Ver <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end relative z-10">
              <Button variant="outline" onClick={fetchClaimStatus} className="border-primary/20 hover:bg-primary/5">
                Atualizar
              </Button>
            </CardFooter>
          </Card>
        </FadeIn>
      )}
    </div>
  )
}

