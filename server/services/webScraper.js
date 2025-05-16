const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeJobPosting(url) {
    try {
        // Fetch the webpage
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        const $ = cheerio.load(response.data);
        
        // Common selectors for job posting sites - you may need to adjust based on specific sites
        let jobData = {
            company: '',
            position: '',
            location: '',
            description: '',
            requirements: []
        };
        
        // Try different selectors for company name
        jobData.company = $('meta[property="og:site_name"]').attr('content') ||
                         $('[itemprop="hiringOrganization"]').text().trim() ||
                         $('.company-name').text().trim() ||
                         $('[data-test="employerName"]').text().trim() ||
                         $('[data-testid="companyName"]').text().trim() ||
                         $('[class*="company"]').first().text().trim() ||
                         'Company Not Found';
        
        // Try different selectors for job title
        jobData.position = $('meta[property="og:title"]').attr('content') ||
                          $('[itemprop="title"]').text().trim() ||
                          $('h1').first().text().trim() ||
                          $('.job-title').text().trim() ||
                          $('[data-test="jobTitle"]').text().trim() ||
                          $('[data-testid="jobTitle"]').text().trim() ||
                          $('[class*="job-title"]').first().text().trim() ||
                          $('[class*="title"]').first().text().trim() ||
                          'Position Not Found';
        
        // Try different selectors for location
        jobData.location = $('[itemprop="jobLocation"]').text().trim() ||
                          $('[data-test="location"]').text().trim() ||
                          $('[data-testid="location"]').text().trim() ||
                          $('.location').text().trim() ||
                          $('[class*="location"]').first().text().trim() ||
                          '';
        
        // Try to get job description
        const descriptionText = $('[itemprop="description"]').text() ||
                               $('.job-description').text() ||
                               $('[data-test="jobDescription"]').text() ||
                               $('[data-testid="jobDescription"]').text() ||
                               $('[class*="description"]').text() ||
                               $('body').text();
        
        jobData.description = descriptionText.trim()
            .replace(/\s+/g, ' ')
            .substring(0, 5000); // Limit to 5000 characters
        
        // Extract requirements/qualifications (common patterns)
        const requirementsSection = descriptionText.toLowerCase();
        const requirementsStart = requirementsSection.indexOf('requirements') !== -1 ? requirementsSection.indexOf('requirements') :
                                requirementsSection.indexOf('qualifications') !== -1 ? requirementsSection.indexOf('qualifications') :
                                requirementsSection.indexOf('what you\'ll need') !== -1 ? requirementsSection.indexOf('what you\'ll need') :
                                requirementsSection.indexOf('you have') !== -1 ? requirementsSection.indexOf('you have') : -1;
        
        if (requirementsStart !== -1) {
            const requirementsText = descriptionText.substring(requirementsStart);
            const bulletPoints = requirementsText.match(/[•\-\*]\s*([^\n•\-\*]+)/g) || [];
            jobData.requirements = bulletPoints.map(point => 
                point.replace(/[•\-\*]\s*/, '').trim()
            ).filter(req => req.length > 0).slice(0, 10); // Limit to 10 requirements
        }
        
        // Extract skills from description
        const commonSkills = [
            'JavaScript', 'React', 'Angular', 'Vue', 'TypeScript', 'Node.js', 'Python', 
            'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin', 'HTML', 'CSS',
            'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Azure', 'Docker', 'Kubernetes',
            'Git', 'CI/CD', 'REST', 'GraphQL', 'Microservices', 'Agile', 'Scrum'
        ];
        
        const foundSkills = [];
        commonSkills.forEach(skill => {
            if (descriptionText.toLowerCase().includes(skill.toLowerCase())) {
                foundSkills.push(skill);
            }
        });
        
        // Clean up the position if it includes company name
        if (jobData.position.includes(' at ')) {
            jobData.position = jobData.position.split(' at ')[0];
        }
        if (jobData.position.includes(' - ')) {
            jobData.position = jobData.position.split(' - ')[0];
        }
        
        return {
            success: true,
            data: {
                ...jobData,
                skills: foundSkills
            }
        };
        
    } catch (error) {
        console.error('Error scraping job posting:', error);
        return {
            success: false,
            error: 'Failed to scrape job posting. The website might be blocking automated requests or the URL might be invalid.'
        };
    }
}

module.exports = {
    scrapeJobPosting
};