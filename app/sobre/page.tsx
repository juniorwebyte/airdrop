"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Users, Shield, Zap, Award, Code, Lightbulb, Target, Layers } from "lucide-react"

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

export default function SobrePage() {
  // Dados da equipe
  const teamData = [
    {
      name: "Ana Silva",
      role: "CEO & Fundadora",
      bio: "Especialista em blockchain com mais de 8 anos de experiência em desenvolvimento de projetos descentralizados.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Carlos Mendes",
      role: "CTO",
      bio: "Desenvolvedor blockchain sênior com experiência em Ethereum, Solidity e arquitetura de contratos inteligentes.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Juliana Costa",
      role: "CMO",
      bio: "Especialista em marketing digital com foco em projetos de criptomoedas e comunidades descentralizadas.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Rafael Oliveira",
      role: "Desenvolvedor Líder",
      bio: "Especialista em desenvolvimento full-stack com experiência em aplicações Web3 e DeFi.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Mariana Santos",
      role: "Gerente de Comunidade",
      bio: "Especialista em construção e gestão de comunidades com experiência em projetos blockchain.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Dados dos parceiros
  const partnersData = [
    {
      name: "TechVentures",
      description: "Fundo de investimento especializado em startups de blockchain.",
      logo: "/placeholder.svg?height=100&width=200",
    },
    {
      name: "CryptoLabs",
      description: "Aceleradora de projetos blockchain e Web3.",
      logo: "/placeholder.svg?height=100&width=200",
    },
    {
      name: "BlockchainBR",
      description: "Comunidade brasileira de desenvolvedores blockchain.",
      logo: "/placeholder.svg?height=100&width=200",
    },
    {
      name: "InnovateChain",
      description: "Plataforma de inovação para projetos descentralizados.",
      logo: "/placeholder.svg?height=100&width=200",
    },
  ]

  // Dados do roadmap
  const roadmapData = [
    {
      phase: "Fase 1: Fundação",
      items: [
        "Desenvolvimento do conceito e whitepaper",
        "Formação da equipe principal",
        "Desenvolvimento inicial da plataforma",
        "Lançamento do site e redes sociais",
      ],
      status: "Concluído",
    },
    {
      phase: "Fase 2: Crescimento",
      items: [
        "Lançamento do token $WBC",
        "Airdrop para early adopters",
        "Listagem em exchanges descentralizadas",
        "Expansão da comunidade global",
      ],
      status: "Em andamento",
    },
    {
      phase: "Fase 3: Expansão",
      items: [
        "Lançamento da plataforma principal",
        "Integração com outros projetos DeFi",
        "Listagem em exchanges centralizadas",
        "Expansão para novos mercados",
      ],
      status: "Planejado",
    },
    {
      phase: "Fase 4: Maturidade",
      items: [
        "Lançamento de produtos adicionais",
        "Governança descentralizada completa",
        "Parcerias estratégicas globais",
        "Desenvolvimento de ecossistema próprio",
      ],
      status: "Planejado",
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
            Sobre o WebyteCoin
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Conheça nossa missão, visão e os valores que impulsionam o projeto WebyteCoin.
          </p>
        </motion.div>
      </section>

      {/* Sobre o Projeto */}
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
            <p className="text-lg mb-4">
              O WebyteCoin nasceu da visão de criar uma solução blockchain inovadora que pudesse democratizar o acesso
              às finanças descentralizadas e criar um ecossistema robusto para desenvolvedores e usuários.
            </p>
            <p className="text-lg mb-4">
              Fundado em 2022 por um grupo de entusiastas e especialistas em blockchain, o projeto rapidamente ganhou
              tração e atraiu uma comunidade global de apoiadores.
            </p>
            <p className="text-lg mb-4">
              Hoje, estamos construindo um ecossistema completo que inclui uma plataforma de desenvolvimento,
              ferramentas para criadores e soluções DeFi acessíveis para todos.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="WebyteCoin Team"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold">Equipe WebyteCoin</h3>
                  <p>Trabalhando para revolucionar o futuro das finanças descentralizadas</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12">Missão, Visão e Valores</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0.2}>
            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Democratizar o acesso às finanças descentralizadas e criar um ecossistema blockchain acessível, seguro
                  e inovador para usuários e desenvolvedores em todo o mundo.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ser reconhecido como um dos principais ecossistemas blockchain do mundo, impulsionando a adoção em
                  massa de tecnologias descentralizadas e transformando a maneira como as pessoas interagem com finanças
                  digitais.
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Inovação constante</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Transparência em todas as operações</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Segurança como prioridade</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Comunidade no centro de tudo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Acessibilidade para todos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Tecnologia */}
      <section className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.3}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-card rounded-lg overflow-hidden border border-primary/20">
                <div className="p-6">
                  <pre className="text-sm font-mono overflow-x-auto">
                    <code className="language-solidity">
                      {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WebyteCoin is ERC20, Ownable {
    constructor() ERC20("WebyteCoin", "WBC") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Nossa Tecnologia</h2>
            <p className="text-lg mb-4">
              O WebyteCoin é construído sobre as mais modernas tecnologias blockchain, garantindo segurança,
              escalabilidade e interoperabilidade.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Segurança Avançada</h3>
                  <p className="text-muted-foreground">
                    Contratos inteligentes auditados e protocolos de segurança de última geração.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                  <Layers className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Multi-chain</h3>
                  <p className="text-muted-foreground">
                    Suporte a múltiplas blockchains, incluindo Ethereum, BSC e Polygon.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                  <Code className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Código Aberto</h3>
                  <p className="text-muted-foreground">
                    Todo o código é open-source e disponível para revisão pela comunidade.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Alta Performance</h3>
                  <p className="text-muted-foreground">
                    Arquitetura otimizada para transações rápidas e taxas reduzidas.
                  </p>
                </div>
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-12 md:py-16 bg-muted/30 rounded-xl p-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Roadmap</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Nosso plano de desenvolvimento e crescimento para os próximos anos.
          </p>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="phase1" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="phase1">Fase 1</TabsTrigger>
              <TabsTrigger value="phase2">Fase 2</TabsTrigger>
              <TabsTrigger value="phase3">Fase 3</TabsTrigger>
              <TabsTrigger value="phase4">Fase 4</TabsTrigger>
            </TabsList>

            {roadmapData.map((phase, index) => (
              <TabsContent
                key={index}
                value={`phase${index + 1}`}
                className="border border-primary/20 rounded-lg p-6 bg-card"
              >
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold">{phase.phase}</h3>
                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-sm ${
                      phase.status === "Concluído"
                        ? "bg-green-100 text-green-800"
                        : phase.status === "Em andamento"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {phase.status}
                  </span>
                </div>
                <ul className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle
                        className={`h-5 w-5 mr-2 mt-0.5 ${
                          phase.status === "Concluído"
                            ? "text-green-500"
                            : phase.status === "Em andamento" && itemIndex < 2
                              ? "text-green-500"
                              : "text-muted-foreground"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-12 md:py-16">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Nossa Equipe</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Conheça os profissionais por trás do WebyteCoin.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <FadeIn key={index} delay={0.2 * index}>
              <Card className="border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Parceiros */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-4">Nossos Parceiros</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Empresas e organizações que acreditam e apoiam o WebyteCoin.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnersData.map((partner, index) => (
            <FadeIn key={index} delay={0.2 * index}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-center">
                <div className="h-20 flex items-center justify-center mb-4">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={200}
                    height={100}
                    className="max-h-16 w-auto"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                <p className="text-muted-foreground text-sm">{partner.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 md:py-16">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-6">Junte-se à Nossa Comunidade</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Faça parte da revolução WebyteCoin e ajude a construir o futuro das finanças descentralizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <Link href="https://t.me/webytecoin" target="_blank">
                <Users className="mr-2 h-5 w-5" /> Entrar na Comunidade
              </Link>
            </Button>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}

