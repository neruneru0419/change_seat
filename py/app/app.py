from flask import Flask
from flask import render_template, request
from flask_cors import CORS
import random 
import csv

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app)

def change_sheet(class_member):
    lst = class_member.split(",")
    print(lst)
    random.shuffle(lst)
    print(lst)
    return str(lst)

@app.route('/', methods=["GET", "POST"])
def index():
    if request.method == "GET":
        try:
            return change_sheet(request.args.get('member'))
        except:
            return "エラー"
        #return render_template('index.html')
    else:
        try:
            return change_sheet(int(request.form["num"]))
        except:
            return "エラー"
 
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)
