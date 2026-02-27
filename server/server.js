import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Load .env from project root so one file can hold HUGGINGFACE_API_KEY and frontend vars
dotenv.config({ path: join(__dirname, "..", ".env") });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body || {};
  const text = typeof message === "string" ? message.trim() : "";
  if (!text) {
    return res.status(400).json({ error: "Missing or empty message" });
  }
  if (!process.env.HUGGINGFACE_API_KEY) {
    return res.status(503).json({ error: "Server not configured: set HUGGINGFACE_API_KEY in .env" });
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${text} [/INST]`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();
    const err = data?.error || (Array.isArray(data) && data[0]?.error);
    if (err) {
      const msg = typeof err === "string" ? err : err.message || "Model error";
      return res.status(502).json({ error: msg });
    }
    const reply = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text;
    res.json({ reply: reply && String(reply).trim() ? reply.trim() : "No response" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});