import axios from "axios";

import { getSession } from "next-auth/react";
// import { Cagliostro } from "next/font/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    } else {
      console.warn("No token in session");
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
