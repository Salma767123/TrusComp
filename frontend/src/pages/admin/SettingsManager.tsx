import React, { useState, useEffect } from "react";
import {
    Save,
    Mail,
    Phone,
    MapPin,
    Upload,
    Shield,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Linkedin,
    Facebook,
    Instagram,
    Twitter,
    Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const SettingsManager = () => {
    // Tab State
    const [activeTab, setActiveTab] = useState("general"); // 'general' | 'email'

    // Form State
    const [settings, setSettings] = useState<any>({});
    const [initialEmail, setInitialEmail] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTestingEmail, setIsTestingEmail] = useState(false);
    const [showEmailChangeModal, setShowEmailChangeModal] = useState(false);

    // Test Email Configuration State
    const [testEmailRecipient, setTestEmailRecipient] = useState("");
    const [testEmailMessage, setTestEmailMessage] = useState("");
    const [testEmailErrors, setTestEmailErrors] = useState<{ recipient: string | null; message: string | null }>({
        recipient: null,
        message: null
    });

    // Initial Load
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/settings`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                // Normalize data structure if needed, or just use as key-value map
                setSettings(data);
                setInitialEmail(data.admin_account_email || "");
            }
        } catch (err) {
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    // Generic Update Handler (for flat or nested updates)
    const updateSetting = (key: string, value: any) => {
        setSettings((prev: any) => ({
            ...prev,
            [key]: value
        }));
    };

    // Deep update for nested objects (like address)
    const updateNestedSetting = (parentKey: string, childKey: string, value: any) => {
        setSettings((prev: any) => ({
            ...prev,
            [parentKey]: {
                ...(prev[parentKey] || {}),
                [childKey]: value
            }
        }));
    };

    // File Upload Handler
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, settingKey: string) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validation: Image format
        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            toast.loading("Uploading...");
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                updateSetting(settingKey, data.url);
                toast.dismiss();
                toast.success("Image uploaded successfully");
            } else {
                toast.dismiss();
                toast.error("Upload failed");
            }
        } catch (err) {
            toast.dismiss();
            toast.error("Upload error");
        }
    };

    // Verify Email Change
    const handleConfirmEmailChange = async () => {
        setIsSaving(true);
        setShowEmailChangeModal(false);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/auth/initiate-email-change`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newEmail: settings.admin_account_email }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Verification email sent to new address");
                // Revert the email field in the main settings to the initial email until verified
                setSettings((prev: any) => ({ ...prev, admin_account_email: initialEmail }));
                // Save other settings
                handleSaveInternal(true);
            } else {
                toast.error(data.message || "Failed to initiate email change");
                setIsSaving(false);
            }
        } catch (err) {
            toast.error("Connection error");
            setIsSaving(false);
        }
    };

    // Save All Settings
    const handleSave = async () => {
        // If on General tab, check for email change
        if (activeTab === 'general' && settings.admin_account_email && settings.admin_account_email !== initialEmail) {
            setShowEmailChangeModal(true);
            return;
        }

        handleSaveInternal(false);
    };

    const handleSaveInternal = async (skipEmailCheck: boolean) => {
        setIsSaving(true);
        try {
            let payloadSettings = { ...settings };

            // Filter payload based on active tab
            if (activeTab === 'general') {
                // Keep only general settings keys
                const generalKeys = [
                    'admin_account_email',
                    'contact_phone',
                    'contact_email',
                    'office_address',
                    'social_links',
                    'website_logo',
                    'dashboard_logo',
                    'favicon'
                ];

                // If skipping email check (email change initiated), use initial email
                if (skipEmailCheck) {
                    payloadSettings.admin_account_email = initialEmail;
                }

                // Create new object with only general keys
                const filteredSettings: any = {};
                generalKeys.forEach(key => {
                    if (payloadSettings[key] !== undefined) {
                        filteredSettings[key] = payloadSettings[key];
                    }
                });
                payloadSettings = filteredSettings;

            } else if (activeTab === 'email') {
                // Keep only email settings keys
                const emailKeys = ['smtp_config'];
                const filteredSettings: any = {};
                emailKeys.forEach(key => {
                    if (payloadSettings[key] !== undefined) {
                        filteredSettings[key] = payloadSettings[key];
                    }
                });
                payloadSettings = filteredSettings;
            }

            // Convert simple object to array of { key, value } for batch update
            const settingsArray = Object.entries(payloadSettings).map(([key, value]) => ({ key, value }));

            if (settingsArray.length === 0) {
                toast.info("No changes to save for this tab");
                setIsSaving(false);
                return;
            }

            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/settings/batch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings: settingsArray }),
                credentials: 'include'
            });

            if (response.ok) {
                toast.success(`${activeTab === 'email' ? 'Email configuration' : 'Settings'} saved successfully`);
            } else {
                const data = await response.json();
                console.error("Save failed:", data);
                toast.error(data.message || `Failed to save settings: ${data.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error("Save connection error:", err);
            toast.error("Connection error. Please check server logs.");
        } finally {
            setIsSaving(false);
        }
    };

    // Validate email format
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Test SMTP Configuration
    const handleTestEmail = async () => {
        const smtpConfig = settings.smtp_config || {};

        // Validate SMTP settings
        if (!smtpConfig.host || !smtpConfig.email || !smtpConfig.password) {
            toast.error("Please fill in SMTP Host, Email and Password");
            return;
        }

        // Validate test email fields
        const recipientError = !testEmailRecipient
            ? "Recipient email is required"
            : !isValidEmail(testEmailRecipient)
                ? "Please enter a valid email address"
                : null;

        const messageError = !testEmailMessage
            ? "Test message is required"
            : testEmailMessage.length < 5
                ? "Message must be at least 5 characters"
                : null;

        setTestEmailErrors({ recipient: recipientError, message: messageError });

        if (recipientError || messageError) {
            toast.error("Please fill in all test email fields correctly");
            return;
        }

        setIsTestingEmail(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/settings/test-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...smtpConfig,
                    testRecipient: testEmailRecipient,
                    testMessage: testEmailMessage
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Test email sent successfully to ${testEmailRecipient}`);
            } else {
                toast.error(data.message || "Email test failed");
            }
        } catch (err) {
            toast.error("Test connection failed. Please check your SMTP settings.");
        } finally {
            setIsTestingEmail(false);
        }
    };

    const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center text-slate-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Loading configuration...
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-300">

            {/* Header */}
            <div className="flex-none flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Settings</h1>
                    <p className="text-slate-500 text-xs mt-0.5">Manage system configuration and preferences.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-9 px-6 bg-primary text-xs font-bold uppercase tracking-wider"
                >
                    {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <Save className="w-3.5 h-3.5 mr-2" />}
                    Save Changes
                </Button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex-none border-b border-slate-200 mb-6">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={cn(
                            "pb-3 text-xs font-bold uppercase tracking-wider transition-all relative",
                            activeTab === 'general' ? "text-primary" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        General Settings
                        {activeTab === 'general' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('email')}
                        className={cn(
                            "pb-3 text-xs font-bold uppercase tracking-wider transition-all relative",
                            activeTab === 'email' ? "text-primary" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        Email Configuration
                        {activeTab === 'email' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                        )}
                    </button>
                </div>
            </div>

            {/* Scrollable Content Area */}
            {/* TAB 1: GENERAL SETTINGS */}
            {activeTab === 'general' && (
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">

                        {/* 1. Admin Account */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded w-fit uppercase tracking-wider">Admin Account</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Login Email ID <span className="text-red-500">*</span></label>
                                    <Input
                                        type="email"
                                        value={settings.admin_account_email || ''}
                                        onChange={(e) => updateSetting('admin_account_email', e.target.value)}
                                        className="h-10 text-sm font-medium border-slate-200"
                                        placeholder="admin@example.com"
                                    />
                                    <p className="text-[10px] text-slate-400">Used for system notifications and alerts.</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Contact Information */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded w-fit uppercase tracking-wider">Contact Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone Number <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            type="tel"
                                            value={settings.contact_phone || ''}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9+ ]/g, ''); // Numbers only
                                                updateSetting('contact_phone', val);
                                            }}
                                            className="h-10 pl-9 text-sm font-medium border-slate-200"
                                            placeholder="+91 99999 99999"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email ID <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            type="email"
                                            value={settings.contact_email || ''}
                                            onChange={(e) => updateSetting('contact_email', e.target.value)}
                                            className="h-10 pl-9 text-sm font-medium border-slate-200"
                                            placeholder="contact@truscomp.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Office Address */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded w-fit uppercase tracking-wider">Office Address</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Address Line 1</label>
                                    <Input
                                        value={settings.office_address?.line1 || ''}
                                        onChange={(e) => updateNestedSetting('office_address', 'line1', e.target.value)}
                                        className="h-10 text-sm font-medium border-slate-200"
                                        placeholder="Floor, Building Name"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Street / Area</label>
                                    <Input
                                        value={settings.office_address?.street || ''}
                                        onChange={(e) => updateNestedSetting('office_address', 'street', e.target.value)}
                                        className="h-10 text-sm font-medium border-slate-200"
                                        placeholder="Street Name"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">District / City</label>
                                    <Input
                                        value={settings.office_address?.city || ''}
                                        onChange={(e) => updateNestedSetting('office_address', 'city', e.target.value)}
                                        className="h-10 text-sm font-medium border-slate-200"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">State</label>
                                    <Input
                                        value={settings.office_address?.state || ''}
                                        onChange={(e) => updateNestedSetting('office_address', 'state', e.target.value)}
                                        className="h-10 text-sm font-medium border-slate-200"
                                        placeholder="State"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Country</label>
                                    <Input
                                        value={settings.office_address?.country || ''}
                                        onChange={(e) => updateNestedSetting('office_address', 'country', e.target.value)}
                                        className="h-10 text-sm font-medium border-slate-200"
                                        placeholder="Country"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pincode</label>
                                    <Input
                                        value={settings.office_address?.pincode || ''}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                            updateNestedSetting('office_address', 'pincode', val);
                                        }}
                                        className="h-10 text-sm font-medium border-slate-200"
                                        placeholder="000000"
                                        maxLength={6}
                                    />
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Preview Format</p>
                                <p className="text-sm font-medium text-slate-700">
                                    {[
                                        settings.office_address?.line1,
                                        settings.office_address?.street,
                                        settings.office_address?.city,
                                        settings.office_address?.state,
                                        settings.office_address?.country
                                    ].filter(Boolean).join(', ')}
                                    {settings.office_address?.pincode ? ` - ${settings.office_address.pincode}` : ''}
                                </p>
                            </div>
                        </div>

                        {/* 4. Social Media Links (Moved up) */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded w-fit uppercase tracking-wider">Social Media Links</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">LinkedIn URL</label>
                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            value={settings.social_links?.linkedin || ''}
                                            onChange={(e) => updateNestedSetting('social_links', 'linkedin', e.target.value)}
                                            className="h-10 pl-9 text-sm font-medium border-slate-200"
                                            placeholder="https://linkedin.com/company/..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instagram URL</label>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            value={settings.social_links?.instagram || ''}
                                            onChange={(e) => updateNestedSetting('social_links', 'instagram', e.target.value)}
                                            className="h-10 pl-9 text-sm font-medium border-slate-200"
                                            placeholder="https://instagram.com/..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Facebook URL</label>
                                    <div className="relative">
                                        <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            value={settings.social_links?.facebook || ''}
                                            onChange={(e) => updateNestedSetting('social_links', 'facebook', e.target.value)}
                                            className="h-10 pl-9 text-sm font-medium border-slate-200"
                                            placeholder="https://facebook.com/..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">X (Twitter) URL</label>
                                    <div className="relative">
                                        <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            value={settings.social_links?.twitter || ''}
                                            onChange={(e) => updateNestedSetting('social_links', 'twitter', e.target.value)}
                                            className="h-10 pl-9 text-sm font-medium border-slate-200"
                                            placeholder="https://x.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Branding Uploads (Moved down) */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded w-fit uppercase tracking-wider">Branding</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Website Logo */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Website Logo</label>
                                    <div className="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-4 bg-white">
                                        <div className="w-full h-24 bg-slate-50 rounded flex items-center justify-center overflow-hidden border border-dashed border-slate-200 relative group">
                                            {settings.website_logo ? (
                                                <img src={settings.website_logo} alt="Website Logo" className="h-full object-contain" />
                                            ) : (
                                                <span className="text-xs text-slate-400">No Image</span>
                                            )}
                                            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-xs font-bold">
                                                Change
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'website_logo')} />
                                            </label>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={() => document.getElementById('upload-web-logo')?.click()}>
                                            <Upload className="w-3 h-3 mr-2" />
                                            Upload Logo
                                        </Button>
                                        <input id="upload-web-logo" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'website_logo')} />
                                    </div>
                                </div>

                                {/* Dashboard Logo */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dashboard Logo</label>
                                    <div className="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-4 bg-white">
                                        <div className="w-full h-24 bg-slate-900 rounded flex items-center justify-center overflow-hidden border border-dashed border-slate-700 relative group">
                                            {settings.dashboard_logo ? (
                                                <img src={settings.dashboard_logo} alt="Dashboard Logo" className="h-full object-contain" />
                                            ) : (
                                                <span className="text-xs text-slate-500">No Image</span>
                                            )}
                                            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-xs font-bold">
                                                Change
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'dashboard_logo')} />
                                            </label>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={() => document.getElementById('upload-dash-logo')?.click()}>
                                            <Upload className="w-3 h-3 mr-2" />
                                            Upload Logo
                                        </Button>
                                        <input id="upload-dash-logo" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'dashboard_logo')} />
                                    </div>
                                </div>

                                {/* Favicon */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Favicon</label>
                                    <div className="border border-slate-200 rounded-lg p-4 flex flex-col items-center gap-4 bg-white">
                                        <div className="w-16 h-16 bg-slate-50 rounded flex items-center justify-center overflow-hidden border border-dashed border-slate-200 relative group">
                                            {settings.favicon ? (
                                                <img src={settings.favicon} alt="Favicon" className="w-8 h-8 object-contain" />
                                            ) : (
                                                <span className="text-xs text-slate-400">Icon</span>
                                            )}
                                            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-xs font-bold">
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'favicon')} />
                                                <Upload className="w-3 h-3" />
                                            </label>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full text-xs h-8" onClick={() => document.getElementById('upload-favicon')?.click()}>
                                            <Upload className="w-3 h-3 mr-2" />
                                            Upload Icon
                                        </Button>
                                        <input id="upload-favicon" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'favicon')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: EMAIL CONFIGURATION */}
            {activeTab === 'email' && (
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900">Security Notice</h4>
                                <p className="text-xs text-amber-700 mt-1">SMTP credentials are stored securely (encrypted) in the database. The password field below is masked for security.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SMTP Host</label>
                                <Input
                                    value={settings.smtp_config?.host || ''}
                                    onChange={(e) => updateNestedSetting('smtp_config', 'host', e.target.value)}
                                    className="h-10 text-sm font-medium border-slate-200"
                                    placeholder="smtp.provider.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SMTP Port</label>
                                <Input
                                    value={settings.smtp_config?.port || ''}
                                    onChange={(e) => updateNestedSetting('smtp_config', 'port', e.target.value)}
                                    className="h-10 text-sm font-medium border-slate-200"
                                    placeholder="587"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SMTP Email</label>
                                <Input
                                    type="email"
                                    value={settings.smtp_config?.email || ''}
                                    onChange={(e) => updateNestedSetting('smtp_config', 'email', e.target.value)}
                                    className="h-10 text-sm font-medium border-slate-200"
                                    placeholder="notifications@truscomp.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SMTP Password</label>
                                    {settings.smtp_config?.host?.includes('smtp.gmail.com') && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info className="w-3.5 h-3.5 text-amber-500 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-xs bg-slate-900 text-white border-slate-800">
                                                    <p className="text-xs">Gmail requires App Passwords for SMTP. Enable 2-Step Verification → Generate App Password → Use it here.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </div>
                                <Input
                                    type="password"
                                    value={settings.smtp_config?.password || ''}
                                    onChange={(e) => updateNestedSetting('smtp_config', 'password', e.target.value)}
                                    className="h-10 text-sm font-medium border-slate-200"
                                    placeholder="••••••••••••"
                                />
                                {settings.smtp_config?.host?.includes('smtp.gmail.com') && (
                                    <p className="text-[10px] text-amber-600 font-medium flex items-center gap-1.5 mt-1 bg-amber-50 p-1.5 rounded border border-amber-100">
                                        <AlertCircle className="w-3 h-3 shrink-0" />
                                        <span>For Gmail SMTP, use a <a href="https://support.google.com/accounts/answer/185833" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-800">16-digit App Password</a>. Normal password won't work.</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Encryption Type</label>
                            <Select
                                value={settings.smtp_config?.encryption || 'starttls'}
                                onValueChange={(val) => updateNestedSetting('smtp_config', 'encryption', val)}
                            >
                                <SelectTrigger className="h-10 w-full md:w-1/3 text-sm font-medium border-slate-200">
                                    <SelectValue placeholder="Select Encryption" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="ssl">SSL</SelectItem>
                                    <SelectItem value="tls">TLS (STARTTLS)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Test Email Configuration Section */}
                        <div className="pt-6 border-t border-slate-100 space-y-4">
                            <h3 className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded w-fit uppercase tracking-wider">Test Email Configuration</h3>
                            <p className="text-xs text-slate-500">
                                Test your SMTP configuration by sending a test email. This will not save any data.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        To Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            type="email"
                                            value={testEmailRecipient}
                                            onChange={(e) => {
                                                setTestEmailRecipient(e.target.value);
                                                if (testEmailErrors.recipient) {
                                                    setTestEmailErrors(prev => ({ ...prev, recipient: null }));
                                                }
                                            }}
                                            className={cn(
                                                "h-10 pl-9 text-sm font-medium border-slate-200",
                                                testEmailErrors.recipient && "border-red-500 focus-visible:ring-red-500"
                                            )}
                                            placeholder="Enter recipient email address"
                                        />
                                    </div>
                                    {testEmailErrors.recipient && (
                                        <p className="text-xs text-red-500 font-medium">{testEmailErrors.recipient}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    Test Message <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    value={testEmailMessage}
                                    onChange={(e) => {
                                        setTestEmailMessage(e.target.value);
                                        if (testEmailErrors.message) {
                                            setTestEmailErrors(prev => ({ ...prev, message: null }));
                                        }
                                    }}
                                    className={cn(
                                        "text-sm font-medium border-slate-200 min-h-[100px]",
                                        testEmailErrors.message && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                    placeholder="Enter test email message"
                                />
                                {testEmailErrors.message && (
                                    <p className="text-xs text-red-500 font-medium">{testEmailErrors.message}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-end pt-2">
                                <Button
                                    variant="outline"
                                    onClick={handleTestEmail}
                                    disabled={isTestingEmail}
                                    className="h-9 px-4 gap-2 text-xs font-bold uppercase tracking-wider"
                                >
                                    {isTestingEmail ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Shield className="w-3.5 h-3.5" />}
                                    Send Test Email
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AlertDialog open={showEmailChangeModal} onOpenChange={setShowEmailChangeModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>⚠️ Change Admin Login Email</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            <p>Changing the admin login email will:</p>
                            <ul className="list-disc list-inside text-sm">
                                <li>Disable login using the current email immediately after verification.</li>
                                <li>Require verification of the new email ({settings.admin_account_email}).</li>
                                <li>Require setting a new password.</li>
                            </ul>
                            <p className="font-bold text-slate-900 mt-2">
                                You will only be able to log in using the new email after verification.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowEmailChangeModal(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmEmailChange} className="bg-primary hover:bg-primary/90">
                            Proceed & Verify Email
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    );
};

export default SettingsManager;
