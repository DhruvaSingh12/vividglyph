import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

export async function POST(request: NextRequest) {
  // Set content type header for all responses
  const headers = {
    "Content-Type": "application/json",
  }

  try {
    // Parse the request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json(
        {
          answer: "Sorry, there was an error processing your request. Please try again.",
        },
        { headers },
      )
    }

    const { algorithm, question } = body || {}

    // Validate required fields
    if (!algorithm || !question) {
      console.log("Missing required fields:", { algorithm, question })
      return NextResponse.json(
        {
          answer: "Sorry, I couldn't process your question. Please make sure you're asking about a specific algorithm.",
        },
        { headers },
      )
    }

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not defined in environment variables")
      return NextResponse.json(
        {
          answer: "The AI service is currently unavailable. Please try again later.",
        },
        { headers },
      )
    }

    // Create a prompt that includes context about the algorithm and the specific question
    const prompt = `
      You are an algorithm teaching assistant for the AlgoViz platform.
      
      Please provide a clear, concise, and educational answer to the following question about ${algorithm}:
      
      ${question}
      
      Your answer should be:
      1. Technically accurate
      2. Easy to understand for computer science students
      3. Include relevant mathematical notation when necessary
      4. No longer than 3-4 paragraphs
    `

    try {
      // Initialize the Google Generative AI model
      const googleAI = createGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY
      })

      // Generate the response using the Gemini model
      const { text } = await generateText({
        model: googleAI("gemini-2.0-flash"),
        prompt: prompt,
        temperature: 0.3, // Lower temperature for more factual responses
        maxTokens: 500,
      })

      // Provide a fallback if the response is empty
      if (!text || text.trim() === "") {
        return NextResponse.json(
          {
            answer:
              "I understand your question about " +
              algorithm +
              ", but I'm having trouble formulating a response right now. Please try again later.",
          },
          { headers },
        )
      }

      return NextResponse.json({ answer: text }, { headers })
    } catch (aiError) {
      console.error("Error generating AI response:", aiError)

      // Provide a helpful response based on the algorithm
      return NextResponse.json(
        {
          answer: `I understand you're asking about ${algorithm}. While I can't generate a detailed response right now due to technical limitations, this is an important topic in algorithm design. Please try again later or check the main content of this page for more information.`,
        },
        { headers },
      )
    }
  } catch (error) {
    console.error("Error in Gemini API route:", error)

    // Always return a 200 response with a helpful message
    return NextResponse.json(
      {
        answer: "Sorry, there was an error processing your request. Please try again later.",
      },
      { headers },
    )
  }
}
