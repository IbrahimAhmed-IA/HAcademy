import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Add type declaration for __dirname
declare const __dirname: string;

const assets = {
  images: [
    {
      url: 'https://example.com/images/logo.jpg',
      path: 'images/logo.jpg'
    },
    // Add other image assets here
  ],
  videos: [
    {
      url: 'https://example.com/videos/hero-background.mp4',
      path: 'videos/hero-background.mp4'
    },
    // Add other video assets here
  ]
};

async function downloadAllAssets() {
  // Create directories
  const publicDir = join(__dirname, '../public');
  const imagesDir = join(publicDir, 'images');
  const videosDir = join(publicDir, 'videos');

  // Create directories if they don't exist
  if (!existsSync(publicDir)) {
    await mkdir(publicDir, { recursive: true });
  }
  if (!existsSync(imagesDir)) {
    await mkdir(imagesDir, { recursive: true });
  }
  if (!existsSync(videosDir)) {
    await mkdir(videosDir, { recursive: true });
  }

  // Download images
  for (const image of assets.images) {
    const response = await fetch(image.url);
    const buffer = await response.arrayBuffer();
    await writeFile(join(publicDir, image.path), Buffer.from(buffer));
    console.log(`Downloaded: ${image.path}`);
  }

  // Download videos
  for (const video of assets.videos) {
    const response = await fetch(video.url);
    const buffer = await response.arrayBuffer();
    await writeFile(join(publicDir, video.path), Buffer.from(buffer));
    console.log(`Downloaded: ${video.path}`);
  }
}

downloadAllAssets().catch(console.error); 