import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import { PrismaAdapter } from '@/app/lib/auth/prisma-adapter'

export function buildNextAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  console.log(req, res)
  return {
    adapter: PrismaAdapter(req, res),

    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        profile(profile: GithubProfile) {
          return {
            id: profile.node_id,
            name: profile.name!,
            email: profile.email,
            avatarUrl: profile.avatar_url,
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope:
              'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            avatarUrl: profile.picture,
          }
        },
      }),
    ],
    callbacks: {
      async signIn() {
        return true
      },
      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },
    },
  }
}

// Handler para o método POST
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const response = await NextAuth(req, res, buildNextAuthOptions(req, res))
  return response
}

// Handler para o método GET (opcionalmente pode usar a mesma lógica se necessário)
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = await NextAuth(req, res, buildNextAuthOptions(req, res))
  return response
}
