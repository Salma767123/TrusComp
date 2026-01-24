import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    console.log("Token present: true");
    options.headers = {
      ...options.headers,
      "Authorization": `Bearer ${token}`
    };
  } else {
    console.log("Token present: false");
  }

  // Ensure credentials include for cookies (if still needed)
  options.credentials = "include";

  const response = await fetch(url, options);

  if (response.status === 401) {
    console.error("401 Unauthorized - Token might be invalid or missing");
    toast.error("Session expired or unauthorized. Please login again.");
    // Optional: Redirect to login
    // window.location.href = "/admin/login";
  }

  return response;
};
