const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { scrapeJobPosting } = require('./services/webScraper');
require('dotenv').config();
const { parseResumeWithAI } = require('./services/resumeParser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to generate cover letter using OpenAI's cheapest model
async function generateCoverLetter(resumeData, jobData) {
    try {
        // Extract resume and job information
        const { name, profile, experience, email, phone } = resumeData;
        const { company, position, requirements } = jobData;
        
        // Get skills from resume
        let skills = [];
        if (resumeData.skills) {
            if (resumeData.skills.languages) skills.push(...resumeData.skills.languages);
            if (resumeData.skills.frontend) skills.push(...resumeData.skills.frontend);
            if (resumeData.skills.backend) skills.push(...resumeData.skills.backend);
            if (resumeData.skills.other) skills.push(...resumeData.skills.other);
        }

        const date = new Date();
        const todayDate = date.toDateString();
        
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', 
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional cover letter writer. Generate a one-page, formal cover letter—polished, error-free, and tailored to the job.'
                    },
                    {
                        role: 'user',
                        content: `Generate a professional cover letter for a job application based on the following information:

                    Resume Information:
                    Name: ${name}
                    Profile: ${profile}
                    Email: ${email}
                    Phone: ${phone}
                    Skills: ${skills.join(', ')}
                    Experience: ${experience}

                    Job Information:
                    Company: ${company}
                    Position: ${position}
                    Requirements: ${requirements ? requirements.join(', ') : ''}

                    Today's Date: ${todayDate}

                    Format:
                    - At the top, include the candidate’s name, email, and phone number.
                    - Include today’s date below the contact information.
                    - Address the letter to “Dear Hiring Manager,” or use a specific name if available.
                    - Use three structured paragraphs:
                    1. Why the candidate is motivated to apply for the position.
                    2. Why the candidate is the most suitable person for the job, aligned with listed requirements.
                    3. Why the company is a good match for the candidate.
                    - End with a professional closing (e.g., "Sincerely") followed by the candidate’s full name (no repetition).
                    - Company name should be mentioned appropriately in the letter body.

                    Tone:
                    - Use a formal, polite tone.
                    - Ensure the letter is concise and fits on one page (250–300 words).
                    - Do not include placeholders or template tags like [Address] or repeat the signature.`
                    }
                ],
                max_tokens: 600, 
                temperature: 0.7
            },
            {
                headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
                }
            }
        );
        
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating cover letter with OpenAI:', error);
        // Fallback to template if API call fails
        // return generateFallbackCoverLetter(resumeData, jobData);
    }
}


// Route to scrape job posting
app.post('/api/scrape-job', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ 
                error: 'URL is required' 
            });
        }
        
        const result = await scrapeJobPosting(url);
        
        if (result.success) {
            res.json(result.data);
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error in job scraping endpoint:', error);
        res.status(500).json({ error: 'Failed to scrape job posting' });
    }
});

// Resume parsing endpoint that accepts text content
app.post('/api/parse-resume-text', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string' || text.length < 100) {
      return res.status(400).json({ error: 'Invalid or insufficient resume text provided' });
    }
    
    const parsedData = await parseResumeWithAI(text);
    res.json(parsedData);
  } catch (error) {
    console.error('Error in resume parsing endpoint:', error);
    res.status(500).json({ error: 'Failed to parse resume' });
  }
});

// Route to generate cover letter
app.post('/api/generate-cover-letter', async (req, res) => {
    try {
        
        // Extract resume and job description from request
        const { resume, jobDescription } = req.body;
        
        if (!resume || !jobDescription) {
            return res.status(400).json({ 
                error: 'Missing required data. Request must include both resume and jobDescription objects.' 
            });
        }
        
        // Check if OpenAI API key is available
        if (!process.env.OPENAI_API_KEY) {
            console.warn('Warning: OpenAI API key not found. Using fallback template method.');
            const coverLetter = generateFallbackCoverLetter(resume, jobDescription);
            return res.json({ coverLetter });
        }
        
        const coverLetter = await generateCoverLetter(resume, jobDescription);
        res.json({ coverLetter });
    } catch (error) {
        console.error('Error in cover letter generation endpoint:', error);
        res.status(500).json({ error: 'Failed to generate cover letter' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`OpenAI API Key ${process.env.OPENAI_API_KEY ? 'is' : 'is NOT'} configured`);
});