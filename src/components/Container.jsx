export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-screen-2xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  )
}
