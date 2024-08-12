import express from 'express'
import cors from 'cors'
import openai from 'openai'
import 'dotenv/config'

// Basic express app to call OpenAI API using POST request
const app = express()
const port = 15032

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/v2/generate', async (req, res) => {
    // Obtain OpenAI API key from .env file
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'API key not found' })
    }

    // Init openai
    const oai = new openai(process.env.OPENAI_API_KEY)

    // Validate the request
    if (!req.body.prompt && typeof req.body.prompt != 'string') {
        return res.status(400).json({ error: 'Prompt is required in string' })
    }

    const _completions_response = await oai.images.generate({
        model: "dall-e-3",
        prompt: req.body.prompt,
        n: 1,
        size: req.body.size ||  "1024x1024",
        style: req.body.style || "natural", 
      });

    res.status(200).json({ completion: _completions_response.data[0].url })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
