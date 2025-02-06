![ss1](https://github.com/user-attachments/assets/451371c5-7590-404b-9085-27722c82f0c8)
# TaleCraft (AI Story Generator)

TaleCraft is a Node.js-based project that allows users to generate AI-powered stories based on their selected genre and word count. The website provides an intuitive interface for user input, and the backend leverages Google's GEMINI API to generate engaging stories.

## Features

- **Dynamic Story Generation**: Generate stories tailored to the user's chosen genre and word count.
- **User-Friendly Interface**: Simple and clean web interface for seamless interaction.
- **AI-Powered Backend**: Uses Google's GEMINI API to create high-quality and unique stories.
- **Customizable Word Count**: Users can specify the desired length of the story.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API**: Google's GEMINI API

---

## Installation

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/BhavyaShah7409/ai-story-generator.git
   cd ai-story-generator
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   GEMINI_API_KEY=<your-gemini-api-key>
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Open the website in your browser:
   Navigate to `http://localhost:3000`.

