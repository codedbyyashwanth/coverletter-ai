// server/services/resumeParser.js
require('dotenv').config();
const axios = require('axios');

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

async function parseResumeWithAI(text) {
  try {
    const prompt = `
Extract the following information from this resume and format as JSON. 
Include these fields: name, email, phone, profile (summary), experience (array of objects with company, position, startDate, endDate, and description array), and skills (array of strings).

Resume text:
${text.substring(0, 4000)} // Limit text to avoid token limits
`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo', 
        prompt,
        max_tokens: 1000,
        temperature: 0.2, // Keep it focused for structured extraction
        stop: ['}', '}]'] // Help with JSON formatting
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Parse the response - which should be JSON text
    const jsonResponse = response.data.choices[0].text.trim();
    
    // Try to extract valid JSON
    const jsonMatch = jsonResponse.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : jsonResponse;
    
    try {
      // Try to parse the JSON string
      const parsedData = JSON.parse(jsonString);
      
      // Ensure all expected properties exist
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
      // Fallback to basic extraction if JSON parsing fails
      return fallbackExtraction(text);
    }
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    // Fallback to basic extraction if API fails
    return fallbackExtraction(text);
  }
}

// Basic fallback extraction using regex patterns
function fallbackExtraction(text) {
  // Basic extraction similar to before but simpler
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -.]?\d{3}[ -.]?\d{4}/);
  
  // Extract likely name from first few lines
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