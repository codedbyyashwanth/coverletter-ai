const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

async function scrapeJobPosting(url) {    
    try {
        // Configure axios with extended timeout and headers to mimic a browser
        const axiosConfig = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Referer': 'https://www.google.com/'
            },
            timeout: 15000,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false // Warning: this bypasses SSL verification
            })
        };
        
        // Fetch the webpage
        const response = await axios.get(url, axiosConfig);
        
        // Verify we have actual HTML content
        if (!response.data || typeof response.data !== 'string') {
            console.error('Invalid response data:', typeof response.data);
            return {
                success: false,
                error: 'Invalid response from target website'
            };
        }
        
        // Load the HTML into cheerio
        const $ = cheerio.load(response.data);
        
        // Default job data structure
        let jobData = {
            company: '',
            position: '',
            location: '',
            description: '',
            requirements: [],
            skills: [],
            url: url
        };
        
        try {
            // Try different selectors for company name with debugging
            jobData.company = extractCompanyName($);
            
            // Extract position
            jobData.position = extractPosition($);
            
            // Extract location
            jobData.location = extractLocation($);
            
            // Extract description - safely limiting the text length
            jobData.description = extractDescription($);
            
            // Extract requirements
            jobData.requirements = extractRequirements($);
            
            // Extract skills
            jobData.skills = extractSkills(jobData.description || '');
            
            // Final data cleaning
            jobData = cleanJobData(jobData);
            
            return {
                success: true,
                data: jobData
            };
        } catch (extractionError) {
            console.error('Error during data extraction:', extractionError);
            // Return partial data if we have at least company and position
            if (jobData.company && jobData.position) {
                return {
                    success: true,
                    data: jobData,
                    warning: 'Partial data extracted. Some fields may be missing.'
                };
            } else {
                return {
                    success: false,
                    error: 'Failed to extract essential job data',
                    details: extractionError.message
                };
            }
        }
    } catch (error) {
        console.error('Error scraping job posting:', error.message);
        
        // Create a more specific error message based on the error
        let errorMessage = 'Failed to scrape job posting.';
        
        if (error.code === 'ECONNREFUSED') {
            errorMessage = 'Could not connect to the job posting website. The site may be down.';
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'Connection timed out while trying to reach the job posting website.';
        } else if (error.response) {
            if (error.response.status === 403) {
                errorMessage = 'The website is blocking automated access. Please try entering the job details manually.';
            } else if (error.response.status === 404) {
                errorMessage = 'The job posting page was not found. The listing may have been removed.';
            } else {
                errorMessage = `The website returned an error (${error.response.status}).`;
            }
        }
        
        return {
            success: false,
            error: errorMessage,
            details: error.message
        };
    }
}

// Helper functions
function extractCompanyName($) {
    return $('meta[property="og:site_name"]').attr('content') ||
           $('[itemprop="hiringOrganization"]').text().trim() ||
           $('.company-name').text().trim() ||
           $('[data-test="employerName"]').text().trim() ||
           $('[data-testid="companyName"]').text().trim() ||
           $('[class*="company"]').first().text().trim() ||
           'Company Not Found';
}

function extractPosition($) {
    return $('meta[property="og:title"]').attr('content') ||
           $('[itemprop="title"]').text().trim() ||
           $('h1').first().text().trim() ||
           $('.job-title').text().trim() ||
           $('[data-test="jobTitle"]').text().trim() ||
           $('[data-testid="jobTitle"]').text().trim() ||
           $('[class*="job-title"]').first().text().trim() ||
           $('[class*="title"]').first().text().trim() ||
           'Position Not Found';
}

function extractLocation($) {
    return $('[itemprop="jobLocation"]').text().trim() ||
           $('[data-test="location"]').text().trim() ||
           $('[data-testid="location"]').text().trim() ||
           $('.location').text().trim() ||
           $('[class*="location"]').first().text().trim() ||
           '';
}

function extractDescription($) {
    const descriptionText = $('[itemprop="description"]').text() ||
                           $('.job-description').text() ||
                           $('[data-test="jobDescription"]').text() ||
                           $('[data-testid="jobDescription"]').text() ||
                           $('[class*="description"]').text() ||
                           $('body').text();
    
    return descriptionText.trim()
        .replace(/\s+/g, ' ')
        .substring(0, 5000); // Limit to 5000 characters for safety
}

function extractRequirements($) {
    const text = $('body').text();
    const requirementsSection = text.toLowerCase();
    const requirementsStart = requirementsSection.indexOf('requirements') !== -1 ? requirementsSection.indexOf('requirements') :
                            requirementsSection.indexOf('qualifications') !== -1 ? requirementsSection.indexOf('qualifications') :
                            requirementsSection.indexOf('what you\'ll need') !== -1 ? requirementsSection.indexOf('what you\'ll need') :
                            requirementsSection.indexOf('you have') !== -1 ? requirementsSection.indexOf('you have') : -1;
    
    if (requirementsStart !== -1) {
        const requirementsText = text.substring(requirementsStart);
        const bulletPoints = requirementsText.match(/[•\-\*]\s*([^\n•\-\*]+)/g) || [];
        return bulletPoints.map(point => 
            point.replace(/[•\-\*]\s*/, '').trim()
        ).filter(req => req.length > 0).slice(0, 10); // Limit to 10 requirements
    }
    
    return [];
}

function extractSkills(descriptionText) {
    const commonSkills = [
        'JavaScript', 'React', 'Angular', 'Vue', 'TypeScript', 'Node.js', 'Python', 
        'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin', 'HTML', 'CSS',
        'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'Docker', 'Kubernetes',
        'Git', 'CI/CD', 'REST', 'GraphQL', 'Microservices', 'Agile', 'Scrum'
    ];
    
    const foundSkills = [];
    const descLower = descriptionText.toLowerCase();
    
    commonSkills.forEach(skill => {
        if (descLower.includes(skill.toLowerCase())) {
            foundSkills.push(skill);
        }
    });
    
    return foundSkills;
}

function cleanJobData(jobData) {
    // Clean up the position if it includes company name
    if (jobData.position.includes(' at ')) {
        jobData.position = jobData.position.split(' at ')[0];
    }
    if (jobData.position.includes(' - ')) {
        jobData.position = jobData.position.split(' - ')[0];
    }
    
    // Ensure we don't have undefined values
    Object.keys(jobData).forEach(key => {
        if (jobData[key] === undefined) {
            if (Array.isArray(jobData[key])) {
                jobData[key] = [];
            } else {
                jobData[key] = '';
            }
        }
    });
    
    return jobData;
}

module.exports = {
    scrapeJobPosting
};