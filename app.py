from flask import Flask, render_template, request, redirect, url_for, flash
import requests

app = Flask(__name__)
app.secret_key = '12345'

# Telegram Bot Token and Chat ID
TELEGRAM_TOKEN = '7202312423:AAFjbI5jOJ_lLIRLDU7-YZvVghOMMNYWPr8'
CHAT_ID = '6120861716'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/mechanical')
def mechanical():
    return render_template('mechanical.html')

@app.route('/mechanical_card')
def mechanical_card():
    return render_template('mechanical_card.html')
@app.route('/rep')
def rep():
    return render_template('rep.html')

@app.route('/submit_application', methods=['POST'])
def submit_application():
    name = request.form.get('name')
    phone = request.form.get('phone')
    car_model = request.form.get('car_model')
    additional_info = request.form.get('additional_info')

    message = f"New Application:\nName: {name}\nPhone: {phone}\nCar Model: {car_model}\nAdditional Info: {additional_info}"

    if send_message_to_telegram(message):
        flash('Your application has been submitted successfully!', 'success')
    else:
        flash('There was an error submitting your application. Please try again.', 'error')

    return redirect(url_for('home'))

@app.route('/send_call_request', methods=['POST'])
def send_call_request():
    name = request.form['name']
    country_code = request.form['countryCode']
    phone = request.form['phone']
    full_number = f"{country_code}{phone}"

    message = f"*Request for Callback*\nName: {name}\nPhone Number: {full_number}"

    if send_message_to_telegram(message):
        flash('Your request has been submitted successfully!', 'success')
    else:
        flash('There was an error submitting your request. Please try again.', 'error')

    return redirect(url_for('home'))

def send_message_to_telegram(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        'chat_id': CHAT_ID,
        'text': message,
        'parse_mode': 'Markdown'  # Use Markdown for formatting
    }
    
    response = requests.post(url, json=payload)
    return response.status_code == 200  # Return True if the message was sent successfully

if __name__ == '__main__':
    app.run(debug=True)
