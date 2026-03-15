import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

function Projects() {
    const [expandedCards, setExpandedCards] = useState({});
    const [isLargeScreen, setIsLargeScreen] = useState(
        typeof window !== 'undefined' && window.innerWidth >= 1024
    );

    useEffect(() => {
        const mql = window.matchMedia('(min-width: 1024px)');
        const handler = (e) => setIsLargeScreen(e.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    const toggleCard = (index) => {
        setExpandedCards(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const projects = [

        {
            title: 'Automated Tech News Digest',
            description: 'The original automation behind the "Weekly Tech News" section. Built with n8n to weekly scrape RSS feeds from TechCrunch, OpenAI, ML Mastery, and StackOverflow, used GPT-4o-mini for AI summarization, saved results to Google Sheets, and displayed them via Google Sheets API. This was redesigned to reduce pipeline complexity and eliminate runtime API calls. The weekly digest now loads from a static file instead of making a API request on every visit.',
            techStack: ['n8n', 'OpenAI API', 'Google Sheets API', 'Google Cloud Platform', 'Workflow Automation'],
            image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
            badge: { label: 'Legacy', color: 'amber' },
            github: null,
            demo: null
        },
        {
            title: 'Automated Tech News Pipeline',
            description: 'The current version powering the "Weekly Tech News" section. A GitHub Actions workflow runs every Friday, scraping RSS feeds from TechCrunch, OpenAI, ML Mastery, and StackOverflow, then uses GPT-4.1-mini to generate a digest stored as a static JSON file. The React component reads the file directly and displays the news.',
            techStack: ['GitHub Actions', 'OpenAI API', 'Node.js', 'React', 'CI/CD', 'Automated Deployment'],
            image: 'https://images.pexels.com/photos/18287623/pexels-photo-18287623.jpeg?auto=compress&cs=tinysrgb&w=800',
            github: null,
            demo: null
        },
        {
            title: 'AI Powered Finance Assistant',
            description: 'AI agent built with LangChain, LangSmith to monitor and improve performance, FastAPI, and Streamlit that helps users analyze and understand their personal spending. Reads spending data from a CSV file, summarizes category totals, and answers natural language questions using GPT-3.5 Turbo. Features real time chat UI, persistent conversation memory, error handling, and clean UX.',
            techStack: ['LangChain', 'LangGraph', 'LangSmith', 'FastAPI', 'OpenAI API', 'AI Agents', 'NLP', 'Python'],
            image: 'https://deonjh.github.io/dh-portfolio/assets/finance-assistant.png',
            github: null,
            demo: null
        },
        {
            title: 'Ticket Routing System',
            description: 'Event-driven microservices system built with Spring Boot 4, Apache Kafka, and Spring AI. A ticket-service accepts support tickets via REST API and publishes events to Kafka. A ticket-routing-service consumes events, enriches tickets using LLM analysis (GPT-4.1-nano via Spring AI) for auto-classification, skill extraction, and sentiment detection, then intelligently routes tickets using sealed-interface strategy pattern with workload balancing and WGS84 geolocation. Features Kafka Streams for real-time workload analytics with interactive queries, Kafka Connect JDBC Sink for automated reporting, Avro serialization with Schema Registry for schema governance, and a Dead Letter Topic pipeline for fault tolerance. Monitored with Prometheus and Grafana dashboards tracking consumer lag, routing latency, and custom business metrics via Micrometer. Includes ML training data export pipeline for LightGBM-based routing improvement. Runs on a multi-broker KRaft cluster with performance-tuned producers/consumers. Built with JDK 25 features including sealed interfaces, records, pattern matching, and virtual threads.',
            techStack: ['JDK 25', 'Spring Boot 4', 'Spring AI', 'Apache Kafka', 'Kafka Streams', 'Kafka Connect', 'Schema Registry', 'Avro', 'PostgreSQL', 'OpenAI API', 'Prometheus', 'Grafana', 'Micrometer', 'Docker', 'Machine Learning', 'REST API', 'Event-Driven Architecture'],
            image: 'https://images.pexels.com/photos/18337612/pexels-photo-18337612.jpeg?auto=compress&cs=tinysrgb&w=800',
            badge: { label: 'In Progress', color: 'amber' },
            github: null,
            demo: null
        }
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
                        <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Here are my projects showcasing my expertise in AI, automation, data engineering and software engineering.
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
                                {project.badge && (
                                    <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full border ${
                                        project.badge.color === 'green'
                                            ? 'bg-green-500/30 text-green-300 border-green-500/50'
                                            : 'bg-amber-700/60 text-amber-200 border-amber-600/70'
                                    }`}>
                                        {project.badge.label}
                                    </span>
                                )}
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3">
                                    <span className="gradient-text">{project.title}</span>
                                </h3>
                                <p className={`text-gray-300 leading-relaxed ${!expandedCards[index] ? 'lg:line-clamp-[10]' : ''}`}>
                                    {project.description}
                                </p>

                                {(() => {
                                    const maxVisible = 10;
                                    const isExpanded = expandedCards[index];
                                    const shouldTruncate = isLargeScreen && !isExpanded;
                                    const visibleTech = shouldTruncate ? project.techStack.slice(0, maxVisible) : project.techStack;
                                    const hiddenCount = project.techStack.length - maxVisible;
                                    const needsToggle = isLargeScreen && (project.description.length > 500 || project.techStack.length > maxVisible);

                                    return (
                                        <>
                                            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                                {visibleTech.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {shouldTruncate && hiddenCount > 0 && (
                                                    <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm border border-gray-500/30">
                                                        +{hiddenCount} more
                                                    </span>
                                                )}
                                            </div>
                                            {needsToggle && (
                                                <button
                                                    onClick={() => toggleCard(index)}
                                                    className="text-green-400 hover:text-green-300 text-sm mt-3 transition-colors"
                                                >
                                                    {isExpanded ? 'See less \u25b4' : 'See more \u25b8'}
                                                </button>
                                            )}
                                        </>
                                    );
                                })()}

                                <div className="flex gap-4 mt-4">
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