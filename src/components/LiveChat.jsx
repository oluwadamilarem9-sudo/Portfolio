import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolio'
import { getAIResponse, hasAIKey } from '../services/chatAI'

const quickQuestions = [
  "What do you do?",
  "What are your skills?",
  "How can I hire you?",
  "Tell me about your projects",
  "What's your experience?",
  "How to get started?",
]

function safeEvalMath(expr) {
  try {
    const sanitized = expr.replace(/[^0-9+\-*/().%\s]/g, '')
    if (/^[\d\s+\-*/().%]+$/.test(sanitized)) {
      return String(Function(`"use strict"; return (${sanitized})`)())
    }
  } catch (_) {}
  return null
}

function getBotResponse(message, data) {
  const msg = message.toLowerCase().trim()
  const { hero, about, skills, projects, personal, capabilities } = data

  // Simple math: "what is 2+2", "5 * 10", "100 / 4"
  const mathMatch = message.match(/(?:what(?:'s| is)?|calculate|solve)\s+(.+)|^([\d\s+\-*/().%]+)$/i)
  if (mathMatch) {
    const expr = (mathMatch[1] || mathMatch[2] || '').trim()
    const result = safeEvalMath(expr)
    if (result !== null) return `The answer is ${result}.`
  }

  // Date/time
  if (msg.includes('date') || msg.includes('time') || msg.includes('today') || msg.includes('what day')) {
    const now = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return `Today is ${now.toLocaleDateString('en-US', options)}.`
  }

  // Jokes
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "How many programmers does it take to change a light bulb? None—it's a hardware problem! 💡",
    "I'd tell you a joke about UDP, but you might not get it.",
    "Why did the developer quit? Because they didn't get arrays! 😄",
  ]
  if (msg.includes('joke') || msg.includes('funny') || msg.includes('laugh')) {
    return jokes[Math.floor(Math.random() * jokes.length)]
  }

  // Greetings: match whole phrases so "hi" in "think" or "this" doesn't trigger
  const isGreeting =
    /\b(hello|hi|hey)\b/.test(msg) ||
    msg.includes('good morning') ||
    msg.includes('good afternoon') ||
    msg.includes('good evening')
  if (isGreeting) {
    return `Hi! 👋 I'm ${hero.name}'s assistant. How can I help you today?`
  }

  // Services / what do you offer
  if (
    msg.includes('what do you do') ||
    msg.includes('what can you do') ||
    msg.includes('service') ||
    msg.includes('services') ||
    msg.includes('offer') ||
    msg.includes('offers') ||
    msg.includes('what does he do') ||
    msg.includes('what does he offer')
  ) {
    return `Mhentor is a ${hero.role}. ${hero.subtitle}\n\nHe offers services in:\n${skills
      .map((s) => `• ${s.title} – ${s.description}`)
      .join('\n')}\n\nIf you tell me a bit about your idea, I can suggest which service fits best.`
  }

  if (msg.includes('skill') || msg.includes('expertise') || msg.includes('can you build')) {
    return `Here are my core skills:\n\n${skills.map(s => `${s.title}: ${s.description}`).join('\n\n')}\n\n👉 [View Skills](/#skills)`
  }

  // Backend / Node.js / capable of building (e.g. "Is Mhentor capable of building a backend with Node.js?")
  if (
    msg.includes('backend') ||
    msg.includes('node') ||
    msg.includes('nodejs') ||
    msg.includes('node.js') ||
    ((msg.includes('capable') || msg.includes('capale')) && (msg.includes('build') || msg.includes('mhentor') || msg.includes('he '))) ||
    (msg.includes('can he') && msg.includes('build'))
  ) {
    const backendSkill = skills.find((s) => s.slug === 'backend-development')
    const fullstack = skills.find((s) => s.slug === 'full-stack-development')
    const line = backendSkill
      ? `Yes. Mhentor is ${fullstack ? 'a full-stack developer and ' : ''}skilled in backend development: ${backendSkill.description} He builds APIs, databases, and server-side systems with Node.js, Express, and modern backends.`
      : `Yes. Mhentor builds backends with Node.js, Express, and related tech. He develops robust APIs, databases, and server-side solutions. Ask "What are your skills?" for the full list, or go to [Hire Me](/hire-me) to discuss your project.`
    return line
  }

  if (msg.includes('hire') || msg.includes('work together') || msg.includes('project') || msg.includes('get started')) {
    return `Great! To work with me:\n\n1. Visit the **Hire Me** page to share your project details\n2. I offer: Quality Guaranteed, Timely Delivery, Competitive Rates\n3. I'll get back to you within 24 hours\n\n👉 [Go to Hire Me](/hire-me)`
  }

  if (msg.includes('project') || msg.includes('portfolio') || msg.includes('work') || msg.includes('built')) {
    const list = projects.slice(0, 4).map(p => `• ${p.title}: ${p.description.slice(0, 55)}...`).join('\n')
    return `Here are some of my featured projects:\n\n${list}\n\n👉 [View all projects](/projects)`
  }

  if (msg.includes('experience') || msg.includes('years') || msg.includes('how long')) {
    return `I have 3+ years of experience and 20+ projects completed. ${about.mission}\n\nMy values: ${about.values}`
  }

  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
    return `You can reach me at:\n📧 ${personal.email}\n\nOr fill out the form on the [Hire Me](/hire-me) page. I typically respond within 24 hours!`
  }

  if (msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
    return `I offer competitive rates! Share your project details on the [Hire Me](/hire-me) page and I'll provide a tailored quote. I guarantee quality and timely delivery.`
  }

  if (msg.includes('capability') || msg.includes('can you') || msg.includes('build')) {
    return `I can build:\n\n${capabilities.join('\n• ')}\n\nPlus performance optimizations, CI/CD, Docker, and more. Tell me about your project!`
  }

  if (msg.includes('thank') || msg.includes('thanks')) {
    return `You're welcome! Feel free to ask anything else or head to the [Hire Me](/hire-me) page when you're ready. 😊`
  }

  if (msg.includes('bye') || msg.includes('goodbye')) {
    return `Thanks for stopping by! Looking forward to working with you. [Hire Me](/hire-me) when you're ready! 👋`
  }

  // Mobile app, app development, what did you understand
  if (msg.includes('mobile app') || msg.includes('mobile application') || msg.includes('what did you understand') || msg.includes('understand about')) {
    return `A mobile app is software designed for smartphones and tablets. As a ${hero.role}, I can build mobile-friendly web apps (PWA) and work with React Native for cross-platform apps. ${hero.subtitle}\n\nWant details? Ask about my skills or [projects](/projects)!`
  }

  // Technology, coding, programming
  if (msg.includes('programming') || msg.includes('coding') || msg.includes('technology') || msg.includes('tech')) {
    return `I work with modern tech: React, Node.js, full-stack development. ${hero.subtitle}\n\nMy skills: ${skills.slice(0, 3).map(s => s.title).join(', ')}. Ask about my projects or how to hire me!`
  }

  // Website, web app, development
  if (msg.includes('website') || msg.includes('web app') || msg.includes('web development')) {
    return `I build websites and web applications. ${hero.subtitle}\n\nI offer: ${capabilities.slice(0, 3).join(', ')}. [Hire Me](/hire-me) to get started!`
  }

  // Who are you, name, identity, who is mhentor
  if (
    msg.includes('who are you') ||
    msg.includes('your name') ||
    msg.includes('what is your name') ||
    msg.includes('who is mhentor') ||
    msg.includes('who is moses') ||
    msg.includes('about you')
  ) {
    return `I'm the assistant for ${hero.name} (${personal.realName || hero.name}), a ${hero.role}. ${hero.subtitle}\n\nAsk about his skills, projects, or how to work with him!`
  }

  // How are you / what's up
  if (msg.includes('how are you') || msg.includes("what's up") || msg.includes('how do you do')) {
    return `Doing well, thanks for asking! 👋 How can I help you today—anything about Mhentor's work or projects?`
  }

  // USA / country (simple general knowledge)
  if (msg.includes('usa') || msg.includes('united states') || msg.includes('what country')) {
    return `The USA (United States of America) is a country in North America. Its capital is Washington, D.C. Need info about Mhentor's services or projects? Just ask!`
  }

  // ----- Generic knowledge (capitals, geography, science, books, etc.) -----
  const genericQA = [
    [/capital of france|france capital/i, "The capital of France is Paris."],
    [/capital of (the )?uk|uk capital|britain capital|england capital/i, "The capital of the United Kingdom is London."],
    [/capital of germany|germany capital/i, "The capital of Germany is Berlin."],
    [/capital of nigeria|nigeria capital/i, "The capital of Nigeria is Abuja (Lagos is the largest city)."],
    [/capital of japan|japan capital/i, "The capital of Japan is Tokyo."],
    [/capital of china|china capital/i, "The capital of China is Beijing."],
    [/capital of india|india capital/i, "The capital of India is New Delhi."],
    [/capital of canada|canada capital/i, "The capital of Canada is Ottawa."],
    [/capital of australia|australia capital/i, "The capital of Australia is Canberra."],
    [/what is gravity|define gravity/i, "Gravity is the force that attracts objects with mass toward each other. Earth's gravity is what keeps us on the ground."],
    [/what is photosynthesis|define photosynthesis/i, "Photosynthesis is how plants use sunlight, water, and carbon dioxide to make food (sugar) and release oxygen."],
    [/what is water|define water/i, "Water (H₂O) is a molecule made of two hydrogen atoms and one oxygen atom. It's essential for life and exists as liquid, ice, and vapor."],
    [/who wrote romeo and juliet|romeo and juliet author/i, "William Shakespeare wrote Romeo and Juliet."],
    [/who wrote hamlet|hamlet author/i, "William Shakespeare wrote Hamlet."],
    [/who invented the (light )?bulb|inventor of (the )?bulb/i, "Thomas Edison is credited with inventing the first practical incandescent light bulb (late 1870s)."],
    [/largest (country|nation) in the world|biggest country/i, "Russia is the largest country by area. By population, India is the largest."],
    [/how many continents|how many countries/i, "There are 7 continents and about 195 countries in the world."],
    [/what is (the )?speed of light/i, "The speed of light in a vacuum is about 299,792 kilometers per second (or roughly 186,282 miles per second)."],
    [/what is pi|value of pi/i, "Pi (π) is approximately 3.14159. It's the ratio of a circle's circumference to its diameter."],
    [/what is javascript|define javascript/i, "JavaScript is a programming language used mainly for web browsers. It runs in the browser and on servers (e.g. Node.js)."],
    [/what is react|define react/i, "React is a JavaScript library for building user interfaces, especially single-page apps. It uses components and a virtual DOM."],
    [/what is api|define api/i, "An API (Application Programming Interface) is a way for programs to talk to each other—it defines how to request and receive data from a service."],
    [/what is html|define html/i, "HTML (HyperText Markup Language) is the standard language for creating web pages. It structures content with tags."],
    [/what is css|define css/i, "CSS (Cascading Style Sheets) is used to style and layout web pages—colors, fonts, spacing, and responsive design."],
    [/good night|goodnight/i, "Good night! Sleep well. Feel free to come back and ask about Mhentor's work anytime. 👋"],
    [/yes|yeah|yep|sure|ok(ay)?\s*\.?$/i, "Great! What would you like to know—about his services, projects, or how to work with him?"],
    [/no\s*\.?$|nope/i, "No problem. If you change your mind, ask me about Mhentor's portfolio or how to hire him. 😊"],
  ]
  for (const [pattern, answer] of genericQA) {
    if (pattern.test(message.trim())) return answer
  }

  // "What is X?" / "Who is X?" / "Where is X?" — short generic answer when we don't have a specific match
  if (/^(what is|what are|who is|who are|where is|where are|when did|when was|how do(es)?|how can)\s+.+\??\s*$/i.test(message.trim())) {
    return "That's a general knowledge question. I'm best at answering questions about Mhentor—his services, projects, skills, and how to hire him. Try: \"What do you do?\" or \"What services do you offer?\" For other topics, you can ask me about capitals, math, date/time, or jokes!"
  }

  // Help / what can you answer
  if (msg.includes('help') || msg.includes('what can you') || msg.includes('what do you answer')) {
    return `I can help with:\n• Portfolio: skills, services, projects, hiring, experience\n• Simple math and date/time\n• Jokes and small talk\n• Capitals, basic science, and general knowledge\n\nAsk me anything—or try: \"What do you do?\" or \"How can I hire you?\"`
  }

  // Generic fallback – always reply
  return `I'm ${hero.name}'s assistant. I can tell you about his services, projects, skills, and how to work with him. You can also ask me: capitals (e.g. capital of France), simple math, date/time, or a joke. Try: \"What do you do?\" \"Capital of Japan?\" or \"How can I hire you?\"`
}

export default function LiveChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (open && messages.length === 0) {
      const aiEnabled = hasAIKey()
      const welcome = {
        type: 'bot',
        text: aiEnabled
          ? `Hi! 👋 I'm ${portfolioData.hero.name}'s AI assistant. Ask me anything—about his work, services, projects, or any general question you have.`
          : `Hi! 👋 I'm ${portfolioData.hero.name}, your ${portfolioData.hero.role}.\n\n${portfolioData.hero.subtitle}\n\nAsk about my services, skills, projects, or how to work together!`,
      }
      setMessages([welcome])
    }
  }, [open])

  const sendMessage = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg) return

    setMessages((m) => [...m, { type: 'user', text: userMsg }])
    setInput('')
    setLoading(true)

    const history = [...messages, { type: 'user', text: userMsg }]
    const AI_TIMEOUT_MS = 10000 // 10s then fallback to hardcoded bot
    let reply = null

    try {
      reply = await Promise.race([
        getAIResponse(userMsg, history, portfolioData),
        new Promise((resolve) => setTimeout(() => resolve(null), AI_TIMEOUT_MS)),
      ])
    } catch (e) {
      console.warn('AI error:', e)
    }

    if (!reply || !String(reply).trim()) {
      reply = getBotResponse(userMsg, portfolioData)
    }
    if (!reply || !String(reply).trim()) {
      reply = "I'm here! Ask me about Mhentor's services, projects, skills, or how to hire him. Try: \"What do you do?\" or \"Tell me about your projects.\""
    }

    setLoading(false)
    setMessages((m) => [...m, { type: 'bot', text: reply }])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating chat button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Open live chat"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] md:w-[380px] h-[480px] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{portfolioData.hero.name}</p>
                  <p className="text-xs opacity-90">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    <ChatMessage text={msg.text} />
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md px-4 py-2 bg-muted text-foreground text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={() => sendMessage()}
                  className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  aria-label="Send"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ChatMessage({ text }) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'link', label: match[1], href: match[2] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) })
  }
  if (parts.length === 0) parts.push({ type: 'text', content: text })

  return (
    <>
      {parts.map((p, i) =>
        p.type === 'link' ? (
          <Link key={i} to={p.href} className="text-primary underline font-medium">
            {p.label}
          </Link>
        ) : (
          <span key={i}>
            {p.content.split('\n').map((line, j) => (
              <span key={j}>
                {line}
                {j < p.content.split('\n').length - 1 && <br />}
              </span>
            ))}
          </span>
        )
      )}
    </>
  )
}
