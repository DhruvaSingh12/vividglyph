# VividGlyph - Interactive Algorithm Learning Platform

Vivid Glyph is a comprehensive, interactive platform for learning algorithms through visualizations, explanations, and hands-on practice. The platform covers a wide range of algorithm topics, from basic sorting and searching to advanced techniques like dynamic programming and graph algorithms.

## Features

- **Interactive Visualizations**: Step-by-step animated illustrations of how algorithms work
- **Comprehensive Explanations**: Clear descriptions of algorithm purpose, approach, and complexity
- **Live Algorithm Runner**: Test algorithms with your own inputs and see results in real-time
- **Mini-FAQ**: AI-powered answers to common algorithm questions using Google's Gemini API

## Tech Stack

- **Next.js** with TypeScript
- **Tailwind CSS** for styling
- **ShadCN UI** component library
- **Google Gemini API** for AI-powered Q&A

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/algoviz.git
   cd algoviz
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   \`\`\`
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Next.js App Router pages and API routes
- `components/`: Reusable React components
- `utils/`: Utility functions for algorithms
- `public/`: Static assets

## Key Components

- `AlgorithmVisualizer`: Provides step-by-step visualization of algorithms
- `AlgorithmExplainer`: Presents algorithm descriptions and complexity analysis
- `AlgorithmRunner`: Allows users to run algorithms with custom inputs
- `MiniFAQ`: AI-powered Q&A about algorithms

## Deployment

This project can be easily deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add your `GEMINI_API_KEY` as an environment variable
4. Deploy!

## Testing

Run the test suite with:

\`\`\`bash
npm test
# or
yarn test
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

Let's also create a simple test file for the Merge Sort algorithm:
