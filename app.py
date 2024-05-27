from flask import Flask, request, jsonify
import os
import json
from telegram import Bot
import asyncio

app = Flask(__name__)

TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
CHAT_ID = '593683420'
bot = Bot(token=TELEGRAM_TOKEN)


async def send_telegram_message(text):
    await bot.send_message(chat_id=CHAT_ID, text=text)


@app.route('/webhook', methods=['POST'])
def webhook():
    alert_message = 'Time to look at tranding view!'

    # Send the alert message to Telegram asynchronously
    asyncio.run(send_telegram_message(alert_message))

    return jsonify({'status': 'success'}), 200


if __name__ == '__main__':
    app.run(debug=True)
