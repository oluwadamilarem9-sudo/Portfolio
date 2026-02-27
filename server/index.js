/**
 * Chat API for portfolio chatbot.
 * Uses OpenAI with API key from env. Never expose the key to the client.
 */

import express from 'express'
import OpenAI from 'openai'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json({ limit: '256kb' }))

const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim()
const openai = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null

const SYSTEM_PROMPT_BASE = `You are the friendly AI assistant for Moses Sunday (Mhentor), a full-stack developer. You help visitors on his portfolio website.

RULES:
- Answer ALL questions: greetings, general knowledge (e.g. "what country is USA", "greet me"), coding, business, science, or anything else. Be helpful and natural.
- When the question is about Moses/Mhentor, his work, services, skills, projects, pricing, hiring, or portfolio: use the WEBSITE CONTEXT below and give accurate, specific answers. Gently guide them to contact him (Hire Me page or email) when relevant.
- When the question is general (unrelated to the portfolio): answer like a knowledgeable, professional assistant. Be clear and concise.
- Be professional, warm, and concise. Keep replies focused (a few sentences unless the user asks for more).
- Never say you are ChatGPT, never mention OpenAI or any product name. You are simply the portfolio assistant.
- If you don't know something outside the website context, say so briefly and offer to help with portfolio-related questions.`

function buildSystemPrompt(contextStr) {
  if (!contextStr || !contextStr.trim()) {
    return SYSTEM_PROMPT_BASE + '\n\n(No website context provided — answer from general knowledge and be helpful.)'
  }
  return `${SYSTEM_PROMPT_BASE}

--- WEBSITE CONTEXT (use this when the user asks about Moses, his work, services, projects, or hiring) ---

${contextStr.trim()}

--- END WEBSITE CONTEXT ---`
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context } = req.body || {}

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array required' })
    }

    if (!openai) {
      return res.status(503).json({
        error: 'Chat not configured',
        hint: 'Set OPENAI_API_KEY on the server to enable the assistant.',
      })
    }

    const systemPrompt = buildSystemPrompt(typeof context === 'string' ? context : '')
    const chatMessages = messages.slice(-20).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: String(m.content || m.text || ''),
    }))

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...chatMessages,
    ]

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: apiMessages,
      max_tokens: 600,
      temperature: 0.7,
    })

    const reply = completion.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return res.status(502).json({ error: 'Empty response from assistant' })
    }

    res.json({ reply })
  } catch (err) {
    console.error('[chat]', err.message || err)
    const status = err.status === 401 ? 401 : err.code === 'insufficient_quota' ? 402 : 500
    res.status(status).json({
      error: err.message || 'Something went wrong',
    })
  }
})

app.get('/api/health', (_, res) => {
  res.json({ ok: true, chat: !!openai })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  if (!openai) console.warn('OPENAI_API_KEY not set — /api/chat will return 503')
})
