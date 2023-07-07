const fs = require('fs');
const path = require('path');

const championImagesDirectory = path.join(__dirname);

fs.readdir(championImagesDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith('.png') && !file.endsWith('_0.png')) {
      const filePath = path.join(championImagesDirectory, file);
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  });
});
