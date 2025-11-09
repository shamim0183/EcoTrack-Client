import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router"

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
