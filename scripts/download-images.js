const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
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
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, '../public/images', filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename);
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  // Create images directory if it doesn't exist
  const imagesDir = path.join(__dirname, '../public/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Download all images
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error);
    }
  }
};

downloadAllImages(); 