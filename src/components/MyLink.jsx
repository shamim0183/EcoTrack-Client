import { NavLink } from "react-router"

export default function MyLink({ to, children, className = "", ...rest }) {
  return (
    <NavLink
      to={to}
      {...rest}
      className={({ isActive }) =>
        `${
          isActive ? "bg-primary text-white" : "text-primary"
        } ${className}`
      }
    >
      {children}
    </NavLink>
  )
}
