export interface ResumeData {
    name: string;
    email?: string;
    phone?: string;
    profile?: string;
    experience?: Experience[];
    skills?: Skills;
}

export interface Experience {
    company: string;
    position: string;
    description: string[];
    startDate?: string;
    endDate?: string;
}

export interface Skills {
    all: string[];
    // ... any other properties your Skills interface might have
}