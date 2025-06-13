import ContactForm from './ContactForm';

function Contact() {
    return (
        <section id="contact" className="text-white py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
                <p className="text-lg mb-8">
                    I&apos;d love to hear from you! Whether you have a project in mind or just want to connect.
                </p>
                <ContactForm />
            </div>
        </section>
    );
}

export default Contact;