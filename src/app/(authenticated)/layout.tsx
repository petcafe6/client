import React, { FC } from 'react'
import { Metadata } from "next"


import { Footer, Header } from './(components)/header-footer'

export interface AppLayoutProps {
  children?: any
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {

  return (
    <div className="flex flex-col min-h-screen  bg-gray-50 dark:bg-[#000] overflow11-hidden">
      <Header />

      <div className="flex-grow pb-16 md:pb-0 max-w-full overflow-hidden">
        <div className="max-w-2xl py-0 mx-4 md:mx-auto my-2 ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )

}

export default AppLayout