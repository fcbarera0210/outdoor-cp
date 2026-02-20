import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import type { Adapter } from 'next-auth/adapters'

// Reduce log noise: JWT_SESSION_ERROR suele ser cookie antigua (p. ej. tras cambiar NEXTAUTH_SECRET). El usuario debe cerrar sesión o borrar cookies.
const authLogger = {
  error: (code: string, metadata: Error | { error: Error; [key: string]: unknown }) => {
    if (code === 'JWT_SESSION_ERROR') {
      console.warn('[next-auth] Sesión inválida. Borra cookies de este sitio o cierra sesión y vuelve a entrar.')
    } else {
      console.error(`[next-auth][${code}]`, metadata)
    }
  },
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
  logger: authLogger,
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user?.passwordHash) return null

        const isValid = await compare(credentials.password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub
        ;(session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
}
