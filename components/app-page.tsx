'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github, ChevronRight, FileDown } from "lucide-react"
import Image from 'next/image'
import { AnimatedBackgroundComponent } from '@/components/animated-background'
interface Job {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Skill {
  name: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface FunFact {
  icon: string;
  fact: string;
}

export function Page() {
  const [careerData, setCareerData] = useState<Job[]>([])
  const [skillsData, setSkillsData] = useState<Skill[]>([])
  const [projectsData, setProjectsData] = useState<Project[]>([])
  const [funFactsData, setFunFactsData] = useState<FunFact[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const summaryHighlights = [
    'Deliver enterprise-grade applications end-to-end for Los Angeles County Public Works, from discovery through deployment.',
    'Build automation and conversational experiences with Blazor, Azure OpenAI, PostgreSQL, and modern DevOps practices.',
    'Modernize ColdFusion, .NET, and WebForms systems while guiding stakeholders through the full SDLC.'
  ]

  const focusAreas = [
    {
      title: 'Azure OpenAI Chatbot',
      description: 'Designing a departmental assistant that connects Azure OpenAI with a PostgreSQL knowledge base to surface answers instantly.'
    },
    {
      title: 'STAR Service Tickets',
      description: 'Led a Vue + Electron platform with real-time data sync, detailed requirement docs, and measured field efficiency gains.'
    },
    {
      title: 'Security Readiness',
      description: "Developed CSULB's phishing simulation suite with Flask, Google Cloud, and Selenium automation to train thousands of users."
    }
  ]

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          careerResponse,
          skillsResponse,
          projectsResponse,
          funFactsResponse
        ] = await Promise.all([
          fetch('/api/career'),
          fetch('/api/skills'),
          fetch('/api/projects'),
          fetch('/api/funFacts')
        ])

        if (careerResponse.ok) {
          setCareerData(await careerResponse.json())
        }
        if (skillsResponse.ok) {
          setSkillsData(await skillsResponse.json())
        }
        if (projectsResponse.ok) {
          setProjectsData(await projectsResponse.json())
        }
        if (funFactsResponse.ok) {
          setFunFactsData(await funFactsResponse.json())
        }
      } catch (error) {
        console.error('Failed to load portfolio data', error)
      }
    }

    fetchData()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const { scrollYProgress } = useScroll()
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 text-white"
      style={{ backgroundPositionY: yBg }}
    >

      <title>Faizan Zafar</title>
      
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackgroundComponent />
        <motion.div 
          className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"
          style={{
            transform: `translate(${mousePosition.x / 100}px, ${mousePosition.y / 100}px)`,
            transition: 'transform 0.2s ease-out',
            opacity
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center">
          
          <motion.h1 
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Faizan Zafar
          </motion.h1>
          <motion.h2 
            className="text-3xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Information Systems Analyst II (Application Developer)
          </motion.h2>
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <a href="/Faizan_Zafar_Resume.pdf" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <FileDown className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:zafarfaizan97@gmail.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Me
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://www.linkedin.com/in/zafarfaizan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/bimbimsalabim" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </div>
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        >
          <ChevronRight className="h-12 w-12 rotate-90" />
        </motion.div>
      </header>

      <main className="container mx-auto py-16 px-4">
        {/* Professional Snapshot Section */}
        <section className="mb-24">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Professional Snapshot
          </motion.h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              className="rounded-2xl bg-white/10 p-8 backdrop-blur-lg lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="mb-6 text-lg text-teal-100">
                Software engineer and systems analyst translating complex public sector workflows into resilient, user-friendly applications.
              </p>
              <ul className="space-y-3 text-sm sm:text-base">
                {summaryHighlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-teal-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="flex flex-col gap-4 rounded-2xl bg-white/5 p-8 backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {focusAreas.map((area, index) => (
                <div
                  key={area.title}
                  className="rounded-xl border border-white/10 bg-black/20 p-4 shadow-lg shadow-black/20"
                >
                  <p className="text-xs uppercase tracking-widest text-teal-300">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-xl font-semibold">{area.title}</h3>
                  <p className="mt-2 text-sm text-teal-100/80">
                    {area.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-24">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Experience Highlights
          </motion.h2>
          <div className="relative">
            {careerData.map((job, index) => (
              <motion.div 
                key={index}
                className="mb-12 flex items-start"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                  <h3 className="text-2xl font-bold">{job.title}</h3>
                  <p className="text-xl text-teal-300">{job.company}</p>
                  <p className="text-gray-400">{job.period}</p>
                </div>
                <div className="w-px bg-white h-full mx-4 relative">
                  <div className="absolute w-4 h-4 bg-teal-400 rounded-full -left-1.5 top-0" />
                </div>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <p>{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Skills &amp; Tools
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skillsData.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <motion.div
                    className="bg-teal-400 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Project Spotlight Section */}
        <section className="mb-24">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Highlighted Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg group aspect-video"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm">{project.description}</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Credentials Section */}
        <section className="mb-24">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Education &amp; Credentials
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {funFactsData.map((item, index) => (
              <motion.div
                key={index}
                className="rounded-lg bg-white/10 p-6 text-left"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <p className="text-lg leading-relaxed">{item.fact}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Let's Connect Section */}
        <section>
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Let&apos;s Connect
          </motion.h2>
          <div className="flex justify-center space-x-8">
            <motion.a
              href="mailto:zafarfaizan97@gmail.com"
              className="text-white hover:text-teal-300 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="h-12 w-12" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/zafarfaizan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-teal-300 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="h-12 w-12" />
            </motion.a>
            <motion.a
              href="https://github.com/bimbimsalabim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-teal-300 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="h-12 w-12" />
            </motion.a>
          </div>
        </section>
      </main>

      <motion.footer 
        className="bg-black bg-opacity-30 py-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>&copy; {currentYear} Faizan Zafar. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  )
}
