const https = require('https');
const fs = require('fs');
const path = require('path');

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
      url: 'https://assets.mixkit.co/videos/preview/mixkit-healthy-food-background-1728-large.mp4',
      filename: 'hero-background.mp4'
    }
  ]
};

function downloadAsset(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath);
      reject(err);
    });
  });
}

async function downloadAllAssets() {
  // Create directories
  const publicDir = path.join(__dirname, '../public');
  const imagesDir = path.join(publicDir, 'images');
  const videosDir = path.join(publicDir, 'videos');

  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(videosDir, { recursive: true });

  // Download images
  for (const image of assets.images) {
    const filepath = path.join(imagesDir, image.filename);
    try {
      await downloadAsset(image.url, filepath);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error);
    }
  }

  // Download videos
  for (const video of assets.videos) {
    const filepath = path.join(videosDir, video.filename);
    try {
      await downloadAsset(video.url, filepath);
    } catch (error) {
      console.error(`Error downloading ${video.filename}:`, error);
    }
  }
}

console.log('Starting asset download...');
downloadAllAssets().then(() => {
  console.log('Asset download complete!');
}).catch(error => {
  console.error('Error during asset download:', error);
}); 