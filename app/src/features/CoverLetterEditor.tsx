import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectCoverLetterFields,
    updateCoverLetterFields
} from '@/store/slices/coverLetterSlice';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Collapsible, 
    CollapsibleContent, 
    CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
    Calendar, 
    Save, 
    RotateCcw, 
    User, 
    Building, 
    FileText, 
    PenTool,
    ChevronDown 
} from 'lucide-react';
import { toast } from 'sonner';
import type { CoverLetterFields } from '@/types/coverLetter';

export const CoverLetterEditor: React.FC = () => {
    const dispatch = useDispatch();
    const storeFields = useSelector(selectCoverLetterFields);
    
    // Local state for form values (prevents constant re-rendering)
    const [localFields, setLocalFields] = useState<CoverLetterFields | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Collapsible states - default to collapsed
    const [personalOpen, setPersonalOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [letterDetailsOpen, setLetterDetailsOpen] = useState(false);
    const [contentOpen, setContentOpen] = useState(true); // Keep content open by default

    // Initialize local state when store fields change
    useEffect(() => {
        if (storeFields && !localFields) {
            setLocalFields({ ...storeFields });
        }
    }, [storeFields, localFields]);

    // Compare local and store fields to detect changes
    useEffect(() => {
        if (localFields && storeFields) {
            const hasChanges = JSON.stringify(localFields) !== JSON.stringify(storeFields);
            setHasUnsavedChanges(hasChanges);
        }
    }, [localFields, storeFields]);

    if (!localFields) {
        return (
            <Card className="p-6 shadow-md">
                <div className="text-center text-gray-500">
                    No cover letter data available
                </div>
            </Card>
        );
    }

    const handleFieldUpdate = (field: keyof CoverLetterFields, value: string) => {
        setLocalFields(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleUpdatePreview = () => {
        if (localFields) {
            dispatch(updateCoverLetterFields(localFields));
            setHasUnsavedChanges(false);
            toast.success('Preview updated successfully');
        }
    };

    const handleResetChanges = () => {
        if (storeFields) {
            setLocalFields({ ...storeFields });
            setHasUnsavedChanges(false);
            toast.success('Changes reset');
        }
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
            {/* Update Controls - No Card Wrapper */}
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-2">
                    {hasUnsavedChanges && (
                        <span className="text-sm text-amber-600 font-medium">
                            You have unsaved changes
                        </span>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetChanges}
                        disabled={!hasUnsavedChanges}
                        className='cursor-pointer'
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                    </Button>
                    <Button
                        onClick={handleUpdatePreview}
                        disabled={!hasUnsavedChanges}
                        size="sm"
                        className='cursor-pointer'
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Update Preview
                    </Button>
                </div>
            </div>

            {/* Personal Information - Collapsible with Icon */}
            <Card className="shadow-md">
                <Collapsible open={personalOpen} onOpenChange={setPersonalOpen}>
                    <CardHeader>
                        <CollapsibleTrigger asChild className='pb-0'>
                            <div className="cursor-pointer flex items-center justify-between w-full  rounded-md p-2 -m-2 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <User className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg">Personal Information</CardTitle>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${personalOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <Input
                                        value={localFields.name}
                                        onChange={(e) => handleFieldUpdate('name', e.target.value)}
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <Input
                                        type="email"
                                        value={localFields.email}
                                        onChange={(e) => handleFieldUpdate('email', e.target.value)}
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <Input
                                        value={localFields.phone}
                                        onChange={(e) => handleFieldUpdate('phone', e.target.value)}
                                        placeholder="(123) 456-7890"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Address (Optional)</label>
                                    <Input
                                        value={localFields.address || ''}
                                        onChange={(e) => handleFieldUpdate('address', e.target.value)}
                                        placeholder="City, State"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>
            </Card>

            {/* Company Information - Collapsible with Icon */}
            <Card className="shadow-md">
                <Collapsible open={companyOpen} onOpenChange={setCompanyOpen}>
                    <CardHeader>
                        <CollapsibleTrigger asChild className='pb-0 box-border'>
                            <div className="cursor-pointer  flex items-center justify-between w-full rounded-md p-2  -m-2 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <Building className="h-5 w-5 text-green-600" />
                                    <CardTitle className="text-lg">Company Information</CardTitle>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company Name</label>
                                    <Input
                                        value={localFields.companyName}
                                        onChange={(e) => handleFieldUpdate('companyName', e.target.value)}
                                        placeholder="Company Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Position</label>
                                    <Input
                                        value={localFields.position}
                                        onChange={(e) => handleFieldUpdate('position', e.target.value)}
                                        placeholder="Job Title"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Hiring Manager (Optional)</label>
                                    <Input
                                        value={localFields.hiringManagerName || ''}
                                        onChange={(e) => handleFieldUpdate('hiringManagerName', e.target.value)}
                                        placeholder="e.g., Mr. Smith, Ms. Johnson"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company Address (Optional)</label>
                                    <Input
                                        value={localFields.companyAddress || ''}
                                        onChange={(e) => handleFieldUpdate('companyAddress', e.target.value)}
                                        placeholder="Company Address"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>
            </Card>

            {/* Letter Details - Collapsible with Icon */}
            <Card className="shadow-md">
                <Collapsible open={letterDetailsOpen} onOpenChange={setLetterDetailsOpen}>
                    <CardHeader>
                        <CollapsibleTrigger asChild className='pb-0'>
                            <div className="cursor-pointer flex items-center justify-between w-full  rounded-md p-2 -m-2 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <FileText className="h-5 w-5 text-purple-600" />
                                    <CardTitle className="text-lg">Letter Details</CardTitle>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${letterDetailsOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Date</label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={localFields.date}
                                            onChange={(e) => handleFieldUpdate('date', e.target.value)}
                                            placeholder="Month Day, Year"
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={setCurrentDate}
                                            className="shrink-0 cursor-pointer"
                                        >
                                            <Calendar className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Subject</label>
                                    <Input
                                        value={localFields.subject}
                                        onChange={(e) => handleFieldUpdate('subject', e.target.value)}
                                        placeholder="Application for Frontend Developer"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Greeting</label>
                                    <Input
                                        value={localFields.greeting}
                                        onChange={(e) => handleFieldUpdate('greeting', e.target.value)}
                                        placeholder="Dear Hiring Manager"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Signature</label>
                                    <Input
                                        value={localFields.signature}
                                        onChange={(e) => handleFieldUpdate('signature', e.target.value)}
                                        placeholder="Sincerely"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>
            </Card>

            {/* Letter Content - Collapsible with Icon */}
            <Card className="shadow-md">
                <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
                    <CardHeader className='pb-2'>
                        <CollapsibleTrigger asChild className='pb-0'>
                            <div className="cursor-pointer flex items-center justify-between w-full  rounded-md p-2 -m-2 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <PenTool className="h-5 w-5 text-orange-600" />
                                    <CardTitle className="text-lg">Letter Content</CardTitle>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${contentOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Cover Letter Body</label>
                                <Textarea
                                    value={localFields.content}
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
                    </CollapsibleContent>
                </Collapsible>
            </Card>

            {/* Bottom Update Button for Mobile */}
            <div className="lg:hidden">
                <Button
                    onClick={handleUpdatePreview}
                    disabled={!hasUnsavedChanges}
                    className="w-full cursor-pointer"
                    size="lg"
                >
                    <Save className="h-4 w-4 mr-2" />
                    Update Preview
                </Button>
            </div>
        </div>
    );
};