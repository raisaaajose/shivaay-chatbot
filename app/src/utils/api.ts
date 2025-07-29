import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.shivaay.upayan.dev";

const aiBaseURL =
  process.env.NEXT_PUBLIC_AI_API_URL || "http://ai.shivaay.upayan.dev";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

const aiInstance = axios.create({
  baseURL: aiBaseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// AI instance doesn't need authentication for now, but can be added if needed
aiInstance.interceptors.request.use((config) => {
  // Add any AI-specific headers or authentication here if needed
  return config;
});

export { baseURL, aiBaseURL };
export { aiInstance };
export default instance;
