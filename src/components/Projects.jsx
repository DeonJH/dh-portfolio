import React from "react";

function Projects() {
    const projectList = [
        {
            title: "Project 1",
            description: "A cool project using React and TailwindCSS.",
        },
        {
            title: "Project 2",
            description: "A backend API built with Python and Flask.",
        },
        {
            title: "Project 3",
            description: "A data pipeline solution using Java and AWS services.",
        },
    ];

    return (
        <section id="projects" className="text-white py-20 px-6 p-6 m-4 rounded-lg shadow-lg">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectList.map((project, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-90 border border-gray-500 rounded-lg shadow-md p-6 text-center"
                        >
                            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-400">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;