import { NextRequest, NextResponse } from 'next/server';
import { 
  listMediaFiles, 
  ensureMediaDirectories, 
  getMediaFsPath, 
  sanitizeFileName, 
  isValidFileExtension, 
  getMediaType 
} from '../../../../../server/mediaUtils';
import fs from 'fs';
import path from 'path';

const VALID_CONTENT_TYPES = ['authors', 'providers', 'districts', 'offices', 'blog', 'common'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const VALID_MIME_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'video/mp4', 'video/webm', 'video/quicktime'
];

interface RouteParams {
  params: {
    type: string;
    slug: string;
  };
}

// GET /api/media/[type]/[slug] - List media files
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { type, slug } = params;
    
    if (!VALID_CONTENT_TYPES.includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { status: 400 }
      );
    }

    const mediaFiles = listMediaFiles(type, slug);
    
    return NextResponse.json({
      success: true,
      data: mediaFiles,
      total: mediaFiles.length
    });
  } catch (error) {
    console.error('Error listing media files:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to list media files' },
      { status: 500 }
    );
  }
}

// POST /api/media/[type]/[slug] - Upload media file
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { type, slug } = params;
    
    if (!VALID_CONTENT_TYPES.includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!VALID_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Sanitize filename
    const sanitizedName = sanitizeFileName(file.name);
    
    if (!isValidFileExtension(sanitizedName)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file extension' },
        { status: 400 }
      );
    }

    // Ensure media directory exists
    ensureMediaDirectories(type, slug);
    
    // Save file
    const filePath = getMediaFsPath(type, slug, sanitizedName);
    const buffer = Buffer.from(await file.arrayBuffer());
    
    fs.writeFileSync(filePath, buffer);
    
    const mediaType = getMediaType(sanitizedName);
    const mediaUrl = `/media/${type}/${slug}/${sanitizedName}`;
    
    return NextResponse.json({
      success: true,
      data: {
        name: sanitizedName,
        url: mediaUrl,
        type: mediaType,
        size: file.size,
        mimeType: file.type
      }
    });
  } catch (error) {
    console.error('Error uploading media file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// DELETE /api/media/[type]/[slug] - Delete media file
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { type, slug } = params;
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('file');
    
    if (!VALID_CONTENT_TYPES.includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { status: 400 }
      );
    }

    if (!fileName) {
      return NextResponse.json(
        { success: false, error: 'File name is required' },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeFileName(fileName);
    const filePath = getMediaFsPath(type, slug, sanitizedName);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }

    // Security check: ensure the file is within the expected directory
    const expectedDir = getMediaFsPath(type, slug);
    const resolvedPath = path.resolve(filePath);
    const resolvedDir = path.resolve(expectedDir);
    
    if (!resolvedPath.startsWith(resolvedDir)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file path' },
        { status: 400 }
      );
    }

    fs.unlinkSync(filePath);
    
    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting media file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}