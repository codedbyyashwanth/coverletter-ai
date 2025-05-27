import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Zap, 
  Download, 
  Clock, 
  CheckCircle, 
  Star,
  ArrowRight,
  Upload,
  Edit,
  Sparkles
} from 'lucide-react';

const HomePage: React.FC = () => {
    // Ensure light mode
    React.useEffect(() => {
        document.documentElement.classList.remove('dark');
    }, []);
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center bg-black/5 border border-black/10 rounded-full px-4 py-2 mb-8">
                        <Sparkles className="w-4 h-4 mr-2 text-black" />
                        <span className="text-sm font-medium text-black">AI-Powered Cover Letter Generator</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Create professional{' '}
                        <span className="bg-gradient-to-r from-black to-zinc-500 bg-clip-text text-transparent">
                            cover letters with AI
                        </span>{' '}
                        
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Upload your resume, paste a job description, and get a customized, 
                        professional cover letter in seconds. Land your dream job faster.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Button size="lg" asChild className="text-lg px-12 py-4 h-auto">
                            <Link to="/resume" className="flex items-center">
                                Get Started Free
                                <ArrowRight className="ml-0 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto">
                            See How It Works
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            100% Free to Use
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            No Sign-up Required
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            Instant Download
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="mx-auto px-4 py-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            How it works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get your personalized cover letter in 3 simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="relative border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Upload className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-3 left-6 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                    1
                                </div>
                                <CardTitle className="text-xl">Upload Resume</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-gray-600">
                                    Upload your resume in PDF, DOC, or DOCX format. Our AI will extract and analyze your experience and skills.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="relative border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-3 left-6 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                    2
                                </div>
                                <CardTitle className="text-xl">Job Details</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-gray-600">
                                    Paste the job posting URL or manually enter job requirements. We'll match your skills to the position.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="relative border-2 border-gray-100 hover:border-gray-200 transition-colors">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Download className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-3 left-6 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                    3
                                </div>
                                <CardTitle className="text-xl">Download & Apply</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-gray-600">
                                    Get your professional cover letter instantly. Edit, customize, and download as PDF ready for submission.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mx-auto px-4 py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Why choose CoverAI?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Advanced features designed to help you land your dream job
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <Zap className="w-12 h-12 text-black mb-4" />
                            <h3 className="text-xl font-semibold mb-3">AI-Powered Generation</h3>
                            <p className="text-gray-600">
                                Advanced AI analyzes your resume and job requirements to create perfectly tailored cover letters.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <Clock className="w-12 h-12 text-black mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Save Hours of Time</h3>
                            <p className="text-gray-600">
                                Generate professional cover letters in seconds instead of spending hours writing from scratch.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <Edit className="w-12 h-12 text-black mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
                            <p className="text-gray-600">
                                Edit and personalize every part of your cover letter with our intuitive editor.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <FileText className="w-12 h-12 text-black mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Multiple Templates</h3>
                            <p className="text-gray-600">
                                Choose from professionally designed templates that make your application stand out.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <Download className="w-12 h-12 text-black mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Instant PDF Export</h3>
                            <p className="text-gray-600">
                                Download your finished cover letter as a professional PDF ready for any application.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <CheckCircle className="w-12 h-12 text-black mb-4" />
                            <h3 className="text-xl font-semibold mb-3">100% Free</h3>
                            <p className="text-gray-600">
                                No hidden fees, subscriptions, or limits. Create unlimited cover letters completely free.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="container mx-auto px-4 py-20 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-16">
                        Trusted by job seekers everywhere
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card className="bg-gray-50 border-2">
                            <CardContent className="p-8">
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">
                                    "CoverAI helped me create a professional cover letter in minutes. I got 3 interviews within a week!"
                                </p>
                                <p className="font-semibold">Sarah M.</p>
                                <p className="text-sm text-gray-500">Software Engineer</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-50 border-2">
                            <CardContent className="p-8">
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">
                                    "The AI perfectly matched my skills to the job requirements. Best tool for job applications!"
                                </p>
                                <p className="font-semibold">Michael T.</p>
                                <p className="text-sm text-gray-500">Marketing Manager</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-50 border-2">
                            <CardContent className="p-8">
                                <div className="flex justify-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">
                                    "Saved me hours of writing. The templates are beautiful and professional."
                                </p>
                                <p className="font-semibold">Emily R.</p>
                                <p className="text-sm text-gray-500">Product Designer</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-black mb-2">10k+</div>
                            <div className="text-gray-600">Cover Letters Created</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-black mb-2">95%</div>
                            <div className="text-gray-600">Success Rate</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-black mb-2">30s</div>
                            <div className="text-gray-600">Average Generation Time</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-black mb-2">5★</div>
                            <div className="text-gray-600">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="mx-auto px-4 py-20 bg-black text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to land your dream job?
                    </h2>
                    <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
                        Join thousands of successful job seekers who've used CoverAI to create winning cover letters.
                    </p>
                    
                    <Button size="lg" variant="secondary" asChild className="text-lg px-10 py-4 h-auto bg-white text-black hover:bg-gray-100">
                        <Link to="/resume" className="flex items-center">
                            Start Creating Your Cover Letter
                            <ArrowRight className="ml-0 h-5 w-5" />
                        </Link>
                    </Button>

                    <p className="mt-6 text-gray-400 text-sm">
                        No registration required • Completely free • Instant results
                    </p>
                </div>
            </section>
        </div>
    );
};

export default HomePage;