import { LucideIcon, ShieldCheck, Zap, TrendingUp, Users } from "lucide-react";

export interface Testimonial {
    id: string;
    quote: string;
    clientName: string;
    designation: string;
    company: string;
    engagementType: string;
}

export interface WhyChooseItem {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        quote: "TrusComp transformed our compliance management. Their automated alerts and detailed audit reports helped us stay ahead of regulatory changes across 5 states.",
        clientName: "Rajesh Kumar",
        designation: "HR Director",
        company: "TechFlow Solutions",
        engagementType: "Multi-State Compliance Audit"
    },
    {
        id: "2",
        quote: "The Code on Wages implementation was complex, but TrusComp's team simplified it for us. Their expertise is unmatched in the industry.",
        clientName: "Anita Desmond",
        designation: "VP of Operations",
        company: "Global Logistics Ltd",
        engagementType: "Wage Code Implementation"
    },
    {
        id: "3",
        quote: "We reduced our compliance risk by 40% within the first quarter. The transparency and real-time updates provided by their portal are game-changers.",
        clientName: "Vikram Singh",
        designation: "Legal Head",
        company: "Innovate Manufacturing",
        engagementType: "Factory Act Compliance"
    },
    {
        id: "4",
        quote: "Exceptional support during our vendor audit. They identified critical gaps we hadn't noticed and provided actionable remediation plans immediately.",
        clientName: "Meera Reddy",
        designation: "Compliance Officer",
        company: "City Retail Group",
        engagementType: "Vendor Compliance Audit"
    },
    {
        id: "5",
        quote: "A true partner in every sense. TrusComp doesn't just treat compliance as a checklist, but as a strategic advantage for our business growth.",
        clientName: "Sanjay Gupta",
        designation: "Chief Financial Officer",
        company: "Sunrise Pharma",
        engagementType: "Strategic Labor Consulting"
    }
];

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
    {
        id: "wc1",
        title: "Expert Solutions",
        description: "Backed by decades of legal expertise in Indian Labor Laws.",
        icon: ShieldCheck
    },
    {
        id: "wc2",
        title: "Innovative Tools",
        description: "Tech-enabled platforms for real-time tracking and reporting.",
        icon: Zap
    },
    {
        id: "wc3",
        title: "Proven Results",
        description: "Consistent risk reduction and process optimization for 500+ clients.",
        icon: TrendingUp
    },
    {
        id: "wc4",
        title: "Exceptional Support",
        description: "Dedicated account managers ensuring you never miss a deadline.",
        icon: Users
    }
];
