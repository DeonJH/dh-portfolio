import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Socials = () => {
    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://linkedin.com/in/deon-hill',
            color: 'from-blue-600 to-blue-700',
            hoverColor: 'hover:from-blue-500 hover:to-blue-600',
            description: 'Connect with me professionally'
        },
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/DeonJH',
            color: 'from-gray-700 to-gray-800',
            hoverColor: 'hover:from-gray-600 hover:to-gray-700',
            description: 'Check out my code repositories'
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:Deonjh12@gmail.com',
            color: 'from-green-600 to-emerald-700',
            hoverColor: 'hover:from-green-500 hover:to-emerald-600',
            description: 'Get in touch directly'
        }
    ];

    return (
        <section id="socials" className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        <span className="gradient-text">Let&apos;s Connect</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">Ready to collaborate? Reach out through any of these channels.</p>
                </motion.div>

                <div className="flex justify-center items-center gap-8 flex-wrap">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="group"
                        >
                            <div className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 border border-gray-600 
                                          rounded-full hover:border-gray-500 transition-all duration-300 
                                          backdrop-blur-sm hover:bg-gray-700/50">
                                <social.icon size={20} className={`${
                                    social.name === 'LinkedIn' ? 'text-blue-400' :
                                    social.name === 'GitHub' ? 'text-gray-300' :
                                    'text-green-400'
                                }`} />
                                <span className="text-gray-200 font-medium">{social.name}</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Socials;