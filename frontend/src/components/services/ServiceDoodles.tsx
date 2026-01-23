import { motion } from "framer-motion";

// 1. Labor Law Compliance - Shield with checkmark and document
export const LaborLawComplianceDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Shield outline */}
        <motion.path
            d="M50 10 L85 25 V50 C85 70 50 90 50 90 C50 90 15 70 15 50 V25 L50 10Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Checkmark */}
        <motion.path
            d="M35 50 L45 60 L65 35"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
        />
        {/* Document lines */}
        <motion.g
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <path d="M40 25 H60" strokeWidth="1.5" />
            <path d="M40 30 H55" strokeWidth="1.5" />
        </motion.g>
    </svg>
);

// 2. Compliance Calendar - Calendar grid with date markers
export const ComplianceCalendarDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Calendar frame */}
        <rect x="20" y="25" width="60" height="60" rx="4" />
        <rect x="20" y="25" width="60" height="12" className="fill-primary opacity-10" />
        {/* Calendar rings */}
        <path d="M32 25 V18 M48 25 V18 M68 25 V18" strokeWidth="2.5" strokeLinecap="round" />
        {/* Calendar grid */}
        <path d="M20 45 H80 M20 57 H80 M20 69 H80" strokeWidth="1" opacity="0.3" />
        <path d="M35 37 V85 M50 37 V85 M65 37 V85" strokeWidth="1" opacity="0.3" />
        {/* Date markers appearing */}
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
        >
            <circle cx="27" cy="52" r="2.5" className="fill-primary" />
            <circle cx="42" cy="52" r="2.5" className="fill-primary" />
            <circle cx="57" cy="64" r="2.5" className="fill-primary" />
        </motion.g>
        {/* Bell notification */}
        <motion.g
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ originX: "72px", originY: "75px" }}
        >
            <path d="M67 73 Q67 68 72 68 Q77 68 77 73 L77 78 Q79 80 79 82 H65 Q65 80 67 78 Z" strokeWidth="1.8" />
            <motion.circle
                cx="72"
                cy="65"
                r="2.5"
                className="fill-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.g>
    </svg>
);

// 3. Records & Registers Automation - Filing cabinet with automation
export const RecordsAutomationDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Filing cabinet */}
        <rect x="25" y="20" width="50" height="60" rx="3" />
        <path d="M25 40 H75 M25 60 H75" strokeWidth="1.5" />
        {/* Drawer handles */}
        <rect x="45" y="28" width="10" height="4" rx="1" />
        <rect x="45" y="48" width="10" height="4" rx="1" />
        <rect x="45" y="68" width="10" height="4" rx="1" />
        {/* Automation arrows flowing */}
        <motion.g
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
        >
            <path d="M10 30 L20 30" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 27 L20 30 L17 33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, delay: 0.8, repeat: Infinity }}
        >
            <path d="M10 50 L20 50" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 47 L20 50 L17 53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
    </svg>
);

// 4. Remittances & Returns - Document with payment flow to bank
export const RemittancesDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Document/Form */}
        <rect x="15" y="30" width="35" height="45" rx="3" />
        <path d="M20 40 H45 M20 47 H42 M20 54 H45 M20 61 H40" strokeWidth="1.2" />
        {/* Checkmark on document */}
        <motion.path
            d="M35 67 L38 70 L45 63"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
        />
        {/* Payment flow arrows */}
        <motion.g
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 15, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <path d="M50 45 L60 45" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M57 42 L60 45 L57 48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 15, opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 0.7, repeat: Infinity }}
        >
            <path d="M50 55 L60 55" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M57 52 L60 55 L57 58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        {/* Bank building */}
        <rect x="65" y="35" width="25" height="35" rx="2" />
        <path d="M65 45 H90 M65 55 H90 M65 65 H90" strokeWidth="1" opacity="0.4" />
        {/* Bank columns */}
        <path d="M70 40 V70 M77.5 40 V70 M85 40 V70" strokeWidth="1.5" />
        {/* Bank roof */}
        <path d="M62 35 L77.5 25 L93 35" strokeWidth="2" strokeLinejoin="round" />
        {/* Currency symbol pulsing */}
        <motion.text
            x="77.5"
            y="82"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            className="fill-primary"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            ₹
        </motion.text>
    </svg>
);

// 5. Licenses & Registrations - Certificate with renewal arrows
export const LicenseRegistrationDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Certificate */}
        <rect x="25" y="30" width="50" height="40" rx="3" />
        <path d="M35 40 H65 M35 50 H60 M35 60 H55" strokeWidth="1.5" />
        {/* Stamp/seal */}
        <motion.circle
            cx="65"
            cy="60"
            r="8"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.path
            d="M60 60 L63 63 L70 56"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.3, repeat: Infinity, repeatDelay: 3 }}
        />
        {/* Renewal circular arrows */}
        <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
        >
            <path
                d="M50 15 A35 35 0 0 1 85 50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 3"
            />
            <path d="M82 45 L85 50 L80 52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
    </svg>
);

// 6. Inspection Handling - Magnifying glass over checklist
export const InspectionHandlingDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Checklist document */}
        <rect x="20" y="20" width="45" height="60" rx="3" />
        <path d="M28 35 H57 M28 45 H57 M28 55 H57 M28 65 H50" strokeWidth="1.5" />
        {/* Checkmarks appearing */}
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1], scale: [0, 1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <path d="M25 32 L27 34 L30 31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25 42 L27 44 L30 41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        {/* Magnifying glass */}
        <motion.g
            animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <circle cx="65" cy="60" r="15" strokeWidth="2.5" />
            <path d="M76 71 L88 83" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        {/* Shield in magnifying glass */}
        <motion.path
            d="M65 50 L72 53 V60 C72 64 65 68 65 68 C65 68 58 64 58 60 V53 L65 50Z"
            strokeWidth="1.5"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
    </svg>
);

// 7. Vendor Audit - Network nodes with audit clipboard
export const VendorAuditDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Network connections */}
        <path d="M50 30 L30 50 M50 30 L70 50 M30 50 L50 70 M70 50 L50 70" strokeWidth="1.5" />
        {/* Network nodes */}
        <motion.circle
            cx="50"
            cy="30"
            r="8"
            strokeWidth="2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
            cx="30"
            cy="50"
            r="6"
            strokeWidth="2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
        />
        <motion.circle
            cx="70"
            cy="50"
            r="6"
            strokeWidth="2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
        />
        <motion.circle
            cx="50"
            cy="70"
            r="6"
            strokeWidth="2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, delay: 0.9, repeat: Infinity }}
        />
        {/* Audit clipboard */}
        <rect x="60" y="65" width="25" height="30" rx="2" strokeWidth="1.5" />
        <rect x="68" y="63" width="9" height="4" rx="1" strokeWidth="1.5" />
        <motion.g
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <path d="M65 73 H80 M65 78 H80 M65 83 H75" strokeWidth="1" />
        </motion.g>
    </svg>
);


// 9. Payroll Compliance - Calculator with currency and users
export const PayrollComplianceDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Calculator */}
        <rect x="30" y="20" width="40" height="60" rx="4" />
        <rect x="35" y="25" width="30" height="12" rx="2" className="fill-primary opacity-20" />
        {/* Calculator buttons */}
        <g strokeWidth="1.5">
            <circle cx="40" cy="45" r="3" />
            <circle cx="50" cy="45" r="3" />
            <circle cx="60" cy="45" r="3" />
            <circle cx="40" cy="55" r="3" />
            <circle cx="50" cy="55" r="3" />
            <circle cx="60" cy="55" r="3" />
        </g>
        {/* Currency symbols flowing */}
        <motion.g
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -20, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <text x="20" y="75" fontSize="12" className="fill-primary">₹</text>
        </motion.g>
        <motion.g
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -20, opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        >
            <text x="72" y="75" fontSize="12" className="fill-primary">₹</text>
        </motion.g>
        {/* User icons */}
        <motion.g
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <circle cx="15" cy="30" r="4" strokeWidth="1.5" />
            <path d="M10 40 Q15 35 20 40" strokeWidth="1.5" />
            <circle cx="85" cy="30" r="4" strokeWidth="1.5" />
            <path d="M80 40 Q85 35 90 40" strokeWidth="1.5" />
        </motion.g>
    </svg>
);

// 10. SS Bot (UAN/IP Generation) - Robot with ID card
export const SSBotDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Robot head */}
        <rect x="35" y="30" width="30" height="25" rx="3" />
        {/* Antenna */}
        <path d="M50 30 V23" strokeWidth="2" strokeLinecap="round" />
        <motion.circle
            cx="50"
            cy="20"
            r="3"
            className="fill-primary"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Eyes */}
        <motion.g
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        >
            <circle cx="43" cy="40" r="3" className="fill-primary" />
            <circle cx="57" cy="40" r="3" className="fill-primary" />
        </motion.g>
        {/* Robot body */}
        <rect x="40" y="55" width="20" height="20" rx="2" />
        <path d="M45 62 H55 M45 67 H55" strokeWidth="1.5" />
        {/* Arms */}
        <path d="M40 60 L30 65 M60 60 L70 65" strokeWidth="2" strokeLinecap="round" />
        {/* ID cards being generated */}
        <motion.g
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: 20, y: 10, opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
        >
            <rect x="65" y="35" width="15" height="20" rx="2" strokeWidth="1.5" />
            <path d="M68 40 H77 M68 43 H75" strokeWidth="1" />
        </motion.g>
        <motion.g
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: -20, y: 10, opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, delay: 1, repeat: Infinity }}
        >
            <rect x="20" y="35" width="15" height="20" rx="2" strokeWidth="1.5" />
            <path d="M23 40 H32 M23 43 H30" strokeWidth="1" />
        </motion.g>
    </svg>
);

// 11. Risk Assessment - Warning triangle with gauge
export const RiskAssessmentDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Warning triangle */}
        <path d="M50 20 L85 75 H15 Z" strokeWidth="2.5" />
        <motion.path
            d="M50 35 V55"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
        />
        <circle cx="50" cy="65" r="2.5" className="fill-primary" />
        {/* Risk gauge/meter */}
        <motion.g>
            <path
                d="M30 85 Q50 70 70 85"
                strokeWidth="2"
                strokeDasharray="3 2"
            />
            {/* Gauge levels */}
            <circle cx="30" cy="85" r="2" className="fill-green-500" />
            <circle cx="50" cy="75" r="2" className="fill-yellow-500" />
            <circle cx="70" cy="85" r="2" className="fill-red-500" />
            {/* Needle */}
            <motion.g
                animate={{ rotate: [-30, 0, 30, 0, -30] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ originX: "50px", originY: "85px" }}
            >
                <path d="M50 85 L50 72" strokeWidth="2.5" strokeLinecap="round" className="stroke-accent" />
            </motion.g>
        </motion.g>
    </svg>
);

// 12. Training & Awareness - Graduation cap with knowledge flow
export const TrainingDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Graduation cap */}
        <path d="M50 30 L20 40 L50 50 L80 40 L50 30 Z" strokeWidth="2" />
        <path d="M50 50 V65" strokeWidth="2" />
        <motion.path
            d="M20 40 V50 Q20 55 50 60 Q80 55 80 50 V40"
            strokeWidth="1.5"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Tassel */}
        <motion.g
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "80px", originY: "40px" }}
        >
            <path d="M80 40 L85 45" strokeWidth="2" strokeLinecap="round" />
            <circle cx="85" cy="47" r="2" className="fill-primary" />
        </motion.g>
        {/* Lightbulb (knowledge) */}
        <motion.g
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "50px", originY: "20px" }}
        >
            <circle cx="50" cy="18" r="5" strokeWidth="1.5" />
            <path d="M48 23 H52" strokeWidth="1.5" />
        </motion.g>
        {/* People receiving knowledge */}
        <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
        >
            <circle cx="30" cy="75" r="4" strokeWidth="1.5" />
            <path d="M25 85 Q30 80 35 85" strokeWidth="1.5" />
            <circle cx="50" cy="75" r="4" strokeWidth="1.5" />
            <path d="M45 85 Q50 80 55 85" strokeWidth="1.5" />
            <circle cx="70" cy="75" r="4" strokeWidth="1.5" />
            <path d="M65 85 Q70 80 75 85" strokeWidth="1.5" />
        </motion.g>
        {/* Knowledge flowing down */}
        <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 10, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <circle cx="35" cy="60" r="1.5" className="fill-primary" />
            <circle cx="50" cy="55" r="1.5" className="fill-primary" />
            <circle cx="65" cy="60" r="1.5" className="fill-primary" />
        </motion.g>
    </svg>
);


// 14. Factory Compliance - Factory with safety symbols
export const FactoryComplianceDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Factory building */}
        <path d="M20 80 V45 L35 30 L50 45 L65 30 L80 45 V80 Z" strokeWidth="2" />
        <rect x="20" y="80" width="60" height="5" className="fill-primary opacity-20" />
        {/* Chimney smoke */}
        <motion.g
            initial={{ y: 0, opacity: 0.5 }}
            animate={{ y: -15, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <circle cx="40" cy="25" r="3" className="fill-primary opacity-30" />
            <circle cx="45" cy="20" r="4" className="fill-primary opacity-30" />
        </motion.g>
        {/* Windows */}
        <rect x="30" y="55" width="8" height="10" strokeWidth="1.5" />
        <rect x="46" y="55" width="8" height="10" strokeWidth="1.5" />
        <rect x="62" y="55" width="8" height="10" strokeWidth="1.5" />
        {/* Safety symbols */}
        <motion.g
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            {/* Safety helmet icon */}
            <circle cx="25" cy="35" r="5" strokeWidth="1.5" />
            <path d="M20 35 H30" strokeWidth="1.5" />
        </motion.g>
        <motion.g
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        >
            {/* Checkmark badge */}
            <circle cx="75" cy="35" r="5" strokeWidth="1.5" />
            <path d="M72 35 L74 37 L78 33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        {/* Compliance flow indicator */}
        <motion.g
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <path d="M50 40 Q50 50 50 60" strokeWidth="2" strokeDasharray="3 3" className="stroke-accent" />
        </motion.g>
    </svg>
);

// NEW: Employer Audit - Clipboard with audit checklist and magnifying glass
export const EmployerAuditDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Clipboard */}
        <rect x="30" y="20" width="40" height="60" rx="3" />
        <rect x="42" y="18" width="16" height="6" rx="2" strokeWidth="1.5" />
        {/* Checklist items */}
        <path d="M38 35 H62 M38 45 H62 M38 55 H62 M38 65 H58" strokeWidth="1.5" />
        {/* Checkmarks appearing sequentially */}
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1], scale: [0, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity, times: [0, 0.3, 1] }}
        >
            <path d="M35 32 L37 34 L40 31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1], scale: [0, 1, 1] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity, times: [0, 0.3, 1] }}
        >
            <path d="M35 42 L37 44 L40 41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1], scale: [0, 1, 1] }}
            transition={{ duration: 2, delay: 1, repeat: Infinity, times: [0, 0.3, 1] }}
        >
            <path d="M35 52 L37 54 L40 51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
        {/* Magnifying glass */}
        <motion.g
            animate={{ x: [0, 3, 0], y: [0, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <circle cx="70" cy="65" r="12" strokeWidth="2.5" />
            <path d="M79 74 L88 83" strokeWidth="3" strokeLinecap="round" />
            {/* Focus lines inside magnifying glass */}
            <path d="M65 65 H75 M70 60 V70" strokeWidth="1" opacity="0.5" />
        </motion.g>
    </svg>
);

// NEW: Contractor Compliance - Blueprint with construction tools
export const ContractorComplianceDoodle = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-primary" strokeWidth="1.8">
        {/* Blueprint/document */}
        <rect x="20" y="25" width="60" height="50" rx="3" strokeDasharray="5 3" />
        <motion.g
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <path d="M28 35 H72 M28 42 H65 M28 49 H70 M28 56 H60" strokeWidth="1" />
            {/* Blueprint grid */}
            <path d="M35 25 V75 M50 25 V75 M65 25 V75" strokeWidth="0.5" opacity="0.3" />
        </motion.g>
        {/* Construction tools */}
        <motion.g
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "30px", originY: "70px" }}
        >
            {/* Hammer */}
            <rect x="25" y="78" width="10" height="3" rx="1" strokeWidth="1.5" />
            <path d="M30 78 V65" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="27" y="62" width="6" height="5" rx="1" className="fill-primary opacity-30" />
        </motion.g>
        <motion.g
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            style={{ originX: "55px", originY: "70px" }}
        >
            {/* Wrench */}
            <circle cx="55" cy="78" r="3" strokeWidth="1.5" />
            <path d="M55 78 V65 L60 60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="60" cy="60" r="2.5" strokeWidth="1.5" />
        </motion.g>
        {/* Safety badge */}
        <motion.g
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
        >
            <circle cx="70" cy="70" r="8" strokeWidth="2" />
            <path d="M67 70 L69 72 L73 68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
    </svg>
);

// Main ServiceDoodle component with updated mappings
export const ServiceDoodle = ({ type }: { type: string }) => {
    switch (type) {
        case "shield": return <LaborLawComplianceDoodle />;
        case "calendar": return <ComplianceCalendarDoodle />;
        case "records": return <RecordsAutomationDoodle />;
        case "remittance": return <RemittancesDoodle />;
        case "license": return <LicenseRegistrationDoodle />;
        case "audit": return <InspectionHandlingDoodle />;
        case "vendor": return <VendorAuditDoodle />;
        case "employer_audit": return <EmployerAuditDoodle />;
        case "payroll": return <PayrollComplianceDoodle />;
        case "automation": return <SSBotDoodle />;
        case "risk": return <RiskAssessmentDoodle />;
        case "training": return <TrainingDoodle />;
        case "contractor": return <ContractorComplianceDoodle />;
        case "factory": return <FactoryComplianceDoodle />;
        default: return <LaborLawComplianceDoodle />;
    }
};
