import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

function Projects() {
    const projects = [

        {
            title: 'Automated Tech News Digest',
            description: 'Live automation powering the "Weekly Tech News" section of this portfolio! Built with n8n to weekly scrape RSS feeds from TechCrunch, OpenAI, ML Mastery, and StackOverflow, uses GPT-4o-mini for AI summarization, saves to Google Sheets, and dynamically displays in my portfolio via Google Sheets API integration.',
            techStack: ['n8n', 'RSS Feeds', 'Google Sheets API', 'Google Cloud Platform', 'Webhook Automation', 'Content Curation'],
            image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
            github: null,
            demo: null
        },
        {
            title: 'AI-Powered Finance Assistant',
            description: 'AI agent built with LangChain, FastAPI, and Streamlit that helps users analyze and understand their personal spending. Reads spending data from a CSV file, summarizes category totals, and answers natural language questions using GPT-3.5 Turbo. Features real-time chat UI, persistent conversation memory, error handling, and clean UX.',
            techStack: ['LangChain', 'LangGraph', 'LangSmith', 'Streamlit', 'FastAPI', 'OpenAI GPT-3.5 Turbo', 'Pandas', 'Python'],
            image: '/assets/finance-assistant.png',
            github: null,
            demo: null
        }        
        // {
        //     title: 'Real-time Analytics Pipeline',
        //     description: 'Built a scalable data pipeline processing 100K+ events per minute using Apache Kafka, Spark, and Airflow. Features real-time dashboards with Grafana and automated anomaly detection.',
        //     techStack: ['Apache Kafka', 'Apache Spark', 'Airflow', 'Grafana', 'PostgreSQL', 'Docker'],
        //     image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
        //     github: '#',
        //     demo: '#'
        // },
        // {
        //     title: 'Calendly Meeting Automation',
        //     description: 'Intelligent n8n workflow that automatically creates and sends meeting invites when appointments are scheduled via Calendly. Users can choose between Google Meet or MS Teams, with automated email confirmations and calendar integration.',
        //     techStack: ['n8n', 'Calendly API', 'Google Meet API', 'MS Teams API', 'Webhook Integration', 'Email Automation'],
        //     image: 'https://images.pexels.com/photos/4560083/pexels-photo-4560083.jpeg?auto=compress&cs=tinysrgb&w=800',
        //     github: '#',
        //     demo: '#'
        // },
        // {
        //     title: 'AI Support Agent',
        //     description: 'Developed an intelligent IT support agent using OpenAI GPT-4 and LangChain. Automatically categorizes, prioritizes, and resolves 60% of tickets without human intervention.',
        //     techStack: ['OpenAI GPT-4', 'LangChain', 'Python', 'FastAPI', 'Supabase', 'Docker'],
        //     image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        //     github: '#',
        //     demo: '#'
        // },
        // {
        //     title: 'Lead Qualification Automation',
        //     description: 'Created an end-to-end lead qualification system using n8n workflows. Integrates with CRM, email marketing, and scoring algorithms to qualify leads automatically.',
        //     techStack: ['n8n', 'TypeScript', 'Supabase', 'OpenAI API', 'Webhook APIs', 'Zapier'],
        //     image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
        //     github: '#',
        //     demo: '#'
        // },
        // {
        //     title: 'Smart Document Processor',
        //     description: 'Built an AI-powered document processing system that extracts, categorizes, and indexes documents using computer vision and NLP. Reduced manual processing time by 80%.',
        //     techStack: ['Python', 'OpenCV', 'Tesseract', 'spaCy', 'FastAPI', 'Redis', 'PostgreSQL'],
        //     image: 'https://images.pexels.com/photos/5496464/pexels-photo-5496464.jpeg?auto=compress&cs=tinysrgb&w=800',
        //     github: '#',
        //     demo: '#'
        // }
    ];

    return (
        <section id="projects" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                        <span className="gradient-text">Featured Projects</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Here are some of my recent projects showcasing my expertise in AI, automation, data engineering and software engineering.
                    </p>
                </motion.div>

                <div className={`grid gap-8 ${projects.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-500 
                                       rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 
                                       shadow-lg hover:shadow-2xl hover:border-green-500 group backdrop-blur-sm"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3">
                                    <span className="gradient-text">{project.title}</span>
                                </h3>
                                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                                    {project.techStack.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="flex gap-4">
                                    {project.github && project.github !== '#' && (
                                        <a
                                            href={project.github}
                                            className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Github size={20} />
                                            <span>Code</span>
                                        </a>
                                    )}
                                    {project.demo && project.demo !== '#' && (
                                        <a
                                            href={project.demo}
                                            className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink size={20} />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;