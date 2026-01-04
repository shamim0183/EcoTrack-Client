import { NavLink } from "react-router"

const MyLink = ({ to, children, className = "", ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${className} ${
          isActive
            ? "bg-eco-primary text-white font-semibold"
            : "text-gray-800 hover:bg-green-100 hover:text-eco-success font-medium"
        } px-4 py-2 rounded-lg transition-all duration-300`
      }
      {...props}
    >
      {children}
    </NavLink>
  )
}

export default MyLink
