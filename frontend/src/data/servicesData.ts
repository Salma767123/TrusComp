export interface ServiceDetail {
    id: string;
    title: string;
    category: "operations" | "audits" | "finance" | "factory" | "training" | "automation";
    overview: string;
    problems: string[];
    features: { title: string; hint: string }[];
    benefits: { keyword: string; text: string }[];
    whyTrusComp: string[];
    doodleType: "shield" | "audit" | "records" | "payroll" | "license" | "training" | "vendor" | "automation" | "risk" | "factory" | "calendar" | "remittance" | "employer_audit" | "contractor";
}

export const services: ServiceDetail[] = [
    {
        id: "labor-law-compliance",
        title: "End-to-End Labor Law Compliance Management",
        category: "operations",
        overview: "Expert-led solutions tailored for businesses across India, leveraging automation for smooth and error-free operations.",
        problems: [
            "Fragmented compliance tracking across multiple locations.",
            "High risk of human error in manual reporting.",
            "Complexity of staying updated with nationwide legal changes."
        ],
        features: [
            { title: "Centralized Compliance Tracking", hint: "Monitor all activities from a single dashboard." },
            { title: "Automated Workflows", hint: "Improve efficiency and accuracy, minimizing manual intervention." },
            { title: "Comprehensive Audits & Assessments", hint: "Identify and address compliance gaps." }
        ],
        benefits: [
            { keyword: "Risk Mitigation", text: "Minimized operational risks." },
            { keyword: "Time Savings", text: "Time-saving automation." },
            { keyword: "Nationwide Adherence", text: "Compliance across all Indian states." }
        ],
        whyTrusComp: [
            "Unmatched expertise in Indian labor laws.",
            "Innovative automation tools.",
            "Proven results with 100+ clients."
        ],
        doodleType: "shield"
    },
    {
        id: "compliance-calendar",
        title: "Compliance Calendar",
        category: "automation",
        overview: "Automated calendars designed to track critical timelines and ensure no deadlines are missed. Tailored to business requirements with proactive reminders.",
        problems: [
            "Missed deadlines leading to heavy penalties.",
            "Lack of visibility into upcoming statutory obligations.",
            "Inconsistent tracking across different departments."
        ],
        features: [
            { title: "Customizable Calendars", hint: "Adapt to specific business needs." },
            { title: "Proactive Reminders", hint: "Email and SMS notifications for upcoming deadlines." },
            { title: "Enterprise Integration", hint: "Seamless integration with existing systems." }
        ],
        benefits: [
            { keyword: "Zero Penalties", text: "Avoidance of late-filing fines." },
            { keyword: "High Visibility", text: "Enhanced clarity of obligations." },
            { keyword: "Proactive Mode", text: "Always stay ahead of schedules." }
        ],
        whyTrusComp: [
            "Custom-tailored solutions based on your industry.",
            "Proactive notification engine.",
            "Proven domain expertise."
        ],
        doodleType: "calendar"
    },
    {
        id: "records-registers",
        title: "Records & Registers Automation",
        category: "operations",
        overview: "Automated solutions for generating and managing % mandatory records and registers, ensuring 100% statutory adherence.",
        problems: [
            "Mounting administrative burden from manual data entry.",
            "High frequency of errors in statutory registers.",
            "Difficulties in retrieving documents during audits."
        ],
        features: [
            { title: "Automated Register Generation", hint: "Effortless generation of mandatory records." },
            { title: "Cloud-Based Storage", hint: "Secure, anytime access to statutory records." },
            { title: "Audit-Ready System", hint: "Quick and secure access for inspections." }
        ],
        benefits: [
            { keyword: "100% Adherence", text: "Absolute compliance with statutory acts." },
            { keyword: "Error-Free", text: "Elimination of manual calculation errors." },
            { keyword: "Audit Ready", text: "Zero-stress inspection experiences." }
        ],
        whyTrusComp: [
            "Expert-designed automation for all major acts.",
            "Bank-grade data security.",
            "Trusted by industry leaders."
        ],
        doodleType: "records"
    },
    {
        id: "remittances-returns",
        title: "Remittances & Returns",
        category: "finance",
        overview: "Automated processes for timely and accurate remittances and returns, reducing administrative overhead across central and state regulations.",
        problems: [
            "Complex multi-state tax and remittance rules.",
            "Inaccurate calculations leading to legal scrutiny.",
            "Delayed filings causing operational friction."
        ],
        features: [
            { title: "Automated Tracking", hint: "Precise calculation and tracking of obligations." },
            { title: "Multi-State Adherence", hint: "Compliance with all state labor laws and taxes." },
            { title: "Real-Time Dashboard", hint: "Monitor filings across multiple locations." }
        ],
        benefits: [
            { keyword: "Efficiency", text: "Reduced administrative overhead." },
            { keyword: "Transparency", text: "Clear audit trails for every filing." },
            { keyword: "Seamlessness", text: "Integration with payroll and finance." }
        ],
        whyTrusComp: [
            "Precision-first automation.",
            "Deep understanding of state-specific rules.",
            "Dedicated support for complex filings."
        ],
        doodleType: "remittance"
    },
    {
        id: "licenses-registrations",
        title: "Licenses & Registrations",
        category: "factory",
        overview: "Simplifies licensing and registration processes, ensuring seamless applications, renewals, and amendments with minimal effort.",
        problems: [
            "Complex documentation for new factory licenses.",
            "Operational disruptions due to expired registrations.",
            "Lack of tracking for multiple renewal dates."
        ],
        features: [
            { title: "Real-Time Tracking", hint: "Stay updated on the status of licensing processes." },
            { title: "Expert Support", hint: "Assistance with applications and amendments." },
            { title: "Document Management", hint: "Streamlined storage for easy submission." }
        ],
        benefits: [
            { keyword: "Continuous Ops", text: "Avoid operational disruptions." },
            { keyword: "Streamlined", text: "Simplified regulatory requirements." },
            { keyword: "Accuracy", text: "Expert-verified documentation." }
        ],
        whyTrusComp: [
            "Tailored solutions for diverse sectors.",
            "Proactive renewal engine.",
            "Direct coordination with authorities."
        ],
        doodleType: "license"
    },
    {
        id: "inspection-handling",
        title: "Inspection Handling & Audit Appearance",
        category: "audits",
        overview: "Ensures organizations are fully prepared for inspections and audits with expert representation and automated tracking.",
        problems: [
            "Panic and unpreparedness during surprise inspections.",
            "Lack of organized evidence for compliance claims.",
            "High probability of penalties during audits."
        ],
        features: [
            { title: "Audit Readiness Reports", hint: "On-demand generation of precise documentation." },
            { title: "Expert Representation", hint: "Professional guidance during inspections." },
            { title: "Gap Assessment", hint: "Proactively identify and address failings." }
        ],
        benefits: [
            { keyword: "Confidence", text: "Enhanced audit outcomes." },
            { keyword: "Stress-Free", text: "Calm navigation of legal inquiries." },
            { keyword: "Safety", text: "Strong defense against heavy penalties." }
        ],
        whyTrusComp: [
            "Years of experience in handling inspections.",
            "Proactive audit-readiness frameworks.",
            "Expert legal advisors."
        ],
        doodleType: "audit"
    },
    {
        id: "vendor-audit",
        title: "Vendor Audit",
        category: "audits",
        overview: "Streamlines vendor audits for complete visibility into the extended supply chain's statutory and regulatory adherence.",
        problems: [
            "Vicarious liability for vendor non-compliance.",
            "Operational downtime due to supply chain legal issues.",
            "Financial losses from unmonitored vendor obligations."
        ],
        features: [
            { title: "200+ Audit Checkpoints", hint: "Customized based on applicable labor laws." },
            { title: "Risk Categorization", hint: "Evaluate vendors by High, Medium, or Low risk." },
            { title: "Automated Reporting", hint: "Simplified reporting for quick decision-making." }
        ],
        benefits: [
            { keyword: "Safe Supply Chain", text: "Reduced risk of vicarious liability." },
            { keyword: "Stronger Bonds", text: "Clear expectations for vendor partners." },
            { keyword: "Optimization", text: "Leaner, more compliant operations." }
        ],
        whyTrusComp: [
            "Comprehensive vendor risk analysis.",
            "Industry-leading audit checklists.",
            "Tailored consultation for PF/ESI liabilities."
        ],
        doodleType: "vendor"
    },
    {
        id: "employer-audit",
        title: "Employer Audit (S&E and Factory)",
        category: "audits",
        overview: "Thorough automated audits covering Shops & Establishments and Factory standards to ensure state and central adherence.",
        problems: [
            "Hidden legal gaps in internal operations.",
            "Inconsistent adherence to Factory Act standards.",
            "Lack of objective compliance scoring."
        ],
        features: [
            { title: "500+ Audit Checkpoints", hint: "Extensive checklists for Factory and S&E Acts." },
            { title: "Risk Analysis", hint: "Legal and financial risks categorized with fixes." },
            { title: "Detailed Dashboard", hint: "Visibility into every compliance gap." }
        ],
        benefits: [
            { keyword: "Legal Guard", text: "Solid protection against regulatory action." },
            { keyword: "Workforce Trust", text: "Increased employee confidence." },
            { keyword: "Cost Avoidance", text: "Prevent fines through proactive fixes." }
        ],
        whyTrusComp: [
            "Multi-decade experience in statutory audits.",
            "Actionable, expert-led recommendations.",
            "Comprehensive coverage of all labor acts."
        ],
        doodleType: "employer_audit"
    },
    {
        id: "payroll-compliance",
        title: "Payroll Compliance",
        category: "finance",
        overview: "Advanced automation for error-free payroll processing, including statutory deductions and seamless filings.",
        problems: [
            "Complex PF/ESI/PT slab rate variations.",
            "High administrative time spent on manual challans.",
            "Inaccurate KYC data causing claim rejections."
        ],
        features: [
            { title: "Automated Calculations", hint: "Precise deductions for PF, ESI, and PT." },
            { title: "SS Bot Integration", hint: "Automated UAN and IP generation." },
            { title: "Real-Time Tracking", hint: "Monitor payroll compliance status globally." }
        ],
        benefits: [
            { keyword: "Zero Errors", text: "Elimination of miscalculation risks." },
            { keyword: "Employee Trust", text: "Timely and accurate social security filings." },
            { keyword: "Streamlined", text: "Integration with existing HRIS/ERP." }
        ],
        whyTrusComp: [
            "Specialized Social Security Bot technology.",
            "Deep expertise in remittance validation.",
            "Scalable solutions for any workforce size."
        ],
        doodleType: "payroll"
    },
    {
        id: "ss-bot",
        title: "UAN and IP Generation (SS Bot)",
        category: "automation",
        overview: "Simplifies social security compliance with TrusComp’s advanced Social Security Bot for effortless UAN and IP generation.",
        problems: [
            "Slow, manual onboarding of new employees.",
            "Frequent data entry errors in UAN/IP mapping.",
            "Administrative bottlenecks during large-scale hiring."
        ],
        features: [
            { title: "Zero Intervention", hint: "Fully automated UAN and IP generation." },
            { title: "Instant Validation", hint: "Automated data checks to reduce errors." },
            { title: "HR Integration", hint: "Effortless sync with your existing HR flow." }
        ],
        benefits: [
            { keyword: "Velocity", text: "Onboard employees in minutes, not days." },
            { keyword: "Accuracy", text: "Eliminate name/DOB mismatch issues." },
            { keyword: "Efficiency", text: "Massive reduction in admin workload." }
        ],
        whyTrusComp: [
            "Proprietary automation technology.",
            "Continuous updates for portal changes.",
            "Used by leading multi-national corps."
        ],
        doodleType: "automation"
    },
    {
        id: "compliance-risk-assessment",
        title: "Compliance Risk Assessment",
        category: "audits",
        overview: "Expert-led assessments using comprehensive frameworks to identify and prioritize potential compliance threats.",
        problems: [
            "Undetected financial exposure from labor law gaps.",
            "Lack of a prioritization strategy for legal risks.",
            "Reactive management of compliance crises."
        ],
        features: [
            { title: "Scoring Engine", hint: "Automated prioritization of High, Medium, and Low risks." },
            { title: "Custom Frameworks", hint: "Assessments tailored to your specific industry." },
            { title: "Strategic Roadmap", hint: "A clear plan for remediating all threats." }
        ],
        benefits: [
            { keyword: "Proactivity", text: "Solve problems before they become crises." },
            { keyword: "Exposure Control", text: "Minimized legal and financial liability." },
            { keyword: "Optimized Ops", text: "Strengthened internal compliance checks." }
        ],
        whyTrusComp: [
            "Holistic approach to regulatory risk.",
            "Highly actionable assessment data.",
            "Expert-led interpretation of complexities."
        ],
        doodleType: "risk"
    },
    {
        id: "training-awareness",
        title: "Training and Awareness Programs",
        category: "training",
        overview: "Empowers employees and vendors with engaging training modules to foster a culture of ethical compliance.",
        problems: [
            "Ignorance of compliance rules among front-line staff.",
            "Weak collaboration between vendors and internal teams.",
            "Outdated knowledge of evolving labor laws."
        ],
        features: [
            { title: "Custom Modules", hint: "Training tailored to your business site's needs." },
            { title: "Expert-Led Sessions", hint: "Interactive sessions with real-world case studies." },
            { title: "Regulatory Updates", hint: "Regular refreshers on the latest legal changes." }
        ],
        benefits: [
            { keyword: "Compliance Culture", text: "Integrity embedded in daily operations." },
            { keyword: "Shared Values", text: "Alignment between team and vendors." },
            { keyword: "Knowledge", text: "Up-to-date staff prepared for change." }
        ],
        whyTrusComp: [
            "Engaging, non-boring training formats.",
            "Trainers with deep field experience.",
            "Commitment to long-term behavioral change."
        ],
        doodleType: "training"
    },
    {
        id: "contractor-compliance",
        title: "Contractor Compliance Solutions",
        category: "operations",
        overview: "An all-in-one solution for mitigating risks and boosting efficiency through automated contractor management.",
        problems: [
            "Difficulties in tracking contractor statutory records.",
            "Risk of project stalls due to non-compliant labor.",
            "Document retrieval lag during legal inquiries."
        ],
        features: [
            { title: "Centralized Management", hint: "Secure storage for all contractor documents." },
            { title: "Requalification Alerts", hint: "Automatic notifications for expiring documents." },
            { title: "Intuitive Portal", hint: "User-friendly interface for contractors/clients." }
        ],
        benefits: [
            { keyword: "Safe Labor", text: "Guaranteed adherence to labor safety rules." },
            { keyword: "40% Efficiency", text: "Massive reduction in admin overhead." },
            { keyword: "Real-Time", text: "Instant visibility into contractor status." }
        ],
        whyTrusComp: [
            "Award-winning support for site management.",
            "Proven reduction in administrative friction.",
            "High scalability for massive projects."
        ],
        doodleType: "contractor"
    },
    {
        id: "factory-compliance",
        title: "Factory Compliance Solutions",
        category: "factory",
        overview: "Simplifies the complex regulatory landscape of manufacturing for safe and efficient operations.",
        problems: [
            "Intimidating complexity of the Factories Act.",
            "Poor health and safety documentation.",
            "Difficulty in coordinating with pollution control boards."
        ],
        features: [
            { title: "License Management", hint: "Obtain and renew critical factory licenses." },
            { title: "H&S Audits", hint: "Regular health, safety, and welfare checks." },
            { title: "Documentation Support", hint: "Preparing and filing all mandatory periodic returns." }
        ],
        benefits: [
            { keyword: "Operational Ease", text: "Navigate factory laws without friction." },
            { keyword: "Worker Safety", text: "Improved workplace safety standards." },
            { keyword: "Readiness", text: "Always prepared for regulatory audits." }
        ],
        whyTrusComp: [
            "Decades of specialized manufacturing experience.",
            "Comprehensive end-to-end support.",
            "Empowerment-focused training programs."
        ],
        doodleType: "factory"
    }
];
