import fs from 'fs';
import path from 'path';
import { resolveMediaReferences, resolveMediaPath } from './mediaUtils';

// Simple but robust frontmatter parser
function parseFrontmatter(content: string): { data: Record<string, any>, content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, markdownContent] = match;
  
  try {
    // Simple line-by-line parsing
    const data: Record<string, any> = {};
    const lines = frontmatter.split('\n');
    let currentKey = '';
    let currentObject: any = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;
      
      const indentLevel = line.length - line.trimStart().length;
      
      // Handle nested objects (simple 2-level support)
      if (indentLevel > 0 && currentObject) {
        const colonIndex = trimmedLine.indexOf(':');
        if (colonIndex !== -1) {
          const key = trimmedLine.substring(0, colonIndex).trim();
          const value = trimmedLine.substring(colonIndex + 1).trim();
          currentObject[key] = parseSimpleValue(value);
        }
        continue;
      }
      
      // Handle top-level properties
      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = trimmedLine.substring(0, colonIndex).trim();
      const value = trimmedLine.substring(colonIndex + 1).trim();
      
      // Check if this starts a nested object
      if (!value || value === '') {
        currentKey = key;
        currentObject = {};
        data[key] = currentObject;
        continue;
      }
      
      // Reset nested object tracking for new top-level key
      currentObject = null;
      data[key] = parseSimpleValue(value);
    }
    
    return { data, content: markdownContent };
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return { data: {}, content: markdownContent };
  }
}

// Helper function to parse simple values
function parseSimpleValue(value: string): any {
  if (!value) return '';
  
  const trimmedValue = value.trim();
  
  // Remove quotes
  if ((trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) || 
      (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"))) {
    return trimmedValue.slice(1, -1);
  }
  
  // Handle objects (simple JSON parsing for inline objects)
  if (trimmedValue.startsWith('{') && trimmedValue.endsWith('}')) {
    try {
      return JSON.parse(trimmedValue);
    } catch (error) {
      console.warn('Failed to parse JSON object:', trimmedValue);
      return trimmedValue;
    }
  }
  
  // Handle arrays
  if (trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) {
    const arrayContent = trimmedValue.slice(1, -1).trim();
    if (!arrayContent) return [];
    return arrayContent.split(',').map((item: string) => {
      const cleanItem = item.trim().replace(/^["']|["']$/g, '');
      return cleanItem;
    });
  }
  
  // Handle booleans
  if (trimmedValue === 'true') return true;
  if (trimmedValue === 'false') return false;
  
  // Handle numbers
  if (!isNaN(Number(trimmedValue)) && trimmedValue !== '') {
    return Number(trimmedValue);
  }
  
  // Handle dates (ISO format)
  if (trimmedValue.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
    return trimmedValue;
  }
  
  return trimmedValue;
}

// Improved markdown to HTML conversion with media support and basic sanitization
export function markdownToHtml(markdown: string, contentType?: string, slug?: string): string {
  // Remove potential script tags for basic XSS protection
  const sanitized = markdown.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  return sanitized
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    
    // Images with alt text and path resolution
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      // Resolve relative media paths if contentType and slug are provided
      if (contentType && slug && src.startsWith('./')) {
        src = resolveMediaPath(contentType, slug, src);
      }
      // Escape HTML in alt text and validate URL
      const escapedAlt = alt.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const escapedSrc = src.replace(/"/g, '&quot;');
      return `<img src="${escapedSrc}" alt="${escapedAlt}" loading="lazy" />`;
    })
    
    // Lists
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>')
    
    // Bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    
    // Code blocks (basic)
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    
    // Links with security (but not images)
    .replace(/(?<!\!)\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const escapedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const escapedUrl = url.replace(/"/g, '&quot;');
      return `<a href="${escapedUrl}" rel="noopener noreferrer">${escapedText}</a>`;
    })
    
    // Convert double newlines to paragraph breaks
    .replace(/\n\n/g, '\n\n__PARAGRAPH_BREAK__\n\n')
    
    // Wrap content in paragraphs, but avoid wrapping block elements
    .split('\n\n__PARAGRAPH_BREAK__\n\n')
    .map(section => {
      const trimmed = section.trim();
      if (!trimmed) return '';
      
      // Don't wrap block elements in paragraphs
      if (trimmed.match(/^<(?:h[1-6]|ul|ol|li|pre|code|blockquote|img)/)) {
        return trimmed;
      }
      
      // Wrap other content in paragraphs
      return `<p>${trimmed}</p>`;
    })
    .filter(section => section)
    .join('\n\n')
    
    // Clean up any remaining malformed structures
    .replace(/<p>\s*(<(?:h[1-6]|ul|ol|pre|blockquote|img)[\s\S]*?<\/(?:h[1-6]|ul|ol|pre|blockquote)>|<img[^>]*>)\s*<\/p>/g, '$1');
}

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), 'content');

// In-memory storage for view counts (in production, use a database)
const viewCounts = new Map<string, number>();

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
    
    // Resolve media references in frontmatter
    const resolvedData = resolveMediaReferences(data, type, slug);
    
    // Generate HTML with media path resolution
    const html = markdownToHtml(content, type, slug);
    
    return {
      slug,
      data: resolvedData,
      content,
      html
    };
  } catch (error) {
    console.error(`Error reading content file ${type}/${slug}:`, error);
    return null;
  }
}

// Read all markdown files of a specific type, excluding templates and drafts
export function readAllContentFiles(type: string): ContentFile[] {
  try {
    const typeDir = path.join(CONTENT_DIR, type);
    
    if (!fs.existsSync(typeDir)) {
      console.log(`Directory does not exist: ${typeDir}`);
      return [];
    }
    
    const files = fs.readdirSync(typeDir);
    const contentFiles: ContentFile[] = [];
    
    for (const file of files) {
      // Skip template files (starting with _) and non-markdown files
      if (file.endsWith('.md') && !file.startsWith('_')) {
        const slug = file.replace('.md', '');
        const contentFile = readContentFile(type, slug);
        if (contentFile) {
          // Skip draft content unless explicitly included
          if (contentFile.data.status === 'draft' && contentFile.data.includeDrafts !== true) {
            continue;
          }
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
      item.data.status === 'active' ||
      item.data.isActive === true ||
      (!item.data.status && !item.data.hasOwnProperty('isActive'))
    );
  }
  
  // Sort content
  if (options?.sortBy) {
    const sortBy = options.sortBy;
    content.sort((a, b) => {
      const aValue = a.data[sortBy] || '';
      const bValue = b.data[sortBy] || '';
      
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

// View count management
export function getViewCount(type: string, slug: string): number {
  const key = `${type}:${slug}`;
  return viewCounts.get(key) || 0;
}

export function incrementViewCount(type: string, slug: string): number {
  const key = `${type}:${slug}`;
  const currentCount = viewCounts.get(key) || 0;
  const newCount = currentCount + 1;
  viewCounts.set(key, newCount);
  return newCount;
}