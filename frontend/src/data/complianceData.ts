import {
    Building2,
    ClipboardCheck,
    Scale,
    FileText,
    type LucideIcon
} from "lucide-react";

export interface ComplianceUpdate {
    id: number;
    slug: string;
    icon: LucideIcon;
    title: string;
    summary: string;
    category: "PF" | "ESIC" | "Payroll" | "Inspections";
    date: string;
    impact: string;
    actionRequired: string;
    content: {
        overview: string;
        whatChanged: string;
        whoItImpacts: string;
        whatYouShouldDo: string;
    };
}

export const complianceUpdates: ComplianceUpdate[] = [
    {
        id: 1,
        slug: "pf-wage-ceiling-revision",
        icon: Building2,
        title: "New PF Wage Ceiling Revision",
        summary: "The wage ceiling for PF contribution has been revised with effect from the new financial year.",
        category: "PF",
        date: "2 days ago",
        impact: "High Impact",
        actionRequired: "Immediate Action",
        content: {
            overview: "The Employees' Provident Fund Organisation (EPFO) has announced a significant revision to the wage ceiling for mandatory contributions. This change is designed to expand the social security net for employees across India.",
            whatChanged: "The previous wage ceiling of ₹15,000 per month has been proposed to be increased to ₹21,000 per month. This means more employees will now fall under the mandatory PF contribution requirement.",
            whoItImpacts: "Employers with more than 20 employees and employees earning between ₹15,000 and ₹21,000 who were previously excluded from mandatory PF.",
            whatYouShouldDo: "Update your payroll systems to reflect the new ceiling. Review your employee records to identify newly eligible employees and ensure their enrollment in the EPF scheme before the next billing cycle."
        }
    },
    {
        id: 2,
        slug: "esic-filing-timeline-updated",
        icon: ClipboardCheck,
        title: "ESIC Filing Timeline Updated",
        summary: "Updated deadlines for ESIC contribution filing for FY 2025 have been announced.",
        category: "ESIC",
        date: "4 days ago",
        impact: "Compliance Alert",
        actionRequired: "Review Deadlines",
        content: {
            overview: "The ESIC Corporation has issued new guidelines regarding the monthly contribution filing timelines for the upcoming financial year to streamline the collection process.",
            whatChanged: "The filing window has been shortened by 2 days. Contributions must now be deposited by the 13th of each month instead of the 15th to avoid automatic penalty generation.",
            whoItImpacts: "All establishments registered under the ESIC Act, 1948.",
            whatYouShouldDo: "Adjust your finance and payroll schedules to ensure funds are cleared and filings are completed by the 12th of each month to maintain a buffer."
        }
    },
    {
        id: 3,
        slug: "digital-inspection-norms",
        icon: Scale,
        title: "Digital Inspection Norms Introduced",
        summary: "New digital-first inspection norms for labor compliance across all states.",
        category: "Inspections",
        date: "1 week ago",
        impact: "Tech Shift",
        actionRequired: "Update Records",
        content: {
            overview: "In a move towards 'Ease of Doing Business', the Ministry of Labour and Employment is transitioning from physical to digital inspections for several compliance categories.",
            whatChanged: "Inspections will now be triggered by a centralized risk-based system. Most routine audits will be conducted through the 'Shram Suvidha' portal rather than on-site visits.",
            whoItImpacts: "Factories, commercial establishments, and any business subject to labor law inspections.",
            whatYouShouldDo: "Ensure all records are digitized and uploaded to the relevant portals. Maintain inspection-ready digital folders for PF, ESIC, and Minimum Wage registers."
        }
    },
    {
        id: 4,
        slug: "minimum-wage-revision-2025",
        icon: FileText,
        title: "Minimum Wages Revised in 5 States",
        summary: "Karnataka, Tamil Nadu, Maharashtra, Gujarat, and Delhi have updated minimum wage rates.",
        category: "Payroll",
        date: "1 week ago",
        impact: "Cost Increase",
        actionRequired: "Payroll Update",
        content: {
            overview: "Following the Consumer Price Index (CPI) changes, several state governments have notified the revision of Variable Dearness Allowance (VDA) affecting the total minimum wage.",
            whatChanged: "Minimum wage rates have increased by 3-5% across various skill categories (Unskilled, Semi-skilled, Skilled, and Highly Skilled) in the mentioned states.",
            whoItImpacts: "All employers operating in Karnataka, Tamil Nadu, Maharashtra, Gujarat, and Delhi.",
            whatYouShouldDo: "Review your current salary structures against the new state notifications. Ensure no employee is paid below the revised minimum wage to avoid legal penalties and back-pay claims."
        }
    }
];
