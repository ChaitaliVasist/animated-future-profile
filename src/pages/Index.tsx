
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Database, Brain, Cpu, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AnimatedBackground = () => {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} position={[-4, 0, -3]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>
      <Float speed={1.6} rotationIntensity={1} floatIntensity={3}>
        <Sphere args={[0.8, 100, 200]} position={[4, -1, -2]}>
          <MeshDistortMaterial
            color="#06B6D4"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[0.6, 100, 200]} position={[0, 2, -4]}>
          <MeshDistortMaterial
            color="#F59E0B"
            attach="material"
            distort={0.2}
            speed={1.8}
            roughness={0.3}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
};

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const numParticles = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
    />
  );
};

const Index = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = [
    { category: "Frontend", icon: <Globe className="w-5 h-5" />, items: ["React", "Next.js", "TypeScript", "HTML/CSS", "JavaScript"] },
    { category: "Backend", icon: <Database className="w-5 h-5" />, items: ["Node.js", "Python", "FastAPI", "Express.js", "REST APIs"] },
    { category: "Database", icon: <Cpu className="w-5 h-5" />, items: ["MongoDB", "MySQL", "MariaDB", "SQL"] },
    { category: "AI/ML", icon: <Brain className="w-5 h-5" />, items: ["TensorFlow", "PyTorch", "CNN", "Computer Vision", "Jupyter"] },
    { category: "DevOps", icon: <Code className="w-5 h-5" />, items: ["Git", "Docker", "Azure", "Vercel", "GitHub Actions"] }
  ];

  const projects = [
    {
      title: "Smart Hydroponics System",
      description: "IoT + AI based precision farming system for optimized plant growth and sustainability",
      tech: ["IoT", "AI", "Sensors", "Automation", "ML"],
      category: "AgriTech"
    },
    {
      title: "Brain Tumor Detection",
      description: "Web platform using CNN models to detect brain tumors from MRI scans",
      tech: ["Python", "TensorFlow", "Flask", "React", "CNN"],
      category: "Healthcare AI"
    },
    {
      title: "Web3 Movie Streaming Platform",
      description: "Full-stack decentralized movie streaming with blockchain integration",
      tech: ["React", "Node.js", "IPFS", "Web3.js", "Blockchain"],
      category: "Web3"
    },
    {
      title: "AlgoQuest",
      description: "Gamified interactive platform to learn data structures and algorithms",
      tech: ["React", "Node.js", "JavaScript", "MongoDB"],
      category: "EdTech"
    },
    {
      title: "Disaster Resource Finder",
      description: "Platform to crowdsource real-time aid during disasters",
      tech: ["HTML/CSS", "JavaScript", "MongoDB", "Map APIs"],
      category: "Social Impact"
    },
    {
      title: "Whispr App",
      description: "A full-featured messaging application with real-time push notifications",
      tech: ["React", "Capacitor", "Firebase Cloud Messaging", "TanStack Query"],
      category: "Android App"
    }
    
  ];

  const experience = [
    {
      title: "Full-Stack Developer & Product Manager",
      company: "NFThing",
      period: "2023-NOW",
      description: "Working as a Full-Stack Developer in building a movie streaming platform based on web3 and blockchain concepts. Monitored task progress while overseeing assignments as Product Manager.",
      achievements: ["Built Web3 movie streaming features", "Managed product lifecycle", "Technical leadership"]
    },
    {
      title: "Researcher - Smart Hydroponics & IoT Systems",
      company: "Independent Research",
      period: "2024-Now",
      description: "Investigating precision agriculture using IoT and automation in hydroponics to create own datasets. Focusing on AI-based control systems to optimize nutrient delivery.",
      achievements: ["IoT system development", "AI-based optimization", "Research publication in progress"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <ParticleField />
      <AnimatedBackground />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Chaitali Vasist
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-purple-400 transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-10">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: y1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-purple-300 mb-4"
            >
              Hi! I'm
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Chaitali Vasist
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              Full-Stack Developer 💻 | ML Researcher 🧠 | IoT & AgriTech Innovator 🌱
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                onClick={scrollToContact}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ y: y2 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-8 bg-gradient-to-r from-purple-800/40 to-cyan-800/40 rounded-full animate-pulse animation-delay-2000"></div>
              <div className="absolute inset-12 rounded-full overflow-hidden border-4 border-purple-400/50">
                <img 
                  src="/profile.jpg" 
                  alt="Chaitali Vasist" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-purple-500/20 p-8">
                <CardContent className="space-y-6">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    🎓 3rd Year Information Science & Engineering Student @ RIT (CGPA: 9.48)
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Dynamic Full-Stack Developer and Machine Learning Enthusiast with practical experience at NFThing, 
                    blending strong front-end development and product management capabilities.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    🌿 Led the development of intelligent hydroponic systems, demonstrating both technical leadership 
                    and innovation in sustainable agriculture.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">IoT Researcher</Badge>
                    <Badge className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30">AI Enthusiast</Badge>
                    <Badge className="bg-pink-600/20 text-pink-300 border-pink-500/30">Full-Stack Dev</Badge>
                    <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">Product Manager</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md border-purple-500/20 p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold text-white mb-2">CGPA</h3>
                <p className="text-purple-300">9.48/10</p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-md border-cyan-500/20 p-6 text-center">
                <Code className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white mb-2">Projects</h3>
                <p className="text-cyan-300">5+ Major</p>
              </Card>
              <Card className="bg-gradient-to-br from-pink-600/20 to-red-600/20 backdrop-blur-md border-pink-500/20 p-6 text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                <h3 className="text-2xl font-bold text-white mb-2">AI/ML</h3>
                <p className="text-pink-300">Expert</p>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-md border-yellow-500/20 p-6 text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white mb-2">Languages</h3>
                <p className="text-yellow-600">3 Fluent</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        id="experience"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-purple-500/20 p-8 hover:bg-white/10 transition-all duration-300">
                  <CardContent>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <p className="text-purple-400 text-lg">{exp.company}</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 self-start lg:self-center mt-2 lg:mt-0">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, i) => (
                        <Badge key={i} className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-purple-500/20 p-6 h-full hover:bg-white/10 transition-all duration-300 group">
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        {project.category}
                      </Badge>
                      <ExternalLink className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-purple-500/20 p-6 hover:bg-white/10 transition-all duration-300">
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mr-4">
                        {skill.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{skill.category}</h3>
                    </div>
                    <div className="space-y-2">
                      {skill.items.map((item, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Let's Connect
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-md border-purple-500/20 p-8">
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      I'm passionate about building impactful solutions using AI, IoT, and modern web technologies. 
                      Let's discuss how we can create something amazing together!
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-purple-400 mr-3" />
                        <span className="text-gray-300">chaitalivasist@gmail.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-purple-400 mr-3" />
                        <span className="text-gray-300">+91 6364078637</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-purple-400 mr-3" />
                        <span className="text-gray-300">Bangalore, India</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
                    <div className="flex space-x-4">
                      <motion.a
                        href="https://github.com/chaitalivasist"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                      >
                        <Github className="w-6 h-6 text-white" />
                      </motion.a>
                      <motion.a
                        href="https://www.linkedin.com/in/chaitali-vasist-4798022b9/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
                      >
                        <Linkedin className="w-6 h-6 text-white" />
                      </motion.a>
                      <motion.a
                        href="mailto:chaitalivasist@gmail.com"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 bg-gradient-to-r from-pink-600 to-red-600 rounded-full hover:from-pink-700 hover:to-red-700 transition-all duration-300"
                      >
                        <Mail className="w-6 h-6 text-white" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Chaitali Vasist. Built with React, Three.js & Framer Motion.
          </p>
          <p className="text-purple-400 mt-2 italic">
            "Build for impact. Learn without limits. Create with purpose."
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
