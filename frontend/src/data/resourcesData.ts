export type ResourceCategory =
    | "Acts"
    | "Forms"
    | "Gazette Notifications"
    | "Holidays List"
    | "Labour Welfare Fund"
    | "Leave & Working Hours"
    | "Minimum Wages"
    | "Professional Tax"
    | "Provident Fund"
    | "Rules"
    | "ESIC"
    | "Labour Law Updates";

export interface ResourceItem {
    id: string;
    title: string;
    description: string;
    releaseDate: string;
    effectiveDate: string;
    state: string;
    category: ResourceCategory;
    downloadUrl: string;
    speaker?: {
        name: string;
        role: string;
        organization: string;
        image?: string;
    };
}

export interface HolidayItem {
    date: string;
    day: string;
    name: string;
}

export interface StateHolidayList {
    stateName: string;
    holidays: HolidayItem[];
}

export const CATEGORIES: { id: ResourceCategory; icon: string; label: string }[] = [
    { id: "Labour Law Updates", icon: "BookOpen", label: "Labour Law Updates" },
    { id: "Acts", icon: "Scale", label: "Acts" },
    { id: "Forms", icon: "FileText", label: "Forms" },
    { id: "Gazette Notifications", icon: "Bell", label: "Gazette Notifications" },
    { id: "Holidays List", icon: "Calendar", label: "Holidays List" },
    { id: "Labour Welfare Fund", icon: "Wallet", label: "Labour Welfare Fund" },
    { id: "Leave & Working Hours", icon: "Clock", label: "Leave & Working Hours" },
    { id: "Minimum Wages", icon: "IndianRupee", label: "Minimum Wages" },
    { id: "Professional Tax", icon: "BadgePercent", label: "Professional Tax" },
    { id: "Provident Fund", icon: "PiggyBank", label: "Provident Fund" },
    { id: "Rules", icon: "Book", label: "Rules" },
    { id: "ESIC", icon: "HeartPulse", label: "ESIC" },
];

export const MOCK_RESOURCES: ResourceItem[] = [
    // Acts
    {
        id: "act-1",
        title: "The Code on Wages, 2019",
        description: "An Act to amend and consolidate the laws relating to wages and bonus.",
        releaseDate: "08 Aug 2019",
        effectiveDate: "To be notified",
        state: "Central",
        category: "Acts",
        downloadUrl: "#",
    },
    {
        id: "act-2",
        title: "The Industrial Relations Code, 2020",
        description: "Consolidates laws relating to Trade Unions, conditions of employment in industrial establishment or undertaking, investigation and settlement of industrial disputes.",
        releaseDate: "28 Sep 2020",
        effectiveDate: "To be notified",
        state: "Central",
        category: "Acts",
        downloadUrl: "#",
    },

    // Forms
    {
        id: "form-1",
        title: "Form I - Register of Fines",
        description: "Standard format for maintaining the register of fines as per the Code on Wages.",
        releaseDate: "N/A",
        effectiveDate: "Immediate",
        state: "Central",
        category: "Forms",
        downloadUrl: "#",
    },

    // Gazette Notifications
    {
        id: "gaz-1",
        title: "Implementation of New Labour Codes",
        description: "Notification regarding the upcoming implementation of the four new labour codes across all states.",
        releaseDate: "15 Jan 2024",
        effectiveDate: "01 Apr 2024",
        state: "Central",
        category: "Gazette Notifications",
        downloadUrl: "#",
    },

    // Labour Welfare Fund
    {
        id: "lwf-1",
        title: "LWF Contribution Rate Revision - Karnataka",
        description: "Notification regarding the increase in LWF contribution rates for employers and employees in Karnataka.",
        releaseDate: "01 Jan 2024",
        effectiveDate: "01 Jan 2024",
        state: "Karnataka",
        category: "Labour Welfare Fund",
        downloadUrl: "#",
    },

    // Leave & Working Hours
    {
        id: "lwh-1",
        title: "Karnataka Shops and Establishments (Amendment) Act",
        description: "Permitting women to work in night shifts with safety measures.",
        releaseDate: "20 Feb 2024",
        effectiveDate: "Immediate",
        state: "Karnataka",
        category: "Leave & Working Hours",
        downloadUrl: "#",
    },

    // Minimum Wages
    {
        id: "mw-1",
        title: "Minimum Wages Revision - Delhi",
        description: "Order regarding the revision of minimum rates of wages for Scheduled Employments.",
        releaseDate: "01 Apr 2024",
        effectiveDate: "01 Apr 2024",
        state: "Delhi",
        category: "Minimum Wages",
        downloadUrl: "#",
    },

    // Professional Tax
    {
        id: "pt-1",
        title: "Professional Tax Slab Update - Gujarat",
        description: "Revised professional tax slabs for salaried employees.",
        releaseDate: "01 Apr 2024",
        effectiveDate: "01 Apr 2024",
        state: "Gujarat",
        category: "Professional Tax",
        downloadUrl: "#",
    },

    // Provident Fund
    {
        id: "pf-1",
        title: "EPFO Circular on Higher Pension",
        description: "Guidelines for application of higher pension under EPS 95.",
        releaseDate: "20 Feb 2023",
        effectiveDate: "Immediate",
        state: "Central",
        category: "Provident Fund",
        downloadUrl: "#",
    },

    // Rules
    {
        id: "rule-1",
        title: "Central Goods and Services Tax Rules (Amendment)",
        description: "Modifications to the GST rules regarding input tax credit.",
        releaseDate: "15 Oct 2024",
        effectiveDate: "Immediate",
        state: "Central",
        category: "Rules",
        downloadUrl: "#",
    },

    {
        id: "esic-1",
        title: "Extension of ESI Scheme to New Districts",
        description: "Notification extending ESI coverage to all municipal areas in specific districts.",
        releaseDate: "01 Nov 2024",
        effectiveDate: "01 Nov 2024",
        state: "Tamil Nadu",
        category: "ESIC",
        downloadUrl: "#",
    },
];

export const HOLIDAY_DATA: StateHolidayList[] = [
    {
        stateName: "Maharashtra",
        holidays: [
            { date: "26 Jan 2025", day: "Sunday", name: "Republic Day" },
            { date: "19 Feb 2025", day: "Wednesday", name: "Chhatrapati Shivaji Maharaj Jayanti" },
            { date: "14 Mar 2025", day: "Friday", name: "Holi (Second Day)" },
            { date: "31 Mar 2025", day: "Monday", name: "Gudi Padwa" },
            { date: "10 Apr 2025", day: "Thursday", name: "Ramzan Id (Id-Ul-Fitr) (Shawwal-1)" },
            { date: "14 Apr 2025", day: "Monday", name: "Dr. Babasaheb Ambedkar Jayanti" },
            { date: "01 May 2025", day: "Thursday", name: "Maharashtra Day" },
            { date: "15 Aug 2025", day: "Friday", name: "Independence Day" },
            { date: "27 Aug 2025", day: "Wednesday", name: "Ganesh Chaturthi" },
            { date: "02 Oct 2025", day: "Thursday", name: "Mahatma Gandhi Jayanti" },
            { date: "21 Oct 2025", day: "Tuesday", name: "Diwali Amavasya (Laxmi Pujan)" },
            { date: "25 Dec 2025", day: "Thursday", name: "Christmas" },
        ],
    },
    {
        stateName: "Delhi",
        holidays: [
            { date: "26 Jan 2025", day: "Sunday", name: "Republic Day" },
            { date: "14 Mar 2025", day: "Friday", name: "Holi" },
            { date: "10 Apr 2025", day: "Thursday", name: "Id-ul-Fitr" },
            { date: "14 Apr 2025", day: "Monday", name: "Dr. B.R. Ambedkar's Birthday" },
            { date: "15 Aug 2025", day: "Friday", name: "Independence Day" },
            { date: "02 Oct 2025", day: "Thursday", name: "Mahatma Gandhi's Birthday" },
            { date: "21 Oct 2025", day: "Tuesday", name: "Diwali (Deepavali)" },
            { date: "25 Dec 2025", day: "Thursday", name: "Christmas Day" },
        ],
    },
    {
        stateName: "Karnataka",
        holidays: [
            { date: "14 Jan 2025", day: "Tuesday", name: "Makara Sankranti" },
            { date: "26 Jan 2025", day: "Sunday", name: "Republic Day" },
            { date: "26 Feb 2025", day: "Wednesday", name: "Maha Shivaratri" },
            { date: "31 Mar 2025", day: "Monday", name: "Ugadi" },
            { date: "01 May 2025", day: "Thursday", name: "May Day" },
            { date: "15 Aug 2025", day: "Friday", name: "Independence Day" },
            { date: "02 Oct 2025", day: "Thursday", name: "Gandhi Jayanti" },
            { date: "01 Nov 2025", day: "Saturday", name: "Kannada Rajyotsava" },
            { date: "25 Dec 2025", day: "Thursday", name: "Christmas" },
        ],
    },
];

export const blogPosts = [
    {
        id: 1,
        title: "Understanding the New Code on Wages 2019",
        category: "Compliance",
        date: "Dec 12, 2024",
        readTime: "5 min read",
        excerpt: "A comprehensive guide to the key changes introduced in the Code on Wages 2019 and its impact on businesses.",
        imageType: "wages" as const
    },
    {
        id: 2,
        title: "ESIC Contribution Rates Revised",
        category: "Notifications",
        date: "Nov 28, 2024",
        readTime: "3 min read",
        excerpt: "The government has reduced the ESI contribution rates. Here is what employers and employees need to know.",
        imageType: "compliance" as const
    },
    {
        id: 3,
        title: "Digital Compliance: The Future of HR",
        category: "Technology",
        date: "Oct 15, 2024",
        readTime: "6 min read",
        excerpt: "How technology is transforming labor law compliance management and reducing risks for organizations.",
        imageType: "automation" as const
    },
    {
        id: 4,
        title: "New PF Contribution Rules for 2025",
        category: "Updates",
        date: "Sep 20, 2024",
        readTime: "4 min read",
        excerpt: "EPFO announces revised contribution rules and wage ceiling updates effective from January 2025.",
        imageType: "wages" as const
    },
    {
        id: 5,
        title: "State-wise Minimum Wage Revisions",
        category: "Compliance",
        date: "Aug 05, 2024",
        readTime: "7 min read",
        excerpt: "Complete breakdown of minimum wage revisions across all states and union territories for FY 2024-25.",
        imageType: "compliance" as const
    }
];

// --- Additional Exports for CategoryViews.tsx ---

// List of Indian states with IDs for the Holidays view
export const indianStates: { id: string; name: string }[] = [
    { id: "AN", name: "Andaman & Nicobar" },
    { id: "AP", name: "Andhra Pradesh" },
    { id: "AR", name: "Arunachal Pradesh" },
    { id: "AS", name: "Assam" },
    { id: "BR", name: "Bihar" },
    { id: "CH", name: "Chandigarh" },
    { id: "CT", name: "Chhattisgarh" },
    { id: "DL", name: "Delhi" },
    { id: "GA", name: "Goa" },
    { id: "GJ", name: "Gujarat" },
    { id: "HR", name: "Haryana" },
    { id: "HP", name: "Himachal Pradesh" },
    { id: "JK", name: "Jammu & Kashmir" },
    { id: "JH", name: "Jharkhand" },
    { id: "KA", name: "Karnataka" },
    { id: "KL", name: "Kerala" },
    { id: "MP", name: "Madhya Pradesh" },
    { id: "MH", name: "Maharashtra" },
    { id: "MN", name: "Manipur" },
    { id: "ML", name: "Meghalaya" },
    { id: "MZ", name: "Mizoram" },
    { id: "NL", name: "Nagaland" },
    { id: "OR", name: "Odisha" },
    { id: "PB", name: "Punjab" },
    { id: "RJ", name: "Rajasthan" },
    { id: "SK", name: "Sikkim" },
    { id: "TN", name: "Tamil Nadu" },
    { id: "TS", name: "Telangana" },
    { id: "TR", name: "Tripura" },
    { id: "UP", name: "Uttar Pradesh" },
    { id: "UK", name: "Uttarakhand" },
    { id: "WB", name: "West Bengal" },
];

// Holidays data indexed by state ID for quick lookup
export const holidaysData: Record<string, { date: string; day: string; name: string; type: string; gazette_pdf_url?: string }[]> = {
    MH: [
        { date: "26 Jan 2025", day: "Sunday", name: "Republic Day", type: "Gazetted" },
        { date: "19 Feb 2025", day: "Wednesday", name: "Chhatrapati Shivaji Maharaj Jayanti", type: "Gazetted" },
        { date: "14 Mar 2025", day: "Friday", name: "Holi (Second Day)", type: "Gazetted" },
        { date: "31 Mar 2025", day: "Monday", name: "Gudi Padwa", type: "Gazetted" },
        { date: "10 Apr 2025", day: "Thursday", name: "Ramzan Id (Id-Ul-Fitr)", type: "Gazetted" },
        { date: "14 Apr 2025", day: "Monday", name: "Dr. Babasaheb Ambedkar Jayanti", type: "Gazetted" },
        { date: "01 May 2025", day: "Thursday", name: "Maharashtra Day", type: "Gazetted" },
        { date: "15 Aug 2025", day: "Friday", name: "Independence Day", type: "Gazetted" },
        { date: "27 Aug 2025", day: "Wednesday", name: "Ganesh Chaturthi", type: "Gazetted" },
        { date: "02 Oct 2025", day: "Thursday", name: "Mahatma Gandhi Jayanti", type: "Gazetted" },
        { date: "21 Oct 2025", day: "Tuesday", name: "Diwali Amavasya (Laxmi Pujan)", type: "Gazetted" },
        { date: "25 Dec 2025", day: "Thursday", name: "Christmas", type: "Gazetted" },
    ],
    DL: [
        { date: "26 Jan 2025", day: "Sunday", name: "Republic Day", type: "Gazetted" },
        { date: "14 Mar 2025", day: "Friday", name: "Holi", type: "Gazetted" },
        { date: "10 Apr 2025", day: "Thursday", name: "Id-ul-Fitr", type: "Gazetted" },
        { date: "14 Apr 2025", day: "Monday", name: "Dr. B.R. Ambedkar's Birthday", type: "Gazetted" },
        { date: "15 Aug 2025", day: "Friday", name: "Independence Day", type: "Gazetted" },
        { date: "02 Oct 2025", day: "Thursday", name: "Mahatma Gandhi's Birthday", type: "Gazetted" },
        { date: "21 Oct 2025", day: "Tuesday", name: "Diwali (Deepavali)", type: "Gazetted" },
        { date: "25 Dec 2025", day: "Thursday", name: "Christmas Day", type: "Gazetted" },
    ],
    KA: [
        { date: "14 Jan 2025", day: "Tuesday", name: "Makara Sankranti", type: "Gazetted" },
        { date: "26 Jan 2025", day: "Sunday", name: "Republic Day", type: "Gazetted" },
        { date: "26 Feb 2025", day: "Wednesday", name: "Maha Shivaratri", type: "Gazetted" },
        { date: "31 Mar 2025", day: "Monday", name: "Ugadi", type: "Gazetted" },
        { date: "01 May 2025", day: "Thursday", name: "May Day", type: "Gazetted" },
        { date: "15 Aug 2025", day: "Friday", name: "Independence Day", type: "Gazetted" },
        { date: "02 Oct 2025", day: "Thursday", name: "Gandhi Jayanti", type: "Gazetted" },
        { date: "01 Nov 2025", day: "Saturday", name: "Kannada Rajyotsava", type: "Gazetted" },
        { date: "25 Dec 2025", day: "Thursday", name: "Christmas", type: "Gazetted" },
    ],
    TN: [
        { date: "14 Jan 2025", day: "Tuesday", name: "Pongal", type: "Gazetted" },
        { date: "26 Jan 2025", day: "Sunday", name: "Republic Day", type: "Gazetted" },
        { date: "14 Apr 2025", day: "Monday", name: "Tamil New Year", type: "Gazetted" },
        { date: "01 May 2025", day: "Thursday", name: "May Day", type: "Gazetted" },
        { date: "15 Aug 2025", day: "Friday", name: "Independence Day", type: "Gazetted" },
        { date: "02 Oct 2025", day: "Thursday", name: "Gandhi Jayanti", type: "Gazetted" },
        { date: "25 Dec 2025", day: "Thursday", name: "Christmas", type: "Gazetted" },
    ],
    GJ: [
        { date: "14 Jan 2025", day: "Tuesday", name: "Uttarayan", type: "Gazetted" },
        { date: "26 Jan 2025", day: "Sunday", name: "Republic Day", type: "Gazetted" },
        { date: "14 Mar 2025", day: "Friday", name: "Holi", type: "Gazetted" },
        { date: "15 Aug 2025", day: "Friday", name: "Independence Day", type: "Gazetted" },
        { date: "02 Oct 2025", day: "Thursday", name: "Gandhi Jayanti", type: "Gazetted" },
        { date: "21 Oct 2025", day: "Tuesday", name: "Diwali", type: "Gazetted" },
        { date: "22 Oct 2025", day: "Wednesday", name: "Gujarat New Year", type: "Gazetted" },
        { date: "25 Dec 2025", day: "Thursday", name: "Christmas", type: "Gazetted" },
    ],
};

// Filtered data for Acts
export const actsData = MOCK_RESOURCES.filter(r => r.category === "Acts").map(act => ({
    id: act.id,
    title: act.title,
    shortDesc: act.description,
    state: act.state,
    released: act.releaseDate,
    effectiveDate: act.effectiveDate,
    downloadUrl: act.downloadUrl,
}));

// Filtered data for Forms  
export const formsData = MOCK_RESOURCES.filter(r => r.category === "Forms").map(form => ({
    form: form.title,
    act: form.description,
    formCode: form.id.toUpperCase(),
    state: form.state,
    updated: form.releaseDate === "N/A" ? "2024" : form.releaseDate,
    downloadUrl: form.downloadUrl,
}));

// Filtered data for Gazette Notifications
export const gazetteData = MOCK_RESOURCES.filter(r => r.category === "Gazette Notifications").map(gaz => ({
    title: gaz.title,
    state: gaz.state,
    released: gaz.releaseDate,
    effective: gaz.effectiveDate,
    downloadUrl: gaz.downloadUrl,
}));

// LWF (Labour Welfare Fund) data
export const lwfData = MOCK_RESOURCES.filter(r => r.category === "Labour Welfare Fund").map(lwf => ({
    id: lwf.id,
    title: lwf.title,
    description: lwf.description,
    state: lwf.state,
    releaseDate: lwf.releaseDate,
    effectiveDate: lwf.effectiveDate,
    downloadUrl: lwf.downloadUrl,
}));
