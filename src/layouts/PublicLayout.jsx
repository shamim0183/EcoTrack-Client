import { Outlet } from "react-router";
import Container from "../components/Container"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
