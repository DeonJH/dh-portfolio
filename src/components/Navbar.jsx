function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 text-white py-4 px-6 z-50">
            <div className="max-w-6xl mx-auto flex justify-center items-center">
                <ul className="flex space-x-8">
                    <li><a href="#hero" className="hover:text-green-400">Home</a></li>
                    <li><a href="#about" className="hover:text-green-400">About</a></li>
                    <li><a href="#projects" className="hover:text-green-400">Projects</a></li>
                    <li><a href="#contact" className="hover:text-green-400">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;