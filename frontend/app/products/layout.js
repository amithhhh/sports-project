import React from 'react'
import { geistMono, geistSans } from '../layout'
import Productsnavbar from '@/components/ProductsNavbar'

export default function RootLayout({ children }) {
  return (
    <div>
        <Productsnavbar />
        {children}
    </div>
  )
}

