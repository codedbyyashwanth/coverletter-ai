# CoverAI - AI-Powered Cover Letter Generator

CoverAI is a modern, intelligent cover letter generator that helps job seekers create professional, personalized cover letters in seconds. Upload your resume, paste a job URL, and let AI craft the perfect cover letter tailored to your experience and the job requirements.

![Cover Letter AI Application Screenshot 1](https://i.postimg.cc/Yq0y31Jd/image.png)
![Cover Letter AI Application Screenshot 2](https://i.postimg.cc/sfv8rkcV/image.png)

## 🌟 Features

### Core Functionality
- **Smart Resume Parsing** - Upload PDF, DOC, or DOCX files and automatically extract key information
- **Intelligent Job Scraping** - Paste any job posting URL to extract company details, requirements, and skills automatically
- **AI-Powered Generation** - Uses OpenAI GPT models to create personalized, professional cover letters
- **Real-time Editing** - Edit and customize every aspect of your cover letter with live preview
- **Professional Templates** - Choose from 5 beautifully designed templates (Modern, Classic, Creative, Minimal, Monogram)
- **Instant PDF Export** - Download your cover letter as a professional PDF ready for submission

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- OpenAI API key (optional - fallback templates work without it)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/codedbyyashwanth/coverletter-ai.git
cd coverai
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Create .env file in root directory
cp .env.example .env

# Add your OpenAI API key (optional)
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

4. **Start the backend server**
```bash
npm start
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd app
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔧 Environment Variables

### Backend (.env)
```env
# OpenAI Configuration (optional)
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development
```

**Note:** The application works without an OpenAI API key by using template-based fallback generation.

## 🛠️ Usage

1. **Upload Your Resume**
   - Visit the homepage and click "Get Started."
   - Upload your resume in PDF, DOC, or DOCX format
   - Review the extracted information

2. **Add Job Details**
   - Paste a job posting URL for automatic extraction
   - Or manually enter company and position details
   - Add specific requirements and skills

3. **Generate Cover Letter**
   - AI automatically creates a personalized cover letter
   - Choose from 5 professional templates
   - Edit and customize every section

4. **Export and Apply**
   - Download as PDF or copy text
   - Submit with your job application
