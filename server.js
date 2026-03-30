const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const app = express();
app.use(cors());

const shopsPath = path.join(__dirname, 'shops.yaml');

app.get('/api/shops', (req, res) => {
    try {
        const fileContents = fs.readFileSync(shopsPath, 'utf8');
        const data = yaml.load(fileContents);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ shops: [] });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Shops server running on port ${PORT}`));
