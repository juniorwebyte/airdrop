"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useWeb3 } from "@/hooks/use-web3"
import { WalletIntegration } from "@/components/wallet-integration"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Coins,
  Gift,
  Users,
  Calendar,
  TrendingUp,
  Shield,
  Globe,
  Zap,
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

export default function Home() {
  const { isConnected } = useWeb3()
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Data de término do airdrop (exemplo: 30 dias a partir de agora)
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 30)

  // Atualizar contagem regressiva
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Dados do cronograma
  const timelineData = [
    {
      date: "15 de Maio, 2023",
      title: "Lançamento do Airdrop",
      description: "Início oficial do airdrop WebyteCoin com abertura das inscrições.",
    },
    {
      date: "15 de Junho, 2023",
      title: "Encerramento das Inscrições",
      description: "Último dia para participar e completar as tarefas do airdrop.",
    },
    {
      date: "20 de Junho, 2023",
      title: "Verificação dos Participantes",
      description: "Processo de verificação de todos os participantes e suas tarefas.",
    },
    {
      date: "30 de Junho, 2023",
      title: "Distribuição dos Tokens",
      description: "Início da distribuição dos tokens $WBC para os participantes qualificados.",
    },
    {
      date: "15 de Julho, 2023",
      title: "Listagem em DEX",
      description: "Listagem do token $WBC em exchanges descentralizadas.",
    },
  ]

  // Dados do FAQ
  const faqData = [
    {
      question: "O que é o WebyteCoin?",
      answer:
        "WebyteCoin ($WBC) é um token digital baseado na blockchain que serve como a moeda nativa do ecossistema Webyte. Ele permite transações rápidas e seguras, participação em governança e acesso a recursos premium na plataforma.",
    },
    {
      question: "Como posso participar do airdrop?",
      answer:
        "Para participar do airdrop, você precisa conectar sua carteira digital, completar uma série de tarefas como seguir nossas redes sociais, entrar nos grupos da comunidade e compartilhar sobre o projeto. Após completar as tarefas, você poderá reivindicar seus tokens.",
    },
    {
      question: "Quantos tokens posso receber?",
      answer:
        "Cada participante qualificado receberá 1.000 tokens $WBC. Você também pode ganhar tokens adicionais através do nosso programa de referência, onde você recebe 200 $WBC para cada novo participante que se inscrever usando seu link de referência.",
    },
    {
      question: "Quando receberei meus tokens?",
      answer:
        "Os tokens serão distribuídos após o encerramento do período de airdrop e a verificação de todos os participantes. A distribuição está prevista para começar em 30 de Junho de 2023 e pode levar até 7 dias para ser concluída.",
    },
    {
      question: "Quais carteiras são suportadas?",
      answer:
        "Suportamos MetaMask, WalletConnect, Coinbase Wallet e outras carteiras populares compatíveis com EVM. Você pode participar usando as redes Ethereum, Binance Smart Chain ou Polygon.",
    },
    {
      question: "O airdrop tem algum custo?",
      answer:
        "O airdrop em si é gratuito, mas você precisará pagar as taxas de transação (gas) da rede blockchain ao reivindicar seus tokens. Recomendamos usar a rede Polygon para taxas mais baixas.",
    },
    {
      question: "Posso participar de múltiplos dispositivos ou carteiras?",
      answer:
        "Não, cada pessoa pode participar apenas uma vez. Tentativas de usar múltiplas carteiras ou dispositivos para participar várias vezes resultarão na desqualificação de todas as suas entradas.",
    },
    {
      question: "O que acontece se eu não completar todas as tarefas?",
      answer:
        "Você precisa completar todas as tarefas obrigatórias para se qualificar para o airdrop. Tarefas opcionais podem aumentar sua alocação de tokens, mas não são necessárias para a qualificação básica.",
    },
  ]

  // Dados dos benefícios
  const benefitsData = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Segurança Avançada",
      description: "Protocolos de segurança de última geração para proteger seus ativos digitais.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Transações Rápidas",
      description: "Confirmações de transações em segundos com taxas mínimas.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Ecossistema Global",
      description: "Acesso a uma rede global de serviços e aplicativos descentralizados.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Potencial de Crescimento",
      description: "Participe desde o início de um projeto com grande potencial de valorização.",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section com animação */}
      <section className="text-center py-12 md:py-20 relative overflow-hidden">
        {/* Elementos de fundo animados */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Airdrop WebyteCoin
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Participe do nosso airdrop e receba tokens $WBC gratuitamente. Conecte sua carteira, complete as tarefas e
            reivindique seus tokens.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            asChild
          >
            <Link href="/claim">
              Participar do Airdrop <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
            <Link href="/sobre">Saiba Mais</Link>
          </Button>
        </motion.div>

        {/* Countdown Timer com animação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <Clock className="mr-2 h-5 w-5 text-primary" /> Tempo Restante
          </h2>
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            <div className="bg-card rounded-lg p-3 md:p-4 shadow-lg border border-primary/20">
              <div className="text-2xl md:text-4xl font-bold text-primary">{countdown.days}</div>
              <div className="text-sm text-muted-foreground">Dias</div>
            </div>
            <div className="bg-card rounded-lg p-3 md:p-4 shadow-lg border border-primary/20">
              <div className="text-2xl md:text-4xl font-bold text-primary">{countdown.hours}</div>
              <div className="text-sm text-muted-foreground">Horas</div>
            </div>
            <div className="bg-card rounded-lg p-3 md:p-4 shadow-lg border border-primary/20">
              <div className="text-2xl md:text-4xl font-bold text-primary">{countdown.minutes}</div>
              <div className="text-sm text-muted-foreground">Minutos</div>
            </div>
            <div className="bg-card rounded-lg p-3 md:p-4 shadow-lg border border-primary/20">
              <div className="text-2xl md:text-4xl font-bold text-primary">{countdown.seconds}</div>
              <div className="text-sm text-muted-foreground">Segundos</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Wallet Connection */}
      <FadeIn delay={0.3} className="max-w-md mx-auto mb-16">
        <WalletIntegration />
      </FadeIn>

      {/* How It Works com animação */}
      <section className="py-12 md:py-16">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Como Funciona</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Participar do airdrop WebyteCoin é simples e rápido. Siga os passos abaixo para garantir seus tokens
            gratuitos.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0.2}>
            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Conecte sua Carteira</CardTitle>
                <CardDescription>Conecte sua carteira digital para iniciar o processo de participação.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Suportamos MetaMask, WalletConnect e outras carteiras populares. A conexão é segura e não armazenamos
                  suas chaves privadas.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Complete as Tarefas</CardTitle>
                <CardDescription>Realize tarefas simples para se qualificar para o airdrop.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Siga-nos nas redes sociais, entre nos grupos da comunidade e compartilhe sobre o projeto para
                  completar as tarefas necessárias.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Reivindique seus Tokens</CardTitle>
                <CardDescription>Após completar as tarefas, reivindique seus tokens $WBC.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Os tokens serão enviados para sua carteira após a verificação. Você pode acompanhar o status da sua
                  reivindicação a qualquer momento.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-12 md:py-16">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Benefícios do WebyteCoin</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Descubra por que o WebyteCoin está revolucionando o mercado de criptomoedas e por que você deve fazer parte
            dessa comunidade.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsData.map((benefit, index) => (
            <FadeIn key={index} delay={0.2 * index}>
              <div className="bg-card rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-center">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Token Info com animação */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Sobre o Token $WBC</h2>
            <p className="text-lg mb-4">
              O WebyteCoin ($WBC) é o token nativo do ecossistema Webyte, projetado para facilitar transações,
              governança e acesso a serviços premium na plataforma.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg">
                <h3 className="font-semibold text-primary">Fornecimento Total</h3>
                <p className="text-2xl font-bold">100.000.000 $WBC</p>
              </div>
              <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg">
                <h3 className="font-semibold text-primary">Alocação para Airdrop</h3>
                <p className="text-2xl font-bold">5.000.000 $WBC</p>
              </div>
            </div>
            <Button className="gap-2 bg-white/80 hover:bg-white text-primary hover:text-primary/80" asChild>
              <Link href="/tokenomics">
                <Coins className="h-4 w-4" /> Ver Tokenomics
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <Image
                  src="/placeholder.svg?height=256&width=256"
                  alt="WebyteCoin Token"
                  width={256}
                  height={256}
                  className="rounded-full animate-float"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 blur-xl -z-10"></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cronograma */}
      <section className="py-12 md:py-16">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Cronograma do Airdrop</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Acompanhe as datas importantes do nosso airdrop e não perca nenhum prazo.
          </p>
        </FadeIn>

        <div className="relative max-w-3xl mx-auto">
          {/* Linha do tempo vertical */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:translate-x-px"></div>

          {/* Eventos do cronograma */}
          {timelineData.map((event, index) => (
            <FadeIn key={index} delay={0.2 * index}>
              <div
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Marcador */}
                <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-primary transform -translate-x-2 md:-translate-x-2.5 mt-1.5"></div>

                {/* Data */}
                <div className="md:w-1/2 flex md:justify-end">
                  <div
                    className={`bg-primary/10 rounded-lg px-4 py-2 inline-block ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                  >
                    <span className="font-semibold text-primary flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="md:w-1/2 pl-8 md:pl-0">
                  <div
                    className={`bg-card rounded-lg p-4 border border-primary/20 shadow-md ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}
                  >
                    <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-muted/30 rounded-xl p-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Perguntas Frequentes</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre o airdrop WebyteCoin.
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <FadeIn key={index} delay={0.1 * index}>
                <AccordionItem value={`item-${index}`} className="border border-primary/20 mb-4 rounded-lg bg-card">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-primary/5 rounded-t-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </FadeIn>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-12 md:py-16">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12">Estatísticas do Airdrop</h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <FadeIn delay={0.1}>
            <div className="bg-card rounded-xl p-6 border border-primary/20 text-center">
              <div className="text-4xl font-bold text-primary mb-2">5M</div>
              <div className="text-muted-foreground">Tokens Alocados</div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-card rounded-xl p-6 border border-primary/20 text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Participantes</div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-card rounded-xl p-6 border border-primary/20 text-center">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">Redes Suportadas</div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-card rounded-xl p-6 border border-primary/20 text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000</div>
              <div className="text-muted-foreground">$WBC por Participante</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section com animação */}
      <section className="text-center py-12 md:py-16 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-6">Pronto para Participar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Não perca a oportunidade de receber tokens $WBC gratuitamente. O airdrop é limitado e por tempo determinado.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            asChild
          >
            <Link href="/claim">
              Participar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </FadeIn>
      </section>
    </main>
  )
}

