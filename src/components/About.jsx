import { motion } from 'framer-motion';
import { Code, Database, Bot, Workflow } from 'lucide-react';

function About() {
    const features = [
        {
            icon: Code,
            title: 'Software Engineering',
            description: 'Java, Python, and TypeScript across enterprise systems and production workloads'
        },
        {
            icon: Database,
            title: 'Data Engineering',
            description: 'Kafka, PostgreSQL, and pipelines that move data reliably at production scale'
        },
        {
            icon: Bot,
            title: 'AI Integration',
            description: 'Agents and LLM workflows integrated into production systems with OpenAI and LangChain'
        },
        {
            icon: Workflow,
            title: 'Automation',
            description: 'n8n, Airflow, and custom orchestration for systems teams depend on daily'
        }
    ];

    return (
        <section id="about" className="py-12 md:py-20 px-4 sm:px-6">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16"
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-500 
                                       p-4 md:p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 
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
                               p-4 md:p-8 rounded-xl shadow-lg backdrop-blur-sm opacity-90"
                >
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                        My focus is software that does what it's supposed to do, then keeps doing it.
                        The stack shifts from project to project (backend services, data pipelines, AI agents, frontend apps),
                        but the discipline doesn't. Across all of it, the engineering decisions matter more than
                        any single framework. The standard is software that holds up under heavy load, stays
                        maintainable, and follows best practices.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

export default About;