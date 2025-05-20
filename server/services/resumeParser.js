// server/services/resumeParser.js
require('dotenv').config();
const axios = require('axios');

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function parseResumeWithAI(text) {
  try {
    // Updated to use chat completions endpoint
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a resume parsing assistant. Extract structured information from the resume text provided.'
          },
          {
            role: 'user',
            content: `Extract the following information from this resume and format as JSON. 
Include these fields: name, email, phone, profile (summary), experience (array of objects with company, position, startDate, endDate, and description array), and skills (array of strings).

Resume text:
${text.substring(0, 4000)}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.2
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Updated response handling for chat completions
    const jsonResponse = response.data.choices[0].message.content.trim();
    
    try {
      // Try to extract valid JSON
      const jsonMatch = jsonResponse.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : jsonResponse;
      
      const parsedData = JSON.parse(jsonString);
      
      return {
        name: parsedData.name || 'Unknown',
        email: parsedData.email || '',
        phone: parsedData.phone || '',
        profile: parsedData.profile || '',
        experience: Array.isArray(parsedData.experience) ? parsedData.experience : [],
        skills: {
          all: Array.isArray(parsedData.skills) ? parsedData.skills : []
        }
      };
    } catch (parseError) {
      console.error('Error parsing JSON from OpenAI response:', parseError);
      return fallbackExtraction(text);
    }
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    return fallbackExtraction(text);
  }
}

// Basic fallback extraction using regex patterns
function fallbackExtraction(text) {
  // Existing code remains the same
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -.]?\d{3}[ -.]?\d{4}/);
  
  const lines = text.split('\n').filter(line => line.trim()).slice(0, 5);
  let name = 'Unknown';
  for (const line of lines) {
    if (line.length > 3 && line.length < 40 && !line.includes('@') && !line.match(/^\d/)) {
      name = line.trim();
      break;
    }
  }
  
  return {
    name,
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    profile: '',
    experience: [],
    skills: {
      all: []
    }
  };
}

module.exports = {
  parseResumeWithAI
};