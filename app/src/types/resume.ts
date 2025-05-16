
export interface ResumeData {
    name: string;
    profile?: string;
    experience?: Experience[];
    skills?: Skills;
    email?: string;
    phone?: string;
}

export interface Experience {
    company: string;
    position: string;
    description: string[];
    startDate?: string;
    endDate?: string;
}

export interface Skills {
    languages?: string[];
    frontend?: string[];
    backend?: string[];
    other?: string[];
}