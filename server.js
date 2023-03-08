require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const crypto = require('crypto');

const { uploadFile, getFile } = require('./s3');

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

app.get('/', async (req, res) => {
    res.send('Hello World');
});

app.get('/api/posts', async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: [
            {
                id: 1,
                title: 'Hi',
            },
            {
                id: 2,
                title: 'Hello',
            },
        ],
    });
});

app.post('/api/imageupload', upload.single('image'), async (req, res) => {
    const { buffer, mimetype } = req.file;
    const imageName = 'images/' + generateFileName();

    try {
        await uploadFile(buffer, imageName, mimetype);
        res.status(200).json({
            status: 'success',
            data: { url: imageName },
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
