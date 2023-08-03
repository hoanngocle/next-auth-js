import type { NextAuthOptions } from 'next-auth';
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                return {
                    ...profile,
                    role: profile.role ?? 'user',
                    id: profile.id.toString(),
                    image: profile.avatar_url
                };
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username:',
                    type: 'text',
                    placeholder: 'your-cool-username'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'your-cool-password'
                }
            },
            async authorize(credentials) {
                const user = {
                    id: '12',
                    name: 'Nick',
                    password: 'nextauth',
                    role: 'admin'
                };

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        }
    }
};
