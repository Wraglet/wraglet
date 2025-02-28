import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/database/user.model'
import dbConnect from '@/lib/db'
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await dbConnect()
          console.log('Connected to MongoDB')

          const user = await User.findOne({
            email: (credentials?.email as string).toLowerCase()
          }).lean()

          if (user) {
            console.log('User found:', user)
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password as string,
              user.hashedPassword
            )
            console.log('Password comparison result:', isPasswordCorrect)

            if (isPasswordCorrect) {
              return {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
              }
            }
          } else {
            console.log('User not found with email:', credentials?.email)
          }
        } catch (error) {
          console.error('Error during authorization:', error)
        }
        return null
      }
    })
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/',
    error: '/'
  }
})
