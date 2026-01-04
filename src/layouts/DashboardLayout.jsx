import { useContext } from "react"
import { Outlet } from "react-router"
import Footer from "../components/Footer"
import MyLink from "../components/MyLink"
import Navbar from "../components/Navbar"
import { AuthContext } from "../context/AuthContext"

export default function DashboardLayout() {
  const { userRole } = useContext(AuthContext)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-1 py-8">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar always visible */}
            <aside className="col-span-1">
              <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Dashboard Menu
                </h2>
                <ul className="space-y-2">
                  <li>
                    <MyLink to="/my-activities" className="block">
                      My Activities
                    </MyLink>
                  </li>
                  {/* Admin-only links */}
                  {userRole === "admin" && (
                    <>
                      <li>
                        <MyLink to="/tip/add" className="block">
                          Add Tip
                        </MyLink>
                      </li>
                      <li>
                        <MyLink to="/event/add" className="block">
                          Add Event
                        </MyLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </aside>

            {/* Main content */}
            <main className="col-span-1 lg:col-span-3">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
