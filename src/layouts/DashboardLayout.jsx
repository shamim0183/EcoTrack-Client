import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import MyLink from "../components/MyLink";
import Footer from "../components/Footer";
import Container from "../components/Container";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <Container className="grow px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar always visible */}
          <aside className="col-span-1 bg-white p-4 rounded shadow">
            <ul className="space-y-2">
              <li>
                <MyLink
                  to="/my-activities"
                  className="block px-3 py-2 rounded text-primary hover:bg-primary hover:text-white"
                >
                  My Activities
                </MyLink>
              </li>
              <li>
                <MyLink
                  to="/profile"
                  className="block px-3 py-2 rounded text-primary hover:bg-primary hover:text-white"
                >
                  Profile
                </MyLink>
              </li>
              <li>
                <MyLink
                  to="/challenge/add"
                  className="block px-3 py-2 rounded text-primary hover:bg-primary hover:text-white"
                >
                  Add Challenge
                </MyLink>
              </li>
              <li>
                <MyLink
                  to="/tip/add"
                  className="block px-3 py-2 rounded text-primary hover:bg-primary hover:text-white"
                >
                  Add Tip
                </MyLink>
              </li>
              <li>
                <MyLink
                  to="/event/add"
                  className="block px-3 py-2 rounded text-primary hover:bg-primary hover:text-white"
                >
                  Add Event
                </MyLink>
              </li>
            </ul>
          </aside>

          {/* Main content */}
          <main className="col-span-1 lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
