const fs = require('fs');
const path = require('path');

const uploadDir = path.resolve('upload');
const resumePath = path.join(uploadDir, 'CV_Duc-Lee_Banh.pdf');

exports.updateResume = (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: 'No file uploaded'
        });
    }

    if (fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath);
    }

    fs.renameSync(req.file.path, resumePath);
    res.status(200).json({
        message: 'File uploaded successfully'
    });
};

exports.downloadResume = (req, res) => {
    if (fs.existsSync(resumePath)) {
        res.download(resumePath, 'CV_Duc-Lee_Banh.pdf');
    } else {
        res.status(404).json({
            error: 'File not found'
        });
    }
};