import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
    baseURL: "http://localhost:8081",
    plugins: [ expo() ],    
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    accounts: {
        accountlinking: {
            enabled:true,
            trutedProviders: ["github", "google","email-password"],
        },
    },
    emailAndPassword: { 
        enabled: true, 
      }, 
      socialProviders: { 
        github: { 
          clientId: process.env.GITHUB_CLIENT_ID as string, 
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            prompt: "select_account", 
        }
    },
    trustedOrigins: [
        "expoauthentication://",
        
        // Development mode - Expo's exp:// scheme with local IP ranges
        ...(process.env.NODE_ENV === "development" ? [
            "exp://",                      // Trust any host of the exp:// scheme
            "exp://**",                    // Trust all Expo URLs (wildcard matching)
            "exp://192.168.*.*:*/**",      // Trust 192.168.x.x IP range with any port and path
        ] : [])
    ]

})