
export const validateName = (name: string): string | null => {
    if (!name.trim()) return "Full Name is required";
    if (name.trim().length < 2) return "Name is too short";
    return null;
};

export const validateEmail = (email: string): string | null => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";
    return null;
};

export const validatePhone = (phone: string): string | null => {
    if (!phone.trim()) return "Phone number is required";

    // Remove all spaces for checking
    const cleanPhone = phone.replace(/\s/g, '');

    // Allow only digits and optional leading +
    const phoneRegex = /^\+?[0-9]+$/;
    if (!phoneRegex.test(cleanPhone)) return "Phone must contain numbers only";

    // Indian phone number logic
    // Check for +91 prefix or just 10 digit number starting with 6-9 usually, but strict req says:
    // "Example: +91 -> exactly 10 digits" (after code)
    // "Prevent submission if length does not match"

    // Logic: 
    // If starts with +91, expect 13 chars total (+91 + 10 digits)
    if (cleanPhone.startsWith('+91')) {
        if (cleanPhone.length !== 13) return "Indian numbers must be 10 digits after +91";
    }
    // If starts with 91 and length is 12 (assuming they typed 91 without +)
    else if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
        if (cleanPhone.length !== 12) return "Indian numbers must be 10 digits after 91";
    }
    // General length check for non-Indian or standard numbers
    else {
        if (cleanPhone.length < 10) return "Phone number is too short (min 10 digits)";
        if (cleanPhone.length > 15) return "Phone number is too long (max 15 digits)";
    }

    return null;
};

export const validateService = (service: string): string | null => {
    if (!service || service === "") return "Please select a service";
    return null;
};

export const validateMessage = (message: string): string | null => {
    // Optional field usually, but if req says "Message / Compliance" - let's see requirements.
    // Req says: "Message / Compliance." under Required Fields list? 
    // "Required Fields: ... Message / Compliance."
    // So it is required.
    if (!message.trim()) return "Message is required";
    return null;
};
