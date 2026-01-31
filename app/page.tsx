'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Github, Code, MessageSquare } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { EnhancedLoading } from "@/components/enhanced-loading"
import { AnimatedText } from "@/components/animated-text"

export default function Home() {
  const router = useRouter()
  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [loadingText, setLoadingText] = useState("Analyzing Repository...") // New state for loading text
  const inputRef = useRef<HTMLInputElement>(null)
  const [typedText, setTypedText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const phrases = [
    "repositories in seconds",
    "code architecture instantly",
    "dependencies effortlessly",
    "complex projects easily",
    "any codebase faster"
  ]

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    if (!isDeleting && typedText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), pauseTime)
      return
    }

    if (isDeleting && typedText === "") {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
      return
    }

    const timeout = setTimeout(() => {
      setTypedText(
        isDeleting
          ? currentPhrase.substring(0, typedText.length - 1)
          : currentPhrase.substring(0, typedText.length + 1)
      )
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, phraseIndex, phrases])

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleAnalyze = async () => { // Make handleAnalyze async
    // Extract username and repo from the URL
    const urlPattern = /(?:github\.com\/)(([-\w.]+)\/([-\w.]+))/
    const match = repoUrl.match(urlPattern)

    let username: string | null = null;
    let repo: string | null = null;

    if (match) {
      [, , username, repo] = match
    } else {
      // If URL doesn't match pattern, check if it contains any text and try to extract username/repo
      const simplifiedPattern = /(([-\w.]+)\/([-\w.]+))/
      const simplifiedMatch = repoUrl.match(simplifiedPattern)
      
      if (simplifiedMatch) {
        [, , username, repo] = simplifiedMatch
      } else if (repoUrl.trim() !== '') {
        // If no pattern matches but there is text, alert the user
        alert('Please enter a valid GitHub repository URL or username/repository format')
        return;
      } else {
        // If empty, alert the user
        alert('Please enter a GitHub repository URL')
        return;
      }
    }

    if (username && repo) {
      setIsAnalyzing(true)
      setLoadingText("Fetching Repository Data...")

      try {
        // First, trigger GitIngest analysis
        setLoadingText("Analyzing repository with GitIngest...");
        const gitIngestResponse = await fetch('/api/collect-repo-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, repo, force: true }), // force: true to ensure fresh fetch
        });

        const gitIngestResult = await gitIngestResponse.json();

        if (!gitIngestResponse.ok) {
          throw new Error(gitIngestResult.error || 'Failed to analyze repository with GitIngest');
        }

        setLoadingText("Repository analyzed successfully!");
        
        // Add a small delay to show success message before navigating
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to the repository page
        router.push(`/${username}/${repo}`);
      } catch (error) {
        console.error('Failed to analyze repository:', error);
        alert(error instanceof Error ? error.message : 'Failed to analyze repository');
        setIsAnalyzing(false);
        setLoadingText("Analyzing Repository..."); // Reset loading text
      } 
    }    
    // Log for debugging
    console.log('Analyze button clicked', { repoUrl })
  }
  
  // Handle Enter key press in the input field
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Prevent default form submission
      console.log('Enter key pressed')
      handleAnalyze()
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section with 3D Parallax Background */}
      <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* 3D Depth layers */}
        <div className="absolute inset-0 z-0" style={{ perspective: '1000px' }}>
          {/* Layer 1: Deep background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
          
          {/* Layer 2: Animated grid */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 2px, transparent 2px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2)',
            transformOrigin: 'center bottom'
          }}></div>
          
          {/* Layer 3: Floating 3D cubes */}
          <div className="absolute top-[20%] left-[10%] w-24 h-24 border-2 border-purple-400/40 backdrop-blur-sm bg-purple-500/10 rounded-lg animate-float-cube-1" style={{
            transform: 'rotateX(45deg) rotateY(45deg)',
            boxShadow: '0 25px 50px rgba(168, 85, 247, 0.3)'
          }}></div>
          
          <div className="absolute top-[15%] right-[15%] w-32 h-32 border-2 border-pink-400/40 backdrop-blur-sm bg-pink-500/10 rounded-lg animate-float-cube-2" style={{
            transform: 'rotateX(-30deg) rotateY(-30deg)',
            boxShadow: '0 25px 50px rgba(236, 72, 153, 0.3)'
          }}></div>
          
          <div className="absolute bottom-[20%] left-[20%] w-20 h-20 border-2 border-violet-400/40 backdrop-blur-sm bg-violet-500/10 rounded-lg animate-float-cube-3" style={{
            transform: 'rotateX(60deg) rotateY(-45deg)',
            boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3)'
          }}></div>
          
          <div className="absolute bottom-[25%] right-[18%] w-28 h-28 border-2 border-fuchsia-400/40 backdrop-blur-sm bg-fuchsia-500/10 rounded-lg animate-float-cube-4" style={{
            transform: 'rotateX(-45deg) rotateY(60deg)',
            boxShadow: '0 25px 50px rgba(217, 70, 239, 0.3)'
          }}></div>
          
          {/* Layer 4: Glowing particles */}
          <div className="absolute top-[30%] left-[25%] w-3 h-3 bg-purple-400 rounded-full animate-particle-float opacity-80 blur-[1px]"></div>
          <div className="absolute top-[45%] right-[30%] w-2 h-2 bg-pink-400 rounded-full animate-particle-float-2 opacity-70 blur-[1px]"></div>
          <div className="absolute top-[60%] left-[15%] w-3 h-3 bg-violet-400 rounded-full animate-particle-float-3 opacity-75 blur-[1px]"></div>
          <div className="absolute bottom-[30%] right-[20%] w-2 h-2 bg-fuchsia-400 rounded-full animate-particle-float-4 opacity-80 blur-[1px]"></div>
          <div className="absolute top-[70%] left-[40%] w-3 h-3 bg-pink-400 rounded-full animate-particle-float opacity-70 blur-[1px]"></div>
          <div className="absolute top-[25%] right-[45%] w-2 h-2 bg-purple-400 rounded-full animate-particle-float-2 opacity-75 blur-[1px]"></div>
          
          {/* Layer 5: Multiple decorative ovals - smaller and more scattered */}
          <div className="absolute top-[8%] left-[3%] w-48 h-32 border-2 border-purple-400/20 rounded-full animate-pulse-glow" style={{ transform: 'rotate(-25deg)' }}></div>
          <div className="absolute top-[25%] right-[5%] w-40 h-28 border-2 border-pink-400/25 rounded-full animate-pulse-glow-delayed" style={{ transform: 'rotate(35deg)' }}></div>
          <div className="absolute bottom-[15%] left-[8%] w-56 h-36 border-2 border-fuchsia-400/20 rounded-full animate-pulse-glow" style={{ transform: 'rotate(15deg)' }}></div>
          <div className="absolute bottom-[35%] right-[12%] w-44 h-30 border-2 border-violet-400/25 rounded-full animate-pulse-glow-delayed" style={{ transform: 'rotate(-40deg)' }}></div>
          <div className="absolute top-[45%] left-[15%] w-36 h-24 border-2 border-purple-400/15 rounded-full animate-pulse-glow" style={{ transform: 'rotate(20deg)' }}></div>
          <div className="absolute top-[60%] right-[20%] w-42 h-28 border-2 border-pink-400/20 rounded-full animate-pulse-glow-delayed" style={{ transform: 'rotate(-15deg)' }}></div>
          <div className="absolute bottom-[45%] left-[25%] w-38 h-26 border-2 border-fuchsia-400/18 rounded-full animate-pulse-glow" style={{ transform: 'rotate(45deg)' }}></div>
          <div className="absolute top-[35%] right-[35%] w-34 h-22 border-2 border-violet-400/22 rounded-full animate-pulse-glow-delayed" style={{ transform: 'rotate(-30deg)' }}></div>
        </div>
        <div className="max-w-3xl w-full text-center flex flex-col justify-center items-center h-full space-y-16">
          {isAnalyzing ? (
            <div className="flex items-center justify-center min-h-[200px]">
              {/* Use EnhancedLoading component with dynamic text */}
              <EnhancedLoading loadingText={loadingText} />
            </div>
          ) : (
            <>
              <div className="space-y-4 sm:space-y-6 animate-fade-in pt-16 sm:pt-24 px-4">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-chunk text-center leading-tight">
                    <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]" style={{
                      textShadow: '0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(236, 72, 153, 0.3)'
                    }}>
                      Understand GitHub
                    </span>
                  </h1>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-chunk text-center min-h-[1.2em] leading-tight">
                    <span className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]" style={{
                      textShadow: '0 0 40px rgba(236, 72, 153, 0.4), 0 0 80px rgba(168, 85, 247, 0.3)'
                    }}>
                      {typedText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </h1>
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 animate-fade-in-up font-medium text-center max-w-2xl mx-auto" style={{ animationDelay: '1s' }}>
                  Instantly analyze, understand, and improve any GitHub project with AI-powered insights.
                </p>
              </div>

              <div id="input-section" className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl w-full mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.5s' }}>
                <Input 
                  id="repo-input"
                  placeholder="github.com/username/repository" 
                  className="flex-1 border-2 focus:border-blue-500 transition-all z-10 h-12 text-sm sm:text-base" 
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  onKeyDown={handleKeyPress}
                  ref={inputRef}
                  autoFocus
                  onPaste={(e) => {
                    e.stopPropagation()
                    const pastedText = e.clipboardData.getData('text')
                  }}
                />
                <Button 
                  className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg px-6 h-12 text-sm sm:text-base font-medium z-10 whitespace-nowrap" 
                  onClick={handleAnalyze}
                  type="button"
                  aria-label="Analyze Repository"
                >
                  Analyze Repository <ArrowRight size={16} />
                </Button>
              </div>

              <div className="pt-4 text-xs sm:text-sm text-slate-400 animate-fade-in-up overflow-x-auto px-4 text-center" style={{ animationDelay: '2s' }}>
                <span className="inline-block">Example: github.com/username/repo</span>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Matching gradient background */}
        <div className="absolute inset-0 -z-10">
          {/* Base gradient - matching hero section */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-fuchsia-900 to-pink-900" />
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Grid overlay - more subtle */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent px-4">How It Works</h2>
          <p className="text-center text-slate-300 text-base sm:text-lg mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto px-4">Our AI-powered platform makes understanding any GitHub repository effortless</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Repository Analysis Card */}
            <div 
              onClick={() => {
                const inputSection = document.getElementById('input-section');
                if (inputSection) {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                  setTimeout(() => {
                    const input = document.getElementById('repo-input') as HTMLInputElement;
                    if (input) {
                      input.focus();
                    }
                  }, 800);
                }
              }}
              className="group glass-card p-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 border border-purple-500/30 hover:border-purple-400/60 relative overflow-hidden transform hover:-translate-y-3 hover:scale-105 cursor-pointer"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-transparent to-blue-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
              
              {/* Icon with 3D animation */}
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform group-hover:scale-110 sm:group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 shadow-lg shadow-purple-500/30">
                <Github className="text-purple-300 h-7 w-7 sm:h-8 sm:w-8 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-purple-200 transition-colors duration-300 relative z-10">Repository Analysis</h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed relative z-10 mb-4 sm:mb-6">
                Our AI scans the entire repository structure, code, and documentation to build a comprehensive
                understanding of your project's architecture and dependencies.
              </p>
              
              {/* Enhanced interactive button */}
              <div className="flex items-center text-purple-300 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-500 relative z-10 group/btn">
                <span className="text-sm tracking-wide">Try Now</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Smart Insights Card */}
            <div 
              onClick={() => {
                const inputSection = document.getElementById('input-section');
                if (inputSection) {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                  setTimeout(() => {
                    const input = document.getElementById('repo-input') as HTMLInputElement;
                    if (input) {
                      input.focus();
                    }
                  }, 800);
                }
              }}
              className="group glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-500 border border-pink-500/30 hover:border-pink-400/60 relative overflow-hidden transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-[1.02] sm:hover:scale-105 cursor-pointer"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/15 via-transparent to-purple-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
              
              {/* Icon with 3D animation */}
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-pink-500/30 to-purple-500/30 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform group-hover:scale-110 sm:group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 shadow-lg shadow-pink-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-300 group-hover:text-white transition-colors duration-300 sm:w-8 sm:h-8"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-pink-200 transition-colors duration-300 relative z-10">Smart Insights</h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed relative z-10 mb-4 sm:mb-6">
                Get detailed explanations about project structure, dependencies, and how different components interact with each other in your codebase.
              </p>
              
              {/* Enhanced interactive button */}
              <div className="flex items-center text-pink-300 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-500 relative z-10 group/btn">
                <span className="text-sm tracking-wide">Try Now</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Code Navigation Card */}
            <div 
              onClick={() => {
                const inputSection = document.getElementById('input-section');
                if (inputSection) {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                  setTimeout(() => {
                    const input = document.getElementById('repo-input') as HTMLInputElement;
                    if (input) {
                      input.focus();
                    }
                  }, 800);
                }
              }}
              className="group glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 border border-purple-500/30 hover:border-purple-400/60 relative overflow-hidden transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-[1.02] sm:hover:scale-105 cursor-pointer"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-transparent to-pink-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
              
              {/* Icon with 3D animation */}
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform group-hover:scale-110 sm:group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 shadow-lg shadow-purple-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-300 group-hover:text-white transition-colors duration-300 sm:w-8 sm:h-8"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-purple-200 transition-colors duration-300 relative z-10">Code Navigation</h3>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed relative z-10 mb-4 sm:mb-6">
                Easily navigate through the codebase with our interactive file explorer and get instant explanations for any part of your project.
              </p>
              
              {/* Enhanced interactive button */}
              <div className="flex items-center text-purple-300 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-500 relative z-10 group/btn">
                <span className="text-sm tracking-wide">Try Now</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
          
          {/* Additional Features Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-4">Additional Features</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Feature 1 */}
              <div className="group flex items-start space-x-4 sm:space-x-5 p-5 sm:p-6 glass-card rounded-lg sm:rounded-xl hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 border border-purple-500/20 hover:border-purple-400/40 transform hover:scale-[1.02] sm:hover:scale-[1.03] cursor-pointer">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 sm:group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/30">
                  <Code className="h-5 w-5 sm:h-6 sm:w-6 text-purple-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-purple-200 transition-colors duration-300">Code Explanations</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">Get detailed explanations of complex code sections with examples and best practices.</p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="group flex items-start space-x-5 p-6 glass-card rounded-xl hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-500 border border-pink-500/20 hover:border-pink-400/40 transform hover:scale-[1.03] cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-pink-500/30">
                  <MessageSquare className="h-6 w-6 text-pink-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-200 transition-colors duration-300">AI Chat Assistant</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">Ask questions about the repository and get instant, contextual answers from our AI.</p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="group flex items-start space-x-5 p-6 glass-card rounded-xl hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 border border-purple-500/20 hover:border-purple-400/40 transform hover:scale-[1.03] cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300 group-hover:text-white transition-colors duration-300">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">Dependency Analysis</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">Understand how different parts of your codebase depend on each other with visual graphs.</p>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="group flex items-start space-x-5 p-6 glass-card rounded-xl hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-500 border border-pink-500/20 hover:border-pink-400/40 transform hover:scale-[1.03] cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-pink-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300 group-hover:text-white transition-colors duration-300">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-200 transition-colors duration-300">Documentation Generation</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">Automatically generate comprehensive documentation for your project with a single click.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

