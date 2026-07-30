import { NextResponse } from 'next/server'
import { buildPortfolioContext } from '@/lib/buildPortfolioContext'
import { portfolioData } from '@/data/portfolio'

export const runtime = 'nodejs'

async function callHuggingFace(message, context) {
  const key = process.env.HUGGINGFACE_API_KEY
  if (!key) return null

  const prompt = `You are Mhentor's portfolio assistant. Use this context:\n${context}\n\nUser: ${message}\nAssistant:`
  const res = await fetch(
    'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 256, temperature: 0.7, return_full_text: false },
      }),
    }
  )

  if (!res.ok) return null
  const data = await res.json()
  const text = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text
  return text?.trim() || null
}

async function callOpenAI(message, context) {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: `You are Mhentor's helpful portfolio assistant. Be concise and accurate.\n\n${context}`,
        },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 400,
    }),
  })

  if (!res.ok) return null
  const data = await res.json()
  return data.choices?.[0]?.message?.content?.trim() || null
}

export async function POST(request) {
  try {
    const body = await request.json()
    const message = String(body.message || body.messages?.at(-1)?.content || '').trim()
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const context = buildPortfolioContext(portfolioData)
    const reply =
      (await callOpenAI(message, context)) ||
      (await callHuggingFace(message, context)) ||
      `Thanks for your message! I can help with projects, services, and availability. Email ${portfolioData.personal.email} or visit /hire-me to start a project.`

    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json(
      { error: 'Chat unavailable', reply: 'Something went wrong. Please try again or use the contact page.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
