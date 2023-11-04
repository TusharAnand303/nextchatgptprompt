import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDb } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SEC,
        })
    ],
    callbacks:{
        async session({ session }) {
            try {
                const maxRetries = 3;
                let retryCount = 0;
                let session_user;
        
                while (retryCount < maxRetries) {
                    try {
                        session_user = await User.findOne({
                            email: session.user.email
                        }).exec();
        
                        if (session_user) {
                            break;
                        }
                    } catch (error) {
                        console.log(error)
                    }
        
                    // Retry after a delay (adjust the delay as needed)
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    retryCount++;
                }
        
                if (!session_user) {
                    // Handle the case where the user was not found after retries
                }
        
                session.user.id = session_user._id.toString();
                return session;
            } catch (error) {
                console.error("Session error:", error);
                throw error;
            }
        },
        
        async signIn({ profile }) {
            try {
                await connectToDb();
                const userExists = await User.findOne({
                    email: profile.email
                });
        
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
        
                return true;
            } catch (error) {
                console.error("Sign-in error:", error);
                throw error; // Rethrow the error to get more details.
            }
        }
    }
    
})

export {handler as GET, handler as POST};