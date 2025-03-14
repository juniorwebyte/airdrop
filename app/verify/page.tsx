import GalaxyAnimation from "@/components/galaxy-animation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, Search } from "lucide-react"
import PerformanceToggle from "@/components/performance-toggle"

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white relative overflow-hidden">
      <GalaxyAnimation />
      <Navbar />

      <div className="max-w-3xl w-full z-10 mt-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-purple-400">Verificar Elegibilidade</h1>
          <p className="text-gray-300">Verifique se seu endereço é elegível para o AirDrop</p>
        </div>

        <Card className="border-purple-800/30 bg-black/30 backdrop-blur-sm shadow-xl overflow-hidden">
          <CardHeader className="border-b border-purple-900/20 bg-black/50">
            <CardTitle className="text-xl text-purple-400">Verificar Endereço</CardTitle>
            <CardDescription className="text-gray-400">
              Insira o endereço da carteira para verificar a elegibilidade
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="0x..."
                  className="flex-1 px-4 py-2 bg-black/50 border border-purple-800/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600/50"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Search className="h-4 w-4 mr-2" />
                  Verificar
                </Button>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-400">Endereço Elegível!</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Este endereço está elegível para receber 1000 $WBC tokens.
                  </p>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-400">Endereço Não Elegível</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Este endereço não está na lista de distribuição do AirDrop.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PerformanceToggle />
    </main>
  )
}

