/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface DecodedToken {
  sub: string; // user ID
  role: string;
  name: string;
  iat: number;
  exp: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!baseUrl) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not defined in environment variables",
          );
        }

        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            // Forward the actual error message from backend
            throw new Error(data.message || data.error || "Login failed");
          }

          const token = data.data?.token;
          if (!token) throw new Error("No token received from backend");

          const decoded = jwtDecode<DecodedToken>(token);

          return {
            id: decoded.sub,
            email: credentials.email,
            role: decoded.role,
            name: decoded.name,
            accessToken: token, // Map backend 'token' to 'accessToken'
          };
        } catch (error: any) {
          console.error("Authorize error:", error.message);
          // Throw the specific error so NextAuth passes it to the client
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken;
        // Also attach accessToken to top level session if needed, but standard is session.user or session.accessToken
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };