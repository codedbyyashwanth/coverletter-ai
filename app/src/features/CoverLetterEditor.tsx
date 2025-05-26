import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectCoverLetterFields,
    updateCoverLetterField
} from '@/store/slices/coverLetterSlice';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';

export const CoverLetterEditor: React.FC = () => {
    const dispatch = useDispatch();
    const fields = useSelector(selectCoverLetterFields);

    if (!fields) {
        return (
            <Card className="p-6 shadow-md">
                <div className="text-center text-gray-500">
                    No cover letter data available
                </div>
            </Card>
        );
    }

    const handleFieldUpdate = (field: keyof typeof fields, value: string) => {
        dispatch(updateCoverLetterField({ field, value }));
    };

    const setCurrentDate = () => {
        const currentDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        handleFieldUpdate('date', currentDate);
        toast.success('Date updated to today');
    };

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <Input
                                value={fields.name}
                                onChange={(e) => handleFieldUpdate('name', e.target.value)}
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <Input
                                type="email"
                                value={fields.email}
                                onChange={(e) => handleFieldUpdate('email', e.target.value)}
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <Input
                                value={fields.phone}
                                onChange={(e) => handleFieldUpdate('phone', e.target.value)}
                                placeholder="(123) 456-7890"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Address (Optional)</label>
                            <Input
                                value={fields.address || ''}
                                onChange={(e) => handleFieldUpdate('address', e.target.value)}
                                placeholder="City, State"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Company Information */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-lg">Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Company Name</label>
                            <Input
                                value={fields.companyName}
                                onChange={(e) => handleFieldUpdate('companyName', e.target.value)}
                                placeholder="Company Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Position</label>
                            <Input
                                value={fields.position}
                                onChange={(e) => handleFieldUpdate('position', e.target.value)}
                                placeholder="Job Title"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Hiring Manager (Optional)</label>
                            <Input
                                value={fields.hiringManagerName || ''}
                                onChange={(e) => handleFieldUpdate('hiringManagerName', e.target.value)}
                                placeholder="e.g., Mr. Smith, Ms. Johnson"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Company Address (Optional)</label>
                            <Input
                                value={fields.companyAddress || ''}
                                onChange={(e) => handleFieldUpdate('companyAddress', e.target.value)}
                                placeholder="Company Address"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Letter Details */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-lg">Letter Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Date</label>
                            <div className="flex gap-2">
                                <Input
                                    value={fields.date}
                                    onChange={(e) => handleFieldUpdate('date', e.target.value)}
                                    placeholder="Month Day, Year"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={setCurrentDate}
                                    className="shrink-0"
                                >
                                    <Calendar className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Subject</label>
                            <Input
                                value={fields.subject}
                                onChange={(e) => handleFieldUpdate('subject', e.target.value)}
                                placeholder="Application for Frontend Developer"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Greeting</label>
                            <Input
                                value={fields.greeting}
                                onChange={(e) => handleFieldUpdate('greeting', e.target.value)}
                                placeholder="Dear Hiring Manager"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Signature</label>
                            <Input
                                value={fields.signature}
                                onChange={(e) => handleFieldUpdate('signature', e.target.value)}
                                placeholder="Sincerely"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Letter Content */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-lg">Letter Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Cover Letter Body</label>
                        <Textarea
                            value={fields.content}
                            onChange={(e) => handleFieldUpdate('content', e.target.value)}
                            placeholder="Write your complete cover letter content here. Include your introduction, why you're interested in the position, your relevant experience and skills, and a closing statement..."
                            rows={15}
                            className="font-mono text-sm"
                        />
                        <p className="mt-2 text-sm text-gray-500">
                            <strong>Tip:</strong> Write your complete letter content here. Use line breaks to separate paragraphs for better formatting.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};