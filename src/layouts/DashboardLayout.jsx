
import { Outlet } from "react-router"
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="hidden lg:block col-span-1 bg-white p-4 rounded shadow">
            <ul className="space-y-2">
              <li>
                <a href="/my-activities" className="link link-hover">
                  My Activities
                </a>
              </li>
              <li>
                <a href="/profile" className="link link-hover">
                  Profile
                </a>
              </li>
              <li>
                <a href="/challenges/add" className="link link-hover">
                  Add Challenge
                </a>
              </li>
            </ul>
          </aside>
          <main className="col-span-1 lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
