"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useWeb3 } from "@/hooks/use-web3"
import { AlertCircle, ExternalLink, Loader2, Trash2, Info } from "lucide-react"

type ClaimStatus = {
  id: string
  timestamp: number
  amount: string
  status: "pending" | "completed" | "failed"
  txHash?: string
}

export function ClaimStatusTracker() {
  const { address, isConnected, web3, chainId } = useWeb3()
  const { toast } = useToast()
  const [claims, setClaims] = useState<ClaimStatus[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Carregar histórico de reivindicações
  useEffect(() => {
    if (isConnected && address) {
      loadClaimHistory()
    }
  }, [isConnected, address])

  const loadClaimHistory = async () => {
    if (!address) return

    setIsLoading(true)
    setError(null)

    try {
      // Primeiro, tentar carregar do localStorage
      const savedClaims = localStorage.getItem(`claims_${address.toLowerCase()}`)

      if (savedClaims) {
        try {
          const parsedClaims = JSON.parse(savedClaims)
          setClaims(parsedClaims)
          setIsLoading(false)
          return
        } catch (e) {
          console.error("Erro ao carregar histórico local:", e)
        }
      }

      // Se não houver dados locais ou ocorrer um erro, tentar buscar da blockchain
      if (web3) {
        // Simulação para desenvolvimento
        if (process.env.NODE_ENV === "development") {
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Verificar se deve mostrar histórico simulado (70% de chance)
          const shouldShowHistory = Math.random() > 0.3

          if (shouldShowHistory) {
            const simulatedClaims: ClaimStatus[] = [
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
            ]

            setClaims(simulatedClaims)

            // Salvar no localStorage
            localStorage.setItem(`claims_${address.toLowerCase()}`, JSON.stringify(simulatedClaims))
          } else {
            setClaims([])
          }
        } else {
          // Implementação real para produção
          // Aqui você implementaria a lógica para buscar o histórico da blockchain
          // Por enquanto, deixaremos vazio
          setClaims([])
        }
      }
    } catch (err) {
      console.error("Erro ao carregar histórico de reivindicações:", err)
      setError("Não foi possível carregar o histórico de reivindicações.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteHistory = () => {
    setShowDeleteDialog(true)
  }

  const confirmDeleteHistory = async () => {
    if (!address) return

    setIsDeleting(true)

    try {
      // Remover do localStorage
      localStorage.removeItem(`claims_${address.toLowerCase()}`)

      // Limpar estado
      setClaims([])

      toast({
        title: "Histórico limpo",
        description: "O histórico de reivindicações foi limpo com sucesso.",
      })
    } catch (err) {
      console.error("Erro ao limpar histórico:", err)
      toast({
        title: "Erro",
        description: "Não foi possível limpar o histórico. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("pt-BR")
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

  const getExplorerLink = (txHash: string) => {
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

  if (!isConnected) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Conecte sua carteira para ver o histórico de reivindicações.</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Histórico de Reivindicações</CardTitle>
            <CardDescription>Acompanhe suas reivindicações de tokens $WBC.</CardDescription>
          </div>
          {claims.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleDeleteHistory}>
              <Trash2 className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : claims.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma reivindicação encontrada.</p>
            </div>
          ) : (
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
                  <TableRow key={claim.id}>
                    <TableCell>{formatDate(claim.timestamp)}</TableCell>
                    <TableCell>{claim.amount} $WBC</TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>
                      {claim.txHash ? (
                        <a
                          href={getExplorerLink(claim.txHash)}
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
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground flex items-center">
            <Info className="h-4 w-4 mr-1" />
            Os tokens serão distribuídos em até 7 dias após a reivindicação.
          </div>
          <Button variant="outline" onClick={loadClaimHistory} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Atualizando...
              </>
            ) : (
              "Atualizar"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Diálogo de confirmação para limpar histórico */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limpar histórico de reivindicações</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja limpar todo o histórico de reivindicações? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteHistory} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Limpando...
                </>
              ) : (
                "Limpar Histórico"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

