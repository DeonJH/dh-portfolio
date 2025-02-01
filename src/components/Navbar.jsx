import React from "react";

function Navbar() {

    return (
        <nav
            className={`m-4 rounded-lg text-white shadow-lg`}
        >
            <div className="justify-center max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="space-x-4">
                    <a href="#about" className="bg-gray-900 rounded-md px-4 py-2 hover:bg-green-600 border border-green-500">
                        About
                    </a>
                    <a href="#projects" className="bg-gray-900 rounded-md px-4 py-2 hover:bg-green-600 border border-green-500">
                        Projects
                    </a>
                    <a href="#contact" className="bg-gray-900 rounded-md px-4 py-2 hover:bg-green-600 border border-green-500">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;