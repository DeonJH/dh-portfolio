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
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">Let&apos;s Connect</h2>
                    <p className="text-gray-400">Find me on these platforms</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group"
                        >
                            <div className={`bg-gradient-to-br ${social.color} ${social.hoverColor} 
                                          p-6 rounded-xl shadow-lg transition-all duration-300 
                                          border border-gray-500/30 backdrop-blur-sm
                                          group-hover:shadow-2xl group-hover:border-gray-400/50`}>
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                                        <social.icon size={24} className="text-white" />
                                    </div>
                                    
                                    <h3 className="text-lg font-semibold text-white">{social.name}</h3>
                                    
                                    <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                                        <span className="text-sm font-medium">Connect</span>
                                        <ExternalLink size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Socials;