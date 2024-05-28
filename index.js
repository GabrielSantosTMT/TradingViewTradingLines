const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const DEFAULT_MESSAGE = process.env.DEFAULT_MESSAGE
const CHAT_ID = process.env.CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

app.post('/webhook', async (req, res) => {
    const alertMessage = req.body.message || DEFAULT_MESSAGE;

    try {
        const response = await fetch(TELEGRAM_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: alertMessage
            })
        });

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.statusText}`);
        }

        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
