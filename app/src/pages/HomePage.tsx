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
  ArrowRight,
  Upload,
  Edit,
  Sparkles,
  X,
  Timer,
  Target,
  Lightbulb,
  TrendingUp
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
                            <a href="#how-it-works">See How It Works</a>
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
            <section className="mx-auto px-4 py-20 bg-white"  id='how-it-works'>
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

            {/* Traditional vs AI-Powered Comparison Section */}
            <section className="container mx-auto px-4 py-20 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Traditional vs AI-Powered Approach
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            See why smart job seekers are switching to AI-powered cover letter generation
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Traditional Approach */}
                        <Card className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
                            <CardHeader className="text-center pb-6">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Timer className="w-8 h-8 text-gray-600" />
                                </div>
                                <CardTitle className="text-2xl">Traditional Method</CardTitle>
                                <p className="text-gray-600 font-medium">The old way of writing cover letters</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <X className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">2-4 hours per letter</p>
                                        <p className="text-sm text-gray-600">Starting from scratch every time</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <X className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">Generic templates</p>
                                        <p className="text-sm text-gray-600">One-size-fits-all approach</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <X className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">Manual skill matching</p>
                                        <p className="text-sm text-gray-600">Easy to miss key requirements</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <X className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">Writer's block</p>
                                        <p className="text-sm text-gray-600">Struggling with what to say</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <X className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">Inconsistent quality</p>
                                        <p className="text-sm text-gray-600">Varies based on energy and mood</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* AI-Powered Approach */}
                        <Card className="border-3 border-black hover:shadow-lg transition-all">
                            <CardHeader className="text-center pb-6">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lightbulb className="w-8 h-8 text-white" />
                                </div>
                                <CardTitle className="text-2xl">CoverAI Method</CardTitle>
                                <p className="text-gray-600 font-medium">The smart way to create cover letters</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">30 seconds generation</p>
                                        <p className="text-sm text-gray-600">AI creates personalized content instantly</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">Fully customized</p>
                                        <p className="text-sm text-gray-600">Tailored to each job and your background</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">Smart skill matching</p>
                                        <p className="text-sm text-gray-600">Automatically highlights relevant experience</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">No creative blocks</p>
                                        <p className="text-sm text-gray-600">AI provides professional content every time</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-black mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900">Consistent excellence</p>
                                        <p className="text-sm text-gray-600">Professional quality guaranteed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                            <TrendingUp className="w-12 h-12 text-black mx-auto mb-4" />
                            <div className="text-3xl font-bold text-black mb-2">95%</div>
                            <div className="text-gray-900 font-medium mb-1">Time Saved</div>
                            <div className="text-sm text-gray-600">vs. traditional methods</div>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                            <Target className="w-12 h-12 text-black mx-auto mb-4" />
                            <div className="text-3xl font-bold text-black mb-2">3x</div>
                            <div className="text-gray-900 font-medium mb-1">More Applications</div>
                            <div className="text-sm text-gray-600">send more applications faster</div>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                            <Sparkles className="w-12 h-12 text-black mx-auto mb-4" />
                            <div className="text-3xl font-bold text-black mb-2">100%</div>
                            <div className="text-gray-900 font-medium mb-1">Customized</div>
                            <div className="text-sm text-gray-600">every letter is unique</div>
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
                            <ArrowRight className="ml-2 h-5 w-5" />
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