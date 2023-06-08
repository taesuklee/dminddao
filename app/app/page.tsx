'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Image from 'next/image'

export default function Home() {
  const userName = useAppSelector((state) => state.authReducer.userName)
  const dispatch = useAppDispatch()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{userName}</h1>
      </div>
    </main>
  )
}
