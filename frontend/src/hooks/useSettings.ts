import { useQuery } from "@tanstack/react-query";

export const useSettings = () => {
    return useQuery({
        queryKey: ['settings'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5001/api/v1/settings');
            if (!response.ok) throw new Error('Failed to fetch settings');
            return response.json();
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
};
