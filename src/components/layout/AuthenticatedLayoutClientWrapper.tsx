'use client'

import { usePathname } from 'next/navigation'
import type { IUser } from '@/models/User'
import { AblyProvider } from '@/providers/AblyProvider'

import ChatFloaterServer from '@/components/chat/ChatFloaterServer'
import Header from '@/components/layout/Header'
import MobileBottomNav from '@/components/layout/MobileBottomNav'

interface Props {
  currentUser: IUser
  children: React.ReactNode
}

const AuthenticatedLayoutClientWrapper = ({ currentUser, children }: Props) => {
  const pathname = usePathname()
  const isMessagesRoute = pathname.startsWith('/messages')

  return (
    <AblyProvider>
      <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[rgba(110,201,247,0.15)]">
        <Header currentUser={currentUser} />
        {children}
        {!isMessagesRoute && <ChatFloaterServer currentUser={currentUser} />}
        <MobileBottomNav />
      </div>
    </AblyProvider>
  )
}

export default AuthenticatedLayoutClientWrapper
