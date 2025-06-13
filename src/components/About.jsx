import { motion } from 'framer-motion';
import { Code, Database, Bot, Workflow } from 'lucide-react';

function About() {
    const features = [
        {
            icon: Code,
            title: 'Software Engineering',
            description: 'Strong foundation in Java, Python, and TypeScript with enterprise-level experience'
        },
        {
            icon: Database,
            title: 'Data Engineering',
            description: 'Expertise in Apache Kafka, PostgreSQL, and building scalable data pipelines'
        },
        {
            icon: Bot,
            title: 'AI Integration',
            description: 'Building intelligent agents using OpenAI, LangChain, and modern AI frameworks'
        },
        {
            icon: Workflow,
            title: 'Automation',
            description: 'Creating efficient workflows with n8n, Airflow, and custom automation solutions'
        }
    ];

    return (
        <section id="about" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        <span className="gradient-text">About Me</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                >
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-500 
                                       p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 
                                       shadow-lg hover:shadow-2xl hover:border-green-500 backdrop-blur-sm opacity-90"
                        >
                            <feature.icon className="mx-auto mb-4 text-green-400" size={48} />
                            <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-500 
                               p-8 rounded-xl shadow-lg backdrop-blur-sm opacity-90"
                >
                                        <p className="text-lg text-gray-300 leading-relaxed">
                                        I&apos;m a passionate software engineer with 5+ years of experience, now transitioning into the exciting 
                        world of AI agents and automation. I love building systems that not only work efficiently but also 
                        learn and adapt to solve complex problems.
                    </p>
                    <br/>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        My journey started with traditional software development, but I quickly became fascinated by the potential 
                        of AI and automation. I&apos;ve spent the last two years diving deep into machine learning, data pipelines, 
                        and workflow automation tools like n8n. I believe the future lies in creating intelligent systems that 
                        can understand, learn, and act autonomously to solve business problems.
                    </p>
                    <br />
                    <p className="text-lg text-gray-300 leading-relaxed">
                        When I&apos;m not coding, you&apos;ll find me exploring the latest AI research papers, contributing to open-source 
                        projects, or building side projects that push the boundaries of what&apos;s possible with automation.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default About;