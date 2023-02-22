import argparse
import requests
from flask import Flask, render_template, request, url_for

app = Flask(__name__)

@app.route('/city', methods = ["POST"])
def search_city():
    API_KEY = '3ad5d1c1d3bdf0fa4aa4bc5b3ee6482f'  

    #city = request.form.get("city")
    city = input("Enter city name: ")

    url = "http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={API_KEY}"

    res = requests.get(url)

    print(response)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--ip", type=str, default="127.0.0.1",
                    help="ip address")
    ap.add_argument("-o", "--port", type=int, default=8000,
                    help="server port")
    args = vars(ap.parse_args())    

    app.run(host=args["ip"], port=args["port"], debug=True, use_reloader=True)
