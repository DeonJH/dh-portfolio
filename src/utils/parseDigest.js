// Parse the AI-generated digest text into structured sections
export function parseDigest(text) {
    const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
    let title = '', intro = '', closing = '';
    const categories = [];

    for (const para of paragraphs) {
        if (/^(\*\*)?Weekly Tech News/.test(para)) {
            title = para.replace(/\*\*/g, '').trim();
        } else if (/^\d+\.\s+/.test(para)) {
            // Match both "1. **Name**: text" and "1. Name: text"
            const match = para.match(/^\d+\.\s+\*\*(.+?)\*\*[:\s]+(.+)$/s)
                       || para.match(/^\d+\.\s+(.+?)[:–—]\s*(.+)$/s);
            if (match) categories.push({ name: match[1].trim(), body: match[2].trim() });
        } else if (!intro && categories.length === 0) {
            intro = para;
        } else {
            closing = para;
        }
    }
    return { title, intro, categories, closing };
}
