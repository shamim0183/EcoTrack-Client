import { NavLink } from "react-router"

export default function MyLink({ to, children, className = "", ...rest }) {
  return (
    <NavLink
      to={to}
      {...rest}
      className={({ isActive }) =>
        `${
          isActive ? "bg-primary font-semibold text-white" : "text-primary font-semibold hover:bg-primary hover:text-white"
        } ${className}`
      }
    >
      {children}
    </NavLink>
  )
}
