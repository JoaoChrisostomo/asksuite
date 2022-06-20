const express = require('express');
const router = express.Router();
const BrowserService = require('../services/BrowserService.js');

router.get('/', (req, res) => {
    res.send('Hello Asksuite World!');
});

router.post('/search', async (req, res) =>{
    const { checkin, checkout } = req.body;

    const browserService = new BrowserService(checkin, checkout)
    await browserService.crawl();
    res.send([
        {
            name: 'John Doe',
            description: 'John Doe is a person.',
            price: '$100.00',
            image: ' '
        }
    ])
})

//TODO implement endpoint here

module.exports = router;
