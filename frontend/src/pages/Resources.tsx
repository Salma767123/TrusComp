import ResourcesLayout from "@/components/resources/ResourcesLayout";

import { useSEO } from "@/hooks/useSEO";

const Resources = () => {
    useSEO("resources_main");
    return <ResourcesLayout />;
};

export default Resources;
