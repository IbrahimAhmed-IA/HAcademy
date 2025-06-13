const https = require('https');
const fs = require('fs');
const path = require('path');

const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-healthy-food-background-1728-large.mp4';
const videoPath = path.join(__dirname, '../public/videos/hero-background.mp4');

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, '../public/videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Download video
const file = fs.createWriteStream(videoPath);
https.get(videoUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Downloaded hero background video');
  });
}).on('error', (err) => {
  fs.unlink(videoPath);
  console.error('Error downloading video:', err);
}); 