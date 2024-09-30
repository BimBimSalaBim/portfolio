'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import {  Mail, Linkedin, Github, ChevronRight } from "lucide-react"
import Image from 'next/image';
import { AnimatedBackgroundComponent } from '@/components/animated-background'
const url = process.env.url || 'http://fzafar.com';
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

  useEffect(() => {
    fetch(url+'/api/career')
      .then(res => res.json())
      .then(data => setCareerData(data))

    fetch(url+'/api/skills')
      .then(res => res.json())
      .then(data => setSkillsData(data))

    fetch(url+'/api/projects')
      .then(res => res.json())
      .then(data => setProjectsData(data))

    fetch(url+'/api/funFacts')
      .then(res => res.json())
      .then(data => setFunFactsData(data))

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
            Software Engineer | Systems Analyst
          </motion.h2>
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button variant="outline" size="lg">
              <a href="mailto:zafarfaizan97@gmail.com" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </a>
            </Button>
            <Button variant="outline" size="lg">
              <a href="https://www.linkedin.com/in/zafarfaizan" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="lg">
              <a href="https://github.com/bimbimsalabim" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2 h-4 w-4" />
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
        {/* Career Journey Section */}
        <section className="mb-24">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Career Journey
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

        {/* Skills Showcase Section */}
        <section className="mb-24">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Skills Showcase
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
            Project Spotlight
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

        {/* Fun Facts Section */}
        <section className="mb-24">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fun Facts
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {funFactsData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-lg">{item.fact}</p>
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
        <p>&copy; 2024 Faizan Zafar. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  )
}
