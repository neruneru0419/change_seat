from flask import Flask
from flask import render_template, request
from flask_cors import CORS
import random 
import csv

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app)

def change_sheet(class_member, memberSize):
    lst = class_member.split(",")
    class_number_member = []
    i = 0
    print(len(lst))
    while i < len(lst): 
        class_number_member.append(lst[i] + lst[i+1])
        i += 2
    random.shuffle(class_number_member)
    for i in range(memberSize - len(class_number_member)):
        class_number_member.append("")
    return str(class_number_member)

def reverse_sheet(class_member):
    lst = class_member.split(",")
    lst.reverse()
    return str(lst)

@app.route('/', methods=["GET", "POST"])
def index():
    if request.method == "GET":
        try:

            return change_sheet(request.args.get('member'), int(request.args.get('memberSize')))
        except:
            return "エラー"
        #return render_template('index.html')
@app.route('/reverse')
def reverse():
    return reverse_sheet(request.args.get('member'))
 
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=True)

