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
function generateFallbackCoverLetter(resumeData, jobData) {
    // Format date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Extract data
    const { name, profile, experience } = resumeData;
    const { company, position } = jobData;
    
    // Get skills
    let skills = [];
    if (resumeData.skills) {
        if (resumeData.skills.languages) skills.push(...resumeData.skills.languages);
        if (resumeData.skills.frontend) skills.push(...resumeData.skills.frontend);
        if (resumeData.skills.backend) skills.push(...resumeData.skills.backend);
        if (resumeData.skills.other) skills.push(...resumeData.skills.other);
    }
    
    // Get most recent experience
    const recentExperience = experience && experience.length > 0 ? experience[0] : null;
    
    // Get achievement bullets from experience
    const achievements = recentExperience?.description || [
        'Successfully delivered projects on time and within budget',
        'Collaborated effectively with cross-functional teams',
        'Implemented best practices in development and testing'
    ];
    
    return `
${formattedDate}

Hiring Manager
${company}
${jobData.location || 'Location'}

Dear Hiring Manager at ${company},

I am writing to express my strong interest in the ${position} position at ${company}. With my background in ${recentExperience?.position || 'software development'} and experience with ${skills.slice(0, 3).join(', ')}, I believe I would be a valuable addition to your team.

${profile || `As a dedicated professional, I have consistently delivered high-quality results while focusing on efficiency and collaboration.`}

During my time at ${recentExperience?.company || 'my previous company'}, I have:
${achievements.map(desc => `- ${desc}`).join('\n')}

I am particularly excited about the opportunity to join ${company} because of your reputation for innovation and commitment to excellence. I believe my skills and experience align well with what you're looking for in a ${position}.

I would welcome the opportunity to discuss how my background, skills, and achievements can benefit your team. Thank you for considering my application.

Sincerely,
${name || 'Candidate'}
${resumeData.email || ''}
${resumeData.phone || ''}`;
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