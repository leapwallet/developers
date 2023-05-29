import React from 'react'

export const PageBanner: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 bg-indigo-300 w-full flex items-center justify-center py-1">
      {children}
    </div>
  )
}
