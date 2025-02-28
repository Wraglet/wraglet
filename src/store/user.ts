import { IUserDoc } from '@/database/user.model'
import { create } from 'zustand'

type UserProps = {
  user: IUserDoc | null
  setUser: (user: IUserDoc) => void
  clearUser: () => void
}

const useUserStore = create<UserProps>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}))

export default useUserStore
