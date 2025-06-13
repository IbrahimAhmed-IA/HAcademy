import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const assets = {
  images: [
    {
      url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      filename: 'healthy.jpeg'
    },
    {
      url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      filename: 'sports.jpeg'
    },
    {
      url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8',
      filename: 'loss.jpeg'
    },
    {
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
      filename: 'logo.jpg'
    }
  ],
  videos: [
    {
      url: 'https://cdn.pixabay.com/vimeo/328816539/healthy-food-21945.mp4?width=1280&hash=8c1c0c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c',
      filename: 'hero-background.mp4'
    }
  ]
};

async function downloadAsset(url: string, path: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const buffer = await response.arrayBuffer();
    await writeFile(path, Buffer.from(buffer));
    console.log(`Downloaded ${path}`);
  } catch (error) {
    console.error(`Error downloading ${path}:`, error);
  }
}

async function downloadAllAssets() {
  // Create directories
  const publicDir = join(import.meta.dir, '../public');
  const imagesDir = join(publicDir, 'images');
  const videosDir = join(publicDir, 'videos');

  await mkdir(imagesDir, { recursive: true });
  await mkdir(videosDir, { recursive: true });

  // Download images
  for (const image of assets.images) {
    const path = join(imagesDir, image.filename);
    await downloadAsset(image.url, path);
  }

  // Download videos
  for (const video of assets.videos) {
    const path = join(videosDir, video.filename);
    await downloadAsset(video.url, path);
  }
}

console.log('Starting asset download...');
await downloadAllAssets();
console.log('Asset download complete!'); 