import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div id="sidebar" className="sm:flex flex-col hidden gap-5 pt-5 px-2 fixed h-[calc(100vh-4.5rem)] w-0 sm:w-20 border-r border-r-transparent transition-all duration-500">
            <button className={window.location.pathname === "/" ? "relative align-middle select-none font-sans font-medium text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-full h-fit py-2 rounded-lg text-sm bg-white/10 border border-white/20 backdrop-blur-md text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]" : "relative align-middle select-none font-sans font-medium text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-full h-fit py-2 rounded-lg text-sm text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"} type="button">
                <span className="flex flex-col gap-1 items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 3s-6.186 5.34-9.643 8.232A1.041 1.041 0 0 0 2 12a1 1 0 0 0 1 1h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a1 1 0 0 0 1-1 .98.98 0 0 0-.383-.768C18.184 8.34 12 3 12 3z" />
                    </svg>
                    <p className="text-xs">Home</p>
                </span>
            </button>
            <button className="relative align-middle select-none font-sans font-medium text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-full h-fit py-2 rounded-lg text-sm text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]" type="button">
                <span className="flex flex-col gap-1 items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 48 48">
                        <path fill="currentColor" d="M24 6A18 18 0 1 1 6 24 18.1 18.1 0 0 1 24 6m0-4a22 22 0 1 0 22 22A21.9 21.9 0 0 0 24 2Z" />
                        <path fill="currentColor" d="M33.3 13.3 20 20l-6.7 13.3a1.1 1.1 0 0 0 1.4 1.4L28 28l6.7-13.3a1.1 1.1 0 0 0-1.4-1.4ZM24 26a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z" />
                    </svg>
                    <p className="text-xs">Explore</p>
                </span>
            </button>
            <button className="relative align-middle select-none font-sans font-medium text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-full h-fit py-2 rounded-lg text-sm text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]" type="button">
                <span className="flex flex-col gap-1 items-center justify-center">
                    <svg width={30} height={30} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20 19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1Zm-2 0V5H6v14h12Zm-6-6.86V7.131l4.555 3.037-1.11 1.664L14 10.87v3.63c0 1.453-1.395 2.5-3 2.5s-3-1.047-3-2.5S9.395 12 11 12c.347 0 .684.049 1 .14ZM4 7H3v10h1V7Zm16 0v10h1V7h-1Zm-9 8c.605 0 1-.297 1-.5s-.395-.5-1-.5-1 .297-1 .5.395.5 1 .5Z" />
                    </svg>
                    <p className="text-xs">Library</p>
                </span>
            </button>
        </div>
    );
};

export default Sidebar;
