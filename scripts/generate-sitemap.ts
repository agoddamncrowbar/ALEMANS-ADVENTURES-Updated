import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = 'https://www.alemansadventures.com'; // Replace with your domain
const TODAY = new Date().toISOString().split('T')[0];

// Types
interface StaticPage {
  url: string;
  priority: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

interface Destination {
  slug: string;
  name: string;
  priority?: string;
  changefreq?: string;
}

// Static pages with SEO priorities
const staticPages: StaticPage[] = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/destinations', priority: '0.9', changefreq: 'weekly' },
  { url: '/safaris', priority: '0.9', changefreq: 'weekly' },
  { url: '/journals', priority: '0.7', changefreq: 'weekly' },
  { url: '/reviews', priority: '0.7', changefreq: 'weekly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' },
  { url: '/booking', priority: '0.5', changefreq: 'monthly' },
];

// Destinations
const destinations: Destination[] = [
  { slug: 'kenya', name: 'Kenya', priority: '0.9', changefreq: 'weekly' },
  { slug: 'tanzania', name: 'Tanzania', priority: '0.9', changefreq: 'weekly' },
  { slug: 'uganda', name: 'Uganda', priority: '0.8', changefreq: 'weekly' },
  { slug: 'rwanda', name: 'Rwanda', priority: '0.8', changefreq: 'weekly' },
  { slug: 'zanzibar', name: 'Zanzibar', priority: '0.8', changefreq: 'weekly' },
];

// Function to fetch dynamic data from your API
async function fetchDynamicData() {
  try {
    // Fetch footer links (documents)
    const footerRes = await fetch(`${process.env.VITE_API_BASE_URL || 'http://localhost:3000'}/adminUploads/links.php`);
    const footerData = await footerRes.json();
    const footerLinks = footerData.footer_links || {};

    // Fetch safaris
    const safarisRes = await fetch(`${process.env.VITE_API_BASE_URL || 'http://localhost:3000'}/safaris.php`);
    const safarisData = await safarisRes.json();
    const safaris = safarisData.safaris || [];

    // Fetch journals
    const journalsRes = await fetch(`${process.env.VITE_API_BASE_URL || 'http://localhost:3000'}/journals.php`);
    const journalsData = await journalsRes.json();
    const journals = journalsData.journals || [];

    return { footerLinks, safaris, journals };
  } catch (error) {
    console.warn('⚠️ Failed to fetch dynamic data for sitemap:', error);
    return { footerLinks: {}, safaris: [], journals: [] };
  }
}

// Generate the sitemap XML
function generateSitemap(
  staticPages: StaticPage[],
  destinations: Destination[],
  footerLinks: Record<string, string[]>,
  safaris: Array<{ slug: string; updated_at?: string }>,
  journals: Array<{ id: number; created_at?: string }>
): string {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add destination pages
  destinations.forEach(dest => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/destinations/${dest.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${dest.changefreq || 'weekly'}</changefreq>
    <priority>${dest.priority || '0.8'}</priority>
  </url>`;
  });

  // Add safari pages
  safaris.forEach(safari => {
    const lastmod = safari.updated_at ? safari.updated_at.split('T')[0] : TODAY;
    sitemap += `
  <url>
    <loc>${BASE_URL}/safaris/${safari.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Add journal pages
  journals.forEach(journal => {
    const lastmod = journal.created_at ? journal.created_at.split('T')[0] : TODAY;
    sitemap += `
  <url>
    <loc>${BASE_URL}/journals/${journal.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  // Add dynamic document pages from footer links
  Object.entries(footerLinks).forEach(([footerName, sections]) => {
    sections.forEach((section: string) => {
      const encodedSection = encodeURIComponent(section);
      const encodedFooterName = encodeURIComponent(footerName);
      sitemap += `
  <url>
    <loc>${BASE_URL}/${encodedSection}/${encodedFooterName}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
    });
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Generate robots.txt
function generateRobotsTxt(): string {
  return `# robots.txt for Alemans Adventures
# Generated at: ${new Date().toISOString()}

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /api/
Disallow: /private/

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl delay (optional)
# Crawl-delay: 1

# Host
Host: ${BASE_URL}

# Block AI bots if desired (uncomment if needed)
# User-agent: GPTBot
# Disallow: /
# 
# User-agent: CCBot
# Disallow: /
# 
# User-agent: Google-Extended
# Disallow: /
`;
}

// Main function
async function main() {
  console.log('🚀 Generating sitemap and robots.txt...');
  
  // Fetch dynamic data
  const { footerLinks, safaris, journals } = await fetchDynamicData();
  
  // Generate sitemap
  const sitemap = generateSitemap(staticPages, destinations, footerLinks, safaris, journals);
  
  // Generate robots.txt
  const robotsTxt = generateRobotsTxt();
  
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write files
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');
  
  fs.writeFileSync(sitemapPath, sitemap);
  fs.writeFileSync(robotsPath, robotsTxt);
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📁 Location: ${sitemapPath}`);
  console.log(`📁 Location: ${robotsPath}`);
  console.log(`📊 Total URLs: ${sitemap.split('<url>').length - 1}`);
  
  // Log stats
  console.log('\n📊 Sitemap Statistics:');
  console.log(`  - Static pages: ${staticPages.length}`);
  console.log(`  - Destinations: ${destinations.length}`);
  console.log(`  - Safaris: ${safaris.length}`);
  console.log(`  - Journals: ${journals.length}`);
  console.log(`  - Documents: ${Object.values(footerLinks).flat().length}`);
}

// Run the script
main().catch(console.error);