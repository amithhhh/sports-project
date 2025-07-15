import Navbar from '@/components/Navbar'
import React from 'react'
import { geistMono, geistSans } from '../layout'

export default function RootLayout({ children }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
    </div>
  )
}

