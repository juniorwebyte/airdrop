"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Coins,
  BarChart3,
  PieChart,
  TrendingUp,
  Lock,
  Users,
  Rocket,
  Gift,
  Landmark,
  Briefcase,
  Layers,
} from "lucide-react"

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

export default function TokenomicsPage() {
  // Dados de alocação de tokens
  const tokenAllocationData = [
    { name: "Airdrop", percentage: 5, color: "#3b82f6" },
    { name: "Venda Pública", percentage: 20, color: "#10b981" },
    { name: "Equipe e Conselheiros", percentage: 15, color: "#f59e0b" },
    { name: "Reserva de Ecossistema", percentage: 25, color: "#6366f1" },
    { name: "Desenvolvimento", percentage: 20, color: "#ec4899" },
    { name: "Marketing", percentage: 10, color: "#8b5cf6" },
    { name: "Liquidez", percentage: 5, color: "#14b8a6" },
  ]

  // Dados de utilidade do token
  const tokenUtilityData = [
    {
      title: "Governança",
      description: "Os detentores de $WBC podem votar em propostas e participar da tomada de decisões do ecossistema.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Staking",
      description: "Bloqueie seus tokens $WBC para ganhar rendimentos passivos e recompensas adicionais.",
      icon: <Lock className="h-10 w-10 text-primary" />,
    },
    {
      title: "Taxas Reduzidas",
      description: "Detentores de $WBC têm acesso a taxas reduzidas em toda a plataforma.",
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
    },
    {
      title: "Acesso Premium",
      description: "Desbloqueie recursos e serviços exclusivos com seus tokens $WBC.",
      icon: <Rocket className="h-10 w-10 text-primary" />,
    },
  ]

  // Dados de vesting
  const vestingData = [
    {
      category: "Airdrop",
      schedule: "100% liberados após a conclusão do airdrop",
      cliff: "Nenhum",
      duration: "Imediato",
    },
    {
      category: "Venda Pública",
      schedule: "30% liberados no TGE, 70% ao longo de 6 meses",
      cliff: "Nenhum",
      duration: "6 meses",
    },
    {
      category: "Equipe e Conselheiros",
      schedule: "Liberação linear após 6 meses de cliff",
      cliff: "6 meses",
      duration: "24 meses",
    },
    {
      category: "Reserva de Ecossistema",
      schedule: "Liberação linear ao longo de 36 meses",
      cliff: "3 meses",
      duration: "36 meses",
    },
    {
      category: "Desenvolvimento",
      schedule: "Liberação linear ao longo de 24 meses",
      cliff: "3 meses",
      duration: "24 meses",
    },
    {
      category: "Marketing",
      schedule: "Liberação linear ao longo de 18 meses",
      cliff: "1 mês",
      duration: "18 meses",
    },
    {
      category: "Liquidez",
      schedule: "100% liberados no TGE",
      cliff: "Nenhum",
      duration: "Imediato",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 relative overflow-hidden">
        {/* Elementos de fundo animados */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Tokenomics
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Entenda a economia do token $WBC e como ele impulsiona o ecossistema WebyteCoin.
          </p>
        </motion.div>
      </section>

      {/* Visão Geral do Token */}
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Visão Geral do Token</h2>
            <p className="text-lg mb-6">
              O WebyteCoin ($WBC) é um token utilitário que alimenta todo o ecossistema Webyte, permitindo governança,
              staking, taxas reduzidas e acesso a recursos premium.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <Coins className="h-5 w-5 text-primary mr-3" />
                  <span>Nome do Token</span>
                </div>
                <span className="font-semibold">WebyteCoin</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <Coins className="h-5 w-5 text-primary mr-3" />
                  <span>Símbolo</span>
                </div>
                <span className="font-semibold">$WBC</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <Layers className="h-5 w-5 text-primary mr-3" />
                  <span>Blockchain</span>
                </div>
                <span className="font-semibold">Ethereum, BSC, Polygon</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-primary mr-3" />
                  <span>Fornecimento Total</span>
                </div>
                <span className="font-semibold">100.000.000 $WBC</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <Landmark className="h-5 w-5 text-primary mr-3" />
                  <span>Tipo de Token</span>
                </div>
                <span className="font-semibold">ERC-20 / BEP-20</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-card rounded-lg overflow-hidden border border-primary/20 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <PieChart className="h-5 w-5 text-primary mr-2" />
                  Alocação de Tokens
                </h3>

                <div className="flex flex-col space-y-4">
                  {tokenAllocationData.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: item.color }}
                          ></span>
                          {item.name}
                        </span>
                        <span className="font-semibold">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-muted">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Fornecimento Total</span>
                    <span className="font-bold">100.000.000 $WBC</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Utilidade do Token */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Utilidade do Token</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            O token $WBC possui múltiplas utilidades dentro do ecossistema WebyteCoin.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenUtilityData.map((utility, index) => (
            <FadeIn key={index} delay={0.2 * index}>
              <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full">
                <CardHeader>
                  <div className="flex justify-center mb-4">{utility.icon}</div>
                  <CardTitle className="text-center">{utility.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{utility.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Cronograma de Vesting */}
      <section className="py-12 md:py-16">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Cronograma de Vesting</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Entenda como os tokens $WBC serão liberados ao longo do tempo.
          </p>
        </FadeIn>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-4 text-left font-semibold">Categoria</th>
                <th className="p-4 text-left font-semibold">Cronograma</th>
                <th className="p-4 text-left font-semibold">Cliff</th>
                <th className="p-4 text-left font-semibold">Duração</th>
              </tr>
            </thead>
            <tbody>
              {vestingData.map((item, index) => (
                <tr key={index} className={`border-b border-muted ${index % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                  <td className="p-4 font-medium">{item.category}</td>
                  <td className="p-4">{item.schedule}</td>
                  <td className="p-4">{item.cliff}</td>
                  <td className="p-4">{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tokenomics Avançado */}
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.3}>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="WebyteCoin Tokenomics"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold">Modelo Econômico Sustentável</h3>
                  <p>Projetado para crescimento a longo prazo e estabilidade</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Mecanismos Econômicos</h2>
            <p className="text-lg mb-6">
              O WebyteCoin implementa vários mecanismos econômicos para garantir a sustentabilidade e o crescimento a
              longo prazo do ecossistema.
            </p>

            <div className="space-y-4">
              <div className="p-4 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Briefcase className="h-5 w-5 text-primary mr-2" />
                  Queima de Tokens
                </h3>
                <p className="text-muted-foreground">
                  Uma porcentagem das taxas de transação é usada para comprar e queimar tokens $WBC, reduzindo
                  gradualmente o fornecimento total e potencialmente aumentando o valor ao longo do tempo.
                </p>
              </div>

              <div className="p-4 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Lock className="h-5 w-5 text-primary mr-2" />
                  Staking com Recompensas
                </h3>
                <p className="text-muted-foreground">
                  Os detentores podem fazer staking de seus tokens $WBC para ganhar rendimentos passivos, incentivando a
                  retenção a longo prazo e reduzindo a pressão de venda.
                </p>
              </div>

              <div className="p-4 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  Governança Descentralizada
                </h3>
                <p className="text-muted-foreground">
                  Os detentores de tokens podem votar em propostas que afetam o ecossistema, incluindo atualizações de
                  protocolo, alocação de fundos e parâmetros econômicos.
                </p>
              </div>

              <div className="p-4 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Gift className="h-5 w-5 text-primary mr-2" />
                  Programa de Recompensas
                </h3>
                <p className="text-muted-foreground">
                  Usuários ativos recebem recompensas em $WBC por contribuir para o ecossistema, incentivando a
                  participação e o crescimento da comunidade.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 md:py-16 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-6">Pronto para Participar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Não perca a oportunidade de fazer parte do ecossistema WebyteCoin desde o início.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            asChild
          >
            <Link href="/claim">
              Participar do Airdrop <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </FadeIn>
      </section>
    </main>
  )
}

