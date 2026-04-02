import { LayoutDashboard, CheckSquare, Folder, Users, UserCheck, BarChart2, Settings, X } from "lucide-react"
import { Link } from "react-router";

const AdminDashboardSidebar = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#f8f9fa] border-r border-gray-200 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    {/* Logo & Close Button */}
                    <div className="p-6 flex items-center justify-between gap-3 basis-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0"></div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">VoteAdmin</span>
                        </div>
                        <button onClick={onClose} className="lg:hidden text-gray-500 hover:bg-gray-200 rounded p-1 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="px-4 mt-2 space-y-1">
                        <button className="flex items-center gap-3 px-3 py-2.5 bg-[#e8efff] text-blue-600 rounded-lg font-medium">
                            <LayoutDashboard size={20} />
                            Dashboard
                        </button>
                        <Link to="/pollList" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            <CheckSquare size={20} />
                            Polls
                        </Link>
                        <Link to="/adminDashboard/projectManagement" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            <Folder size={20} />
                            Projects
                        </Link>
                        <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            <Users size={20} />
                            Voters
                        </button>
                        <Link
                            to="/adminDashboard/monitor"
                            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            <UserCheck size={20} />
                            Coordinator
                        </Link>
                        {/* <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            <BarChart2 size={20} />
                            Results
                        </button> */}
                    </nav>
                </div>

                {/* Settings at bottom */}
                <div className="p-4 border-t border-gray-200">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                        <Settings size={20} />
                        Settings
                    </a>
                </div>
            </aside>
        </>
    )
}

export default AdminDashboardSidebar;
