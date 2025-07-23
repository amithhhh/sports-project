import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedInProvider from 'next-auth/providers/linkedin';
import Cookies from 'js-cookie';



export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        })

    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.id_token) {
                token.id_token = account.id_token
            }
            return token;
        },
        async session({ session, token }) {
            session.id_token = token.id_token;
            // console.log(session.id_token)
            Cookies.set("otherToken", session.id_token, {
                    expires: 7,
                    secure: true,
                    sameSite: "lax",
                  });
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }