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
        const { name, profile, experience } = resumeData;
        const { company, position, requirements } = jobData;
        
        // Get skills from resume
        let skills = [];
        if (resumeData.skills) {
            if (resumeData.skills.languages) skills.push(...resumeData.skills.languages);
            if (resumeData.skills.frontend) skills.push(...resumeData.skills.frontend);
            if (resumeData.skills.backend) skills.push(...resumeData.skills.backend);
            if (resumeData.skills.other) skills.push(...resumeData.skills.other);
        }
        
        // Use OpenAI's gpt-3.5-turbo which is their most cost-effective model
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', // Most cost-effective OpenAI model
                messages: [
                {
                    role: 'system',
                    content: 'You are a professional cover letter writer. Write a concise, one-page cover letter using the provided resume information.'
                },
                {
                    role: 'user',
                    content: `Generate a professional cover letter for a job application based on the following information:
                    
                    Resume Information:
                    Name: ${name}
                    Profile: ${profile}
                    Skills: ${skills.join(', ')}
                    
                    Job Information:
                    Company: ${company}
                    Position: ${position}
                    Requirements: ${requirements ? requirements.join(', ') : ''}
                    
                    The cover letter should be one page, professional in tone, and highlight how the candidate's skills and experiences align with the job requirements.
                    Include today's date and a formal letter format with greeting and signature.`
                }
                ],
                max_tokens: 600, // Increased tokens for a full letter
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
        return generateFallbackCoverLetter(resumeData, jobData);
    }
}

// Simple template-based fallback for cover letter generation
async function generateCoverLetter(resumeData, jobData) {
    try {
        // Extract resume and job information
        const { name, profile, experience } = resumeData;
        const { company, position, requirements } = jobData;
        
        // Get skills from resume
        let skills = [];
        if (resumeData.skills) {
            if (resumeData.skills.languages) skills.push(...resumeData.skills.languages);
            if (resumeData.skills.frontend) skills.push(...resumeData.skills.frontend);
            if (resumeData.skills.backend) skills.push(...resumeData.skills.backend);
            if (resumeData.skills.other) skills.push(...resumeData.skills.other);
        }
        
        // Updated to use chat completions endpoint
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional cover letter writer. Write a concise, one-page cover letter using the provided resume information.'
                    },
                    {
                        role: 'user',
                        content: `Generate a professional cover letter for a job application based on the following information:
                        
                        Resume Information:
                        Name: ${name}
                        Profile: ${profile}
                        Skills: ${skills.join(', ')}
                        
                        Job Information:
                        Company: ${company}
                        Position: ${position}
                        Requirements: ${requirements ? requirements.join(', ') : ''}
                        
                        The cover letter should be one page, professional in tone, and highlight how the candidate's skills and experiences align with the job requirements.
                        Include today's date and a formal letter format with greeting and signature.`
                    }
                ],
                max_tokens: 800,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Updated response handling for chat completions
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating cover letter with OpenAI:', error);
        // Fallback to template if API call fails
        return generateFallbackCoverLetter(resumeData, jobData);
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