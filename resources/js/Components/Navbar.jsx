import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";

const Navbar = ({ user }) => {
    const [popMenu, setPopMenu] = useState(false);
    const [popProfil, setPopProfil] = useState(false);

    const { url } = usePage();

    const handlePopMenu = () => {
        setPopMenu(!popMenu);
    };

    const handlePopProfil = () => {
        setPopProfil(!popProfil);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post("/logout");
    };
    return (
        <div className="w-full p-4 flex justify-between items-center z-50 relative">
            <div className="w-full flex flex-col">
                <Link
                    href="/"
                    className="font-bold text-2xl hover:text-green-500 transition duration-300"
                >
                    SistemPenyiraman
                </Link>
            </div>
            <div className="w-full flex flex-col">
                <button
                    onClick={handlePopMenu}
                    className={`${
                        popMenu == false ? "" : "rotate-90"
                    } sm:hidden btn btn-circle self-end bg-transparent border-slate-500 hover:bg-green-500 hover:text-white`}
                >
                    <AiOutlineMenu size={20} />
                </button>
                <div
                    className={`${
                        popMenu == false ? "scale-0" : "scale-100"
                    } flex flex-col gap-4 p-4 absolute top-full right-4 border bg-white border-slate-300 rounded-lg transition duration-300 origin-top-right sm:scale-100 sm:static sm:flex-row sm:border-none sm:p-0 sm:self-center`}
                >
                    <Link
                        href="/"
                        className={`${
                            url == "/" ? "text-green-500" : ""
                        } hover:text-green-500 transition duration-300`}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/pengontrolan"
                        className={`${
                            url == "/pengontrolan" ? "text-green-500" : ""
                        } hover:text-green-500 transition duration-300`}
                    >
                        Pengontrolan
                    </Link>
                    <Link
                        href="/monitoring"
                        className={`${
                            url == "/monitoring" ? "text-green-500" : ""
                        } hover:text-green-500 transition duration-300`}
                    >
                        Monitoring
                    </Link>
                    <div className="sm:hidden flex flex-col bg-green-200 p-4 rounded-lg gap-4">
                        <div>
                            <h1 className="text-lg">{user.full_name}</h1>
                            <h1 className="font-bold">{user.username}</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline py-2 px-4 hover:bg-green-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full flex-col hidden sm:flex">
                <button
                    onClick={handlePopProfil}
                    className={`hidden sm:flex btn btn-circle self-end bg-transparent border-slate-500 hover:bg-green-500 hover:text-white`}
                >
                    <AiOutlineUser size={20} />
                </button>
                <div
                    className={`${
                        popProfil == false ? "scale-0" : "scale-100"
                    } flex flex-col bg-green-200 p-4 rounded-lg gap-4 transition duration-300 origin-top-right absolute top-full right-4 w-40`}
                >
                    <div>
                        <h1 className="text-lg">{user.full_name}</h1>
                        <h1 className="font-bold">{user.username}</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline py-2 px-4 hover:bg-green-500"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
