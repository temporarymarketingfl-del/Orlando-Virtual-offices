import fs from 'fs';
import path from 'path';

// Simple frontmatter parser using regex
function parseFrontmatter(content: string): { data: Record<string, any>, content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, markdownContent] = match;
  const data: Record<string, any> = {};
  
  // Parse YAML-like frontmatter
  const lines = frontmatter.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();
    
    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Handle arrays (simple implementation for tags, etc.)
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(item => item.trim().replace(/["']/g, ''));
    }
    
    // Handle booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    
    // Handle numbers
    if (!isNaN(Number(value)) && value !== '') {
      value = Number(value);
    }
    
    // Handle dates
    if (key.includes('At') || key.includes('Date') || key === 'publishedAt' || key === 'createdAt' || key === 'updatedAt') {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        value = date.toISOString();
      }
    }
    
    data[key] = value;
  }
  
  return { data, content: markdownContent };
}

// Basic markdown to HTML conversion (simple implementation)
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Wrap in paragraph tags
    .replace(/^(.*)$/gm, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    // Fix header paragraphs
    .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, '$1');
}

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ContentFile {
  slug: string;
  data: Record<string, any>;
  content: string;
  html: string;
}

// Read and parse a single markdown file
export function readContentFile(type: string, slug: string): ContentFile | null {
  try {
    const filePath = path.join(CONTENT_DIR, type, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(fileContent);
    const html = markdownToHtml(content);
    
    return {
      slug,
      data,
      content,
      html
    };
  } catch (error) {
    console.error(`Error reading content file ${type}/${slug}:`, error);
    return null;
  }
}

// Read all markdown files of a specific type
export function readAllContentFiles(type: string): ContentFile[] {
  try {
    const typeDir = path.join(CONTENT_DIR, type);
    
    if (!fs.existsSync(typeDir)) {
      return [];
    }
    
    const files = fs.readdirSync(typeDir);
    const contentFiles: ContentFile[] = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        const contentFile = readContentFile(type, slug);
        if (contentFile) {
          contentFiles.push(contentFile);
        }
      }
    }
    
    return contentFiles;
  } catch (error) {
    console.error(`Error reading content files for type ${type}:`, error);
    return [];
  }
}

// Get content by slug with fallback
export function getContentBySlug(type: string, slug: string): ContentFile | null {
  return readContentFile(type, slug);
}

// Get all content of a type with optional filtering
export function getAllContent(type: string, options?: {
  published?: boolean;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): ContentFile[] {
  let content = readAllContentFiles(type);
  
  // Filter published content
  if (options?.published) {
    content = content.filter(item => 
      item.data.status === 'published' || 
      item.data.isActive === true ||
      (!item.data.status && !item.data.hasOwnProperty('isActive'))
    );
  }
  
  // Sort content
  if (options?.sortBy) {
    content.sort((a, b) => {
      const aValue = a.data[options.sortBy] || '';
      const bValue = b.data[options.sortBy] || '';
      
      if (options.sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });
  }
  
  // Apply limit
  if (options?.limit) {
    content = content.slice(0, options.limit);
  }
  
  return content;
}

// Utility to ensure content directories exist
export function ensureContentDirectories() {
  const types = ['blog', 'authors', 'providers', 'districts', 'offices'];
  
  for (const type of types) {
    const dir = path.join(CONTENT_DIR, type);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

// Calculate reading time (simple estimation)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}