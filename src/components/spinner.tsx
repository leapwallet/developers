import React from 'react'

type Props = {
  theme: 'light' | 'dark'
}

export const Spinner: React.FC<Props> = ({ theme }) => {
  return (
    <div
      className={`inline-flex justify-center items-center rounded-full p-1 h-6 w-6 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div className="loader">
        <svg className="circular" viewBox="25 25 50 50">
          <circle
            className={`path ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="5"
            stroke-miterlimit="10"
          />
        </svg>
      </div>
    </div>
  )
}
