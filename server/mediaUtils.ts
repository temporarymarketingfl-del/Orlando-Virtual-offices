import fs from 'fs';
import path from 'path';

// Media directory configuration
const MEDIA_DIR = path.join(process.cwd(), 'public/media');
const VALID_CONTENT_TYPES = ['authors', 'providers', 'districts', 'offices', 'blog', 'common'];

// Valid image and video extensions
const VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const VALID_VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi'];
const VALID_EXTENSIONS = [...VALID_IMAGE_EXTENSIONS, ...VALID_VIDEO_EXTENSIONS];

export interface MediaFile {
  name: string;
  path: string;
  url: string;
  type: 'image' | 'video' | 'other';
  size: number;
  mimeType?: string;
}

/**
 * Resolve a relative media path to an absolute URL
 * @param contentType - The content type (authors, providers, etc.)
 * @param slug - The content item slug
 * @param relativePath - The relative path from markdown (e.g., "./logo.png")
 * @returns Absolute URL path
 */
export function resolveMediaPath(contentType: string, slug: string, relativePath: string): string {
  if (!VALID_CONTENT_TYPES.includes(contentType)) {
    throw new Error(`Invalid content type: ${contentType}`);
  }

  // Handle absolute paths (legacy support)
  if (relativePath.startsWith('/')) {
    return relativePath;
  }

  // Remove leading "./" from relative paths
  const cleanPath = relativePath.replace(/^\.\//, '');
  
  return `/media/${contentType}/${slug}/${cleanPath}`;
}

/**
 * Get the file system path for media content
 * @param contentType - The content type
 * @param slug - The content item slug
 * @param fileName - Optional file name
 * @returns File system path
 */
export function getMediaFsPath(contentType: string, slug: string, fileName?: string): string {
  const basePath = path.join(MEDIA_DIR, contentType, slug);
  return fileName ? path.join(basePath, fileName) : basePath;
}

/**
 * Ensure media directories exist for a content item
 * @param contentType - The content type
 * @param slug - The content item slug
 */
export function ensureMediaDirectories(contentType: string, slug: string): void {
  const mediaPath = getMediaFsPath(contentType, slug);
  
  if (!fs.existsSync(mediaPath)) {
    fs.mkdirSync(mediaPath, { recursive: true });
  }
}

/**
 * List all media files for a content item
 * @param contentType - The content type
 * @param slug - The content item slug
 * @returns Array of media files
 */
export function listMediaFiles(contentType: string, slug: string): MediaFile[] {
  const mediaPath = getMediaFsPath(contentType, slug);
  
  if (!fs.existsSync(mediaPath)) {
    return [];
  }

  const files = fs.readdirSync(mediaPath);
  
  return files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return VALID_EXTENSIONS.includes(ext);
    })
    .map(file => {
      const filePath = path.join(mediaPath, file);
      const stats = fs.statSync(filePath);
      const ext = path.extname(file).toLowerCase();
      
      let type: 'image' | 'video' | 'other' = 'other';
      if (VALID_IMAGE_EXTENSIONS.includes(ext)) {
        type = 'image';
      } else if (VALID_VIDEO_EXTENSIONS.includes(ext)) {
        type = 'video';
      }

      return {
        name: file,
        path: filePath,
        url: resolveMediaPath(contentType, slug, `./${file}`),
        type,
        size: stats.size
      };
    });
}

/**
 * Get media type from file extension
 * @param fileName - The file name
 * @returns Media type
 */
export function getMediaType(fileName: string): 'image' | 'video' | 'other' {
  const ext = path.extname(fileName).toLowerCase();
  
  if (VALID_IMAGE_EXTENSIONS.includes(ext)) {
    return 'image';
  } else if (VALID_VIDEO_EXTENSIONS.includes(ext)) {
    return 'video';
  }
  
  return 'other';
}

/**
 * Validate file name for security
 * @param fileName - The file name to validate
 * @returns Sanitized file name
 */
export function sanitizeFileName(fileName: string): string {
  // Remove path traversal attempts and dangerous characters
  return fileName
    .replace(/[\/\\]/g, '') // Remove path separators
    .replace(/[^a-zA-Z0-9.-_]/g, '_') // Replace special chars with underscore
    .replace(/_{2,}/g, '_') // Collapse multiple underscores
    .toLowerCase();
}

/**
 * Check if file extension is valid
 * @param fileName - The file name
 * @returns True if valid extension
 */
export function isValidFileExtension(fileName: string): boolean {
  const ext = path.extname(fileName).toLowerCase();
  return VALID_EXTENSIONS.includes(ext);
}

/**
 * Parse media references from frontmatter and resolve paths
 * @param data - Frontmatter data object
 * @param contentType - The content type
 * @param slug - The content item slug
 * @returns Updated data object with resolved media paths
 */
export function resolveMediaReferences(data: Record<string, any>, contentType: string, slug: string): Record<string, any> {
  const resolved = { ...data };

  // Helper function to resolve a single media reference
  const resolveReference = (value: any): any => {
    if (typeof value === 'string' && value.startsWith('./')) {
      return resolveMediaPath(contentType, slug, value);
    }
    
    if (typeof value === 'object' && value !== null) {
      if (value.path && typeof value.path === 'string' && value.path.startsWith('./')) {
        return {
          ...value,
          path: resolveMediaPath(contentType, slug, value.path)
        };
      }
      
      // Recursively resolve nested objects
      const resolvedObj: Record<string, any> = {};
      for (const [key, val] of Object.entries(value)) {
        resolvedObj[key] = resolveReference(val);
      }
      return resolvedObj;
    }
    
    if (Array.isArray(value)) {
      return value.map(resolveReference);
    }
    
    return value;
  };

  // Common media fields to resolve
  const mediaFields = ['avatar', 'logo', 'featuredImage', 'cover', 'images', 'gallery', 'poster'];
  
  for (const field of mediaFields) {
    if (resolved[field]) {
      resolved[field] = resolveReference(resolved[field]);
    }
  }

  return resolved;
}