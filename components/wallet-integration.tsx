"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useWeb3 } from "@/hooks/use-web3"
import { NetworkSelector } from "@/components/network-selector"
import { SUPPORTED_NETWORKS } from "@/lib/constants"
import { Copy, ExternalLink, Loader2, LogOut, AlertCircle, CheckCircle } from "lucide-react"

export function WalletIntegration() {
  const {
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    chainId,
    balance,
    tokenBalance,
    refreshBalance,
    isLoading,
  } = useWeb3()
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [copied, setCopied] = useState(false)

  // Verificar se a rede atual é suportada
  const isNetworkSupported = chainId ? SUPPORTED_NETWORKS.some((network) => network.chainId === chainId) : false

  // Obter informações da rede atual
  const currentNetwork = chainId ? SUPPORTED_NETWORKS.find((network) => network.chainId === chainId) : null

  // Atualizar saldo periodicamente
  useEffect(() => {
    if (isConnected && address) {
      const interval = setInterval(() => {
        refreshBalance()
      }, 30000) // A cada 30 segundos

      return () => clearInterval(interval)
    }
  }, [isConnected, address, refreshBalance])

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error("Erro ao conectar carteira:", error)
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar à carteira. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleDisconnect = () => {
    try {
      disconnect()
      toast({
        title: "Carteira desconectada",
        description: "Sua carteira foi desconectada com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao desconectar carteira:", error)
    }
  }

  const handleRefreshBalance = async () => {
    if (!isConnected) return

    setIsRefreshing(true)

    try {
      await refreshBalance()
      toast({
        title: "Saldo atualizado",
        description: "Seu saldo foi atualizado com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao atualizar saldo:", error)
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o saldo. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const copyToClipboard = () => {
    if (!address) return

    navigator.clipboard.writeText(address)
    setCopied(true)

    toast({
      title: "Endereço copiado",
      description: "Endereço copiado para a área de transferência.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const getExplorerLink = () => {
    if (!address || !chainId) return "#"

    // Determinar o explorador correto com base na rede
    let baseUrl = "https://etherscan.io/address/"

    switch (chainId) {
      case 56: // BSC
        baseUrl = "https://bscscan.com/address/"
        break
      case 137: // Polygon
        baseUrl = "https://polygonscan.com/address/"
        break
      case 5: // Goerli
        baseUrl = "https://goerli.etherscan.io/address/"
        break
      case 97: // BSC Testnet
        baseUrl = "https://testnet.bscscan.com/address/"
        break
    }

    return `${baseUrl}${address}`
  }

  const formatNumber = (number: number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M"
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K"
    } else {
      return number.toFixed(0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sua Carteira</CardTitle>
        <CardDescription>Gerencie sua conexão de carteira e visualize seus saldos.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="flex flex-col items-center py-6">
            <p className="mb-4 text-center text-muted-foreground">
              Conecte sua carteira para participar do airdrop e reivindicar tokens.
            </p>
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Conectando...
                </>
              ) : (
                "Conectar Carteira"
              )}
            </Button>
          </div>
        ) : (
          <>
            {!isNetworkSupported && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Rede não suportada. Por favor, mude para uma das redes suportadas.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Endereço</span>
                <div className="flex items-center">
                  <code className="flex-1 bg-muted p-2 rounded text-xs font-mono truncate">{address}</code>
                  <Button variant="ghost" size="icon" onClick={copyToClipboard} className="ml-1">
                    {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="ml-1">
                    <a href={getExplorerLink()} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground">Rede</span>
                <NetworkSelector />
              </div>

              <div className="space-y-3">
                <div className="bg-muted/50 p-4 rounded-md border border-primary/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Saldo Nativo:</span>
                    {isLoading ? (
                      <Skeleton className="h-5 w-20" />
                    ) : (
                      <span className="font-bold">{balance ? Number(balance).toFixed(6) : "0.000000"} ETH</span>
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-md border border-primary/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Saldo $WBC:</span>
                    {isLoading ? (
                      <Skeleton className="h-5 w-20" />
                    ) : (
                      <span className="font-bold">{tokenBalance ? formatNumber(Number(tokenBalance)) : "0"} $WBC</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
      {isConnected && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleRefreshBalance} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              "Atualizar Saldo"
            )}
          </Button>
          <Button variant="outline" onClick={handleDisconnect} className="gap-1">
            <LogOut className="h-4 w-4" />
            Desconectar
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

