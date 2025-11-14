import { NavLink } from "react-router-dom";

interface SidebarProps {
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, isOpen, setIsOpen }) => {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 w-64 bg-white shadow-md transform transition-transform md:translate-x-0 md:static z-50`}
    >
      <nav className="p-4 space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Upload
        </NavLink>
        <NavLink
          to="/dashboard/analysis"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Analysis
        </NavLink>
        <NavLink
          to="/dashboard/Reports"
          className={({ isActive }) =>
            `block px-3 py-2 rounded ${
              isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Result
        </NavLink>
        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
