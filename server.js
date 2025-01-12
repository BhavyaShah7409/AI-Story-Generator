require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.static(path.join(__dirname, 'public')));

// Story generation endpoint
app.post('/generate-story', async (req, res) => {
    const { genre, words } = req.body;
    const prompt = `Write a ${words}-word story in the ${genre} genre.`;

    try {
        // Request story generation
        const result = await model.generateContent(prompt);

        // Log the full API response
        console.log("Full API Response:", JSON.stringify(result, null, 2));

        // Validate response structure
        if (
            !result ||
            !result.response ||
            !result.response.candidates ||
            result.response.candidates.length === 0
        ) {
            return res.status(500).json({
                error: 'Unexpected response from API.',
                details: result || "No response received",
            });
        }

        const candidate = result.response.candidates[0];

        // Extract the generated story
        const storyText = candidate.content.parts[0].text || "Generated story not available.";
        res.json({ story: storyText });

    } catch (error) {
        console.error('Error generating story:', error);

        // Handle safety or unexpected errors
        if (error.message && error.message.includes('SAFETY')) {
            return res.status(400).json({
                error: 'The content could not be generated due to safety concerns.',
            });
        } else {
            return res.status(500).json({
                error: 'Failed to generate story.',
                details: error.message,
            });
        }
    }
});

// Serve the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
