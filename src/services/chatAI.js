/**
 * AI Chat Service - Portfolio assistant. Answers any question (portfolio + general).
 * API options: Hugging Face (free), Gemini, Groq, or OpenAI.
 * Store keys in .env (e.g. VITE_HUGGINGFACE_API_KEY) - never commit real keys.
 */

function buildSystemPrompt(data) {
  const { hero, about, skills, projects, personal } = data
  const skillsText = skills.map(s => `- ${s.title}: ${s.description}`).join('\n')
  const projectsText = projects.map(p => `- ${p.title}: ${p.description}`).join('\n')

  return `You are the AI assistant for Moses Sunday (Mhentor) on his portfolio website.

CORE BEHAVIOUR
- Always be professional, clear, concise, and friendly.
- Answer ALL questions the visitor asks: greetings, questions about Mhentor, his work, services, skills, projects, pricing, as well as general questions (science, history, coding, business, etc.).
- Never say you are ChatGPT and never mention any underlying AI provider or model by name.

WHEN THE QUESTION IS ABOUT MHENTOR OR HIS WORK
- Prioritise the website context below.
- Be specific and accurate about his role, services, skills, projects, and how to contact or hire him.
- When it makes sense, gently guide the visitor toward contacting him or visiting the Hire Me page.

WHEN THE QUESTION IS GENERAL
- If the question is not clearly about Mhentor or his work, answer using your general knowledge like a capable assistant.
- Keep answers focused (2–5 sentences unless the user asks for more detail).

PORTFOLIO CONTEXT
- Role: ${hero.role}. ${hero.tagline}
- About: ${about.content}
- Mission: ${about.mission}
- Skills:
${skillsText}
- Projects:
${projectsText}
- Contact email: ${personal.email}`
}

function toGeminiContents(conversationHistory) {
  const mapped = conversationHistory
    .filter((m) => m.type === 'user' || m.type === 'bot')
    .slice(-12)
    .map((m) => ({
      role: m.type === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }))
  // Gemini requires first message to be from user - drop leading model messages
  while (mapped.length && mapped[0].role === 'model') mapped.shift()
  return mapped
}

async function tryGemini(geminiKey, systemPrompt, conversationHistory, userMessage) {
  const contents = toGeminiContents(conversationHistory)
  const body = contents.length
    ? { systemInstruction: { parts: [{ text: systemPrompt }] }, contents }
    : { systemInstruction: { parts: [{ text: systemPrompt }] }, contents: [{ role: 'user', parts: [{ text: userMessage }] }] }
  for (const model of ['gemini-2.0-flash', 'gemini-1.5-flash']) {
    try {
      const res = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      )
      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (text) return text.trim()
      if (data.error?.message) throw new Error(data.error.message)
    } catch (e) {
      if (model === 'gemini-1.5-flash') throw e
    }
  }
  throw new Error('No response')
}

async function tryOpenAI(openaiKey, messages) {
  const res = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openaiKey}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 600, temperature: 0.7 }),
  })
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content
  if (text) return text.trim()
  throw new Error(data.error?.message || 'No response')
}

async function tryGroq(groqKey, messages) {
  const res = await fetchWithTimeout('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqKey}` },
    body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages, max_tokens: 600, temperature: 0.7 }),
  })
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content
  if (text) return text.trim()
  throw new Error(data.error?.message || 'No response')
}

// Hugging Face Inference API (free tier) - Zephyr chat model
async function tryHuggingFace(hfKey, messages) {
  const res = await fetchWithTimeout('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${hfKey}`,
    },
    body: JSON.stringify({
      inputs: buildHuggingFacePrompt(messages),
      parameters: { max_new_tokens: 600, return_full_text: false, temperature: 0.7 },
    }),
  })
  const data = await res.json()
  const err = data.error || (data.length && data[0]?.error)
  if (err) throw new Error(typeof err === 'string' ? err : err.message || 'Hugging Face error')
  const raw = Array.isArray(data) ? data[0]?.generated_text : data.generated_text
  const text = raw != null ? String(raw).trim() : ''
  if (text) return text
  throw new Error('No response')
}

function buildHuggingFacePrompt(messages) {
  const parts = []
  for (const m of messages) {
    const role = m.role === 'system' ? 'system' : m.role === 'user' ? 'user' : 'assistant'
    const content = (m.content || m.text || '').trim()
    if (!content) continue
    parts.push(`<|${role}|>\n${content}`)
  }
  parts.push('<|assistant|>\n')
  return parts.join('\n')
}

const FETCH_TIMEOUT_MS = 12000

async function fetchWithTimeout(url, options = {}) {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal })
    clearTimeout(id)
    return res
  } catch (e) {
    clearTimeout(id)
    throw e
  }
}

async function tryBackend(apiUrl, userMessage) {
  const base = apiUrl.replace(/\/$/, '')
  const res = await fetchWithTimeout(`${base}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || res.statusText)
  const reply = data.reply
  if (reply) return String(reply).trim()
  throw new Error('No reply from server')
}

export async function getAIResponse(userMessage, conversationHistory, portfolioData) {
  const chatApiUrl = import.meta.env.VITE_CHAT_API_URL?.trim()
  const hfKey = import.meta.env.VITE_HUGGINGFACE_API_KEY?.trim()
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY?.trim()
  const groqKey = import.meta.env.VITE_GROQ_API_KEY?.trim()
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim()

  const systemPrompt = buildSystemPrompt(portfolioData)
  const chatMessages = conversationHistory.slice(-12).map((m) => ({
    role: m.type === 'user' ? 'user' : 'assistant',
    content: m.text,
  }))
  const messages = [{ role: 'system', content: systemPrompt }, ...chatMessages]

  const providers = [
    [chatApiUrl, () => tryBackend(chatApiUrl, userMessage)],
    [hfKey, () => tryHuggingFace(hfKey, messages)],
    [geminiKey, () => tryGemini(geminiKey, systemPrompt, conversationHistory, userMessage)],
    [groqKey, () => tryGroq(groqKey, messages)],
    [openaiKey, () => tryOpenAI(openaiKey, messages)],
  ]

  for (const [key, fn] of providers) {
    if (!key) continue
    try {
      const result = await fn()
      if (result) return result
    } catch (err) {
      console.warn('AI API error:', err)
    }
  }

  return null
}

export function hasAIKey() {
  const api = (import.meta.env.VITE_CHAT_API_URL || '').trim()
  const h = (import.meta.env.VITE_HUGGINGFACE_API_KEY || '').trim()
  const g = (import.meta.env.VITE_GEMINI_API_KEY || '').trim()
  const r = (import.meta.env.VITE_GROQ_API_KEY || '').trim()
  const o = (import.meta.env.VITE_OPENAI_API_KEY || '').trim()
  return !!(api || h || g || r || o)
}
