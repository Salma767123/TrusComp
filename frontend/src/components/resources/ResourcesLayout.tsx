import { useState, useEffect } from "react";
import { ResourceItem, ResourceCategory } from "@/data/resourcesData";
import CategorySidebar from "./CategorySidebar";
import ResourceContent from "./ResourceContent";
import ResourcesBlog from "./ResourcesBlog";
import ResourcesBanner from "./ResourcesBanner";
import Layout from "@/components/layout/Layout";

const ResourcesLayout = () => {
    const [activeCategory, setActiveCategory] = useState<ResourceCategory>("Acts");
    const [resources, setResources] = useState<ResourceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                // Fetch regular resources
                const resourcesResponse = await fetch('http://localhost:5001/api/v1/resources');

                // Fetch labour law updates
                const labourLawResponse = await fetch('http://localhost:5001/api/v1/labour-law-updates');

                let allResources: ResourceItem[] = [];

                // Map regular resources
                if (resourcesResponse.ok) {
                    const data = await resourcesResponse.json();
                    const mappedData: ResourceItem[] = data.map((item: any) => ({
                        id: String(item.id),
                        title: item.title,
                        description: item.description,
                        releaseDate: item.release_date,
                        effectiveDate: item.effective_date,
                        state: item.state,
                        category: item.category as ResourceCategory,
                        downloadUrl: item.download_url,
                        speaker: item.speaker_name ? {
                            name: item.speaker_name,
                            role: item.speaker_role,
                            organization: item.speaker_org,
                            image: item.speaker_image
                        } : undefined
                    }));
                    allResources = [...mappedData];
                }

                // Map labour law updates
                if (labourLawResponse.ok) {
                    const labourData = await labourLawResponse.json();

                    // Format date to DD-MM-YYYY
                    const formatDate = (dateStr: string | null) => {
                        if (!dateStr) return "N/A";
                        const date = new Date(dateStr);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                    };

                    const mappedLabourData: ResourceItem[] = labourData.map((item: any) => ({
                        id: `labour-${item.id}`,
                        title: item.title,
                        description: item.description,
                        releaseDate: formatDate(item.release_date),
                        effectiveDate: formatDate(item.end_date || item.release_date),
                        state: "All India",
                        category: "Labour Law Updates" as ResourceCategory,
                        downloadUrl: "#", // Not used for Labour Law Updates
                        speaker: item.speaker_name ? {
                            name: item.speaker_name,
                            role: item.speaker_role,
                            organization: item.speaker_org,
                            image: item.speaker_image
                        } : undefined
                    }));
                    allResources = [...allResources, ...mappedLabourData];
                }

                setResources(allResources);
            } catch (err) {
                console.error("Failed to fetch resources:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    // Auto-scroll to content on mobile when category changes
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1024) {
                const contentPanel = document.getElementById("resource-content-panel");
                if (contentPanel) {
                    const yOffset = -80;
                    const y = contentPanel.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        };

        handleScroll();
    }, [activeCategory]);

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen pb-20">
                <ResourcesBanner />

                <div className="container mx-auto px-4 -mt-px pt-12">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="lg:sticky lg:top-24 z-10">
                            <CategorySidebar
                                activeCategory={activeCategory}
                                onSelectCategory={setActiveCategory}
                            />
                        </div>

                        <div id="resource-content-panel" className="flex-1 min-w-0">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-gray-400 font-medium animate-pulse">Synchronizing Resources...</p>
                                </div>
                            ) : (
                                <ResourceContent
                                    category={activeCategory}
                                    data={resources}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Blog Section (Below Categories) */}
                <div className="container mx-auto px-4 mt-24 pt-16 border-t border-gray-200">
                    <ResourcesBlog />
                </div>
            </div>
        </Layout>
    );
};

export default ResourcesLayout;
