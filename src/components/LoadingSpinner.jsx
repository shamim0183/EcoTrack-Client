import React from "react"

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
      <div className="w-12 h-12 border-4 border-dashed rounded-full border-green-500 animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-600">
        Loading, please wait...
      </p>
    </div>
  )
}

export default LoadingSpinner
