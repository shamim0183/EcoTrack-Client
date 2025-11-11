import { Component } from "react"
import { toast } from "react-toastify"

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("Runtime error:", error, info)
    toast.error("Something went wrong.")
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Oops!</h2>
          <p className="text-gray-600">Something broke. Please refresh.</p>
        </div>
      )
    }

    return this.props.children
  }
}
