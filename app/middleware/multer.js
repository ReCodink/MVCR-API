const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, path.join(__dirname, '../upload')); // Folder penyimpanan file
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

module.exports = upload;