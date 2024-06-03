const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function processImage(req, res, next) {
    if (req.file) {
        const { buffer, originalname } = req.file;

        console.log(originalname);

        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

        if(!['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(fileExtension)) {
            return res.status(400).json({
                error: 'Invalid file type. Only jpg, jpeg, png, webp and svg are allowed'
            });
        }

        const name = originalname.split('.').slice(0, -1).join('.');

        if (!['svg'].includes(fileExtension)) {
            const ref = `${new Date().toISOString()}_${name.split(' ').join('_').webp}`;
            sharp(buffer).webp({quality: 20}).toFile(`images/${ref}`, (error) => {
                if(error) {
                    fs.unlinkSync(`images/${ref}`);
                    return res.status(500).json({ error });
                }

                req.file.filename = ref;

                next();
            })
        } else {
            const ref = `${new Date().toISOString()}_${name.split(' ').join('_')}.svg`;
            fs.writeFileSync(`images/${ref}`, buffer);

            req.file.filename = ref;
            next();
        }
    } else {
        next();
    }
}

module.exports = { upload, processImage };