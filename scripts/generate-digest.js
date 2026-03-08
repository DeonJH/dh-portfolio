import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import RSSParser from 'rss-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env for local development (no dotenv dependency needed)
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.trim().split('=');
    if (key && val.length && !process.env[key]) {
      process.env[key] = val.join('=');
    }
  });
}

const parser = new RSSParser();

const FEEDS = [
  { name: 'TechCrunch',     url: 'https://techcrunch.com/feed/' },
  { name: 'OpenAI',         url: 'https://openai.com/blog/rss.xml' },
  { name: 'ML Mastery',     url: 'https://machinelearningmastery.com/feed/' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.blog/feed/' }
];

function post(host, pathname, body, headers) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = https.request(
      { host, path: pathname, method: 'POST', headers: { ...headers, 'Content-Length': Buffer.byteLength(payload) } },
      res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
        res.on('error', reject);
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function fetchFeed(feed) {
  try {
    const parsed = await parser.parseURL(feed.url);
    const titles = (parsed.items || []).slice(0, 10).map(item => item.title).filter(Boolean);
    console.log(`  [${feed.name}] ${titles.length} articles fetched`);
    return titles;
  } catch (err) {
    console.warn(`  [${feed.name}] Failed: ${err.message}`);
    return [];
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set. Add it to your .env file or environment.');
  }

  console.log('Fetching RSS feeds...');
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const allTitles = results.flat();
  const titles = [...new Set(allTitles)].slice(0, 40);

  if (titles.length === 0) {
    throw new Error('No articles fetched from any RSS feed.');
  }
  console.log(`Fetched ${titles.length} unique article titles.`);

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const prompt = [
    'You are a tech journalist. Given these recent articles from TechCrunch, OpenAI, ML Mastery, and StackOverflow, write a Weekly Tech News Digest.',
    '',
    'Format exactly as follows:',
    `**Weekly Tech News Digest \u2013 ${today}**`,
    '',
    '[Short intro paragraph, 1-2 sentences summarizing the week in tech]',
    '',
    '1. **Category Name**: 2-3 sentence summary of related stories.',
    '2. **Category Name**: 2-3 sentence summary of related stories.',
    '... (8 to 10 categories total)',
    '',
    '[Short closing paragraph, 1-2 sentences]',
    '',
    'Use plain text only. No markdown links. No bullet points inside categories.',
    '',
    'Articles:',
    titles.join('\n')
  ].join('\n');

  console.log('Generating digest with OpenAI GPT-4o-mini...');
  const response = await post('api.openai.com', '/v1/chat/completions', {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1200,
    temperature: 0.7
  }, {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  });

  const digest = response.choices?.[0]?.message?.content?.trim();
  if (!digest) throw new Error('No digest returned from OpenAI: ' + JSON.stringify(response));

  const output = { generated: new Date().toISOString(), digest };
  const outPath = path.resolve(__dirname, '../public/tech-news.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log('Done. Digest written to public/tech-news.json');
}

main().catch(err => { console.error(err); process.exit(1); });
