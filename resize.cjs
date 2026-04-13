const { Jimp } = require("jimp");
const fs = require("fs");
const path = require("path");

async function generateFavicons() {
  const logoPath = "C:\\Users\\medoz\\Downloads\\logo.png";
  const publicDir = path.join(__dirname, "public");
  
  if (!fs.existsSync(logoPath)) {
    console.error("Logo not found at", logoPath);
    return;
  }

  // Load the original image
  const image = await Jimp.read(logoPath);
  
  // Create a square canvas
  const size = Math.max(image.bitmap.width, image.bitmap.height);
  const squared = new Jimp({ width: size, height: size, color: 0x00000000 }); // transparent
  
  // Center the image
  const x = Math.floor((size - image.bitmap.width) / 2);
  const y = Math.floor((size - image.bitmap.height) / 2);
  squared.composite(image, x, y);

  // Define sizes
  const sizes = {
    "android-chrome-512x512.png": 512,
    "android-chrome-192x192.png": 192,
    "apple-touch-icon.png": 180,
    "favicon-64x64.png": 64,
    "favicon-48x48.png": 48,
    "favicon-32x32.png": 32,
    "favicon-16x16.png": 16,
  };

  // Generate and save each size
  for (const [filename, dim] of Object.entries(sizes)) {
    const resized = squared.clone().resize({ w: dim, h: dim });
    await resized.write(path.join(publicDir, filename));
    console.log(`Saved ${filename}`);
  }
  
  // Also save a 32x32 as .ico for compatibility
  const icoImage = squared.clone().resize({ w: 32, h: 32 });
  await icoImage.write(path.join(publicDir, "favicon.ico"));
  console.log("Saved favicon.ico");
}

generateFavicons().catch(console.error);
