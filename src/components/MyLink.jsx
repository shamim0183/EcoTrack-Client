import { NavLink } from "react-router"

const MyLink = ({ to, children, className = "", ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${className} ${
          isActive
            ? "relative text-eco-primary font-semibold bg-eco-primary/10 border-b-2 border-eco-primary"
            : "text-gray-700 hover:text-eco-primary hover:bg-gray-100/50"
        } px-4 py-2 rounded-t-lg transition-all duration-300`
      }
      {...props}
    >
      {children}
    </NavLink>
  )
}

export default MyLink
