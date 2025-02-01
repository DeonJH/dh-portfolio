import React from "react";

function Contact() {
    return (
        <section id="contact" className="text-white py-20 px-6 p-6 m-4 rounded-lg shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Contact</h2>
                <div className='bg-gray-950 rounded-lg shadow-md p-6 text-center border border-green-500'>
                    <p className="mb-6">
                        If you'd like to connect or learn more about my work, feel free to
                        reach out!
                    </p>
                    <a
                        href="mailto:your-email@example.com"
                        className="px-6 py-3 bg-gray-400 rounded-md text-black hover:bg-green-600"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Contact;