import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/database/mongoose";
import NextAuth from "next-auth/next";
import User from "@/lib/database/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectToDatabase();
        const sessionUser = await User.findOne({ email: session.user.email });

        if (!sessionUser) {
          throw new Error("User not found");
        }

        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Fallback to returning the session without user ID
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        const user = await User.findOne({ email: profile.email });

        if (!user) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.image,
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  debug: true, // Enable debugging for more detailed error messages
});

export { handler as GET, handler as POST };
