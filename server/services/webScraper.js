const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

async function scrapeJobPosting(url) {
    try {
        // Configure axios with longer timeout and advanced headers
        const axiosConfig = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'max-age=0',
            },
            timeout: 30000,
            httpsAgent: new https.Agent({  
                rejectUnauthorized: false
            })
        };
        
        // Try to fetch the webpage
        const response = await axios.get(url, axiosConfig);
        
        // Rest of the scraping code remains the same
        const $ = cheerio.load(response.data);
        
        // Common selectors for job posting sites
        let jobData = {
            company: '',
            position: '',
            location: '',
            description: '',
            requirements: []
        };
        
        // Your existing scraping logic here
        jobData.company = $('meta[property="og:site_name"]').attr('content') ||
                         $('[itemprop="hiringOrganization"]').text().trim() ||
                         $('.company-name').text().trim() ||
                         $('[data-test="employerName"]').text().trim() ||
                         $('[data-testid="companyName"]').text().trim() ||
                         $('[class*="company"]').first().text().trim() ||
                         'Company Not Found';
        
        // Rest of the code is unchanged
        // ...

        return {
            success: true,
            data: {
                ...jobData,
                skills: foundSkills
            }
        };
        
    } catch (error) {
        console.error('Error scraping job posting:', error);
        
        // Enhanced error handling with specific message for 403 errors
        if (error.response && error.response.status === 403) {
            return {
                success: false,
                error: 'This website is blocking automated access. Please try entering the job details manually or try a different job posting URL.'
            };
        }
        
        return {
            success: false,
            error: 'Failed to scrape job posting. The website might be blocking automated requests or the URL might be invalid.'
        };
    }
}

module.exports = {
    scrapeJobPosting
};