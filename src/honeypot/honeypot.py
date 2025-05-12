from flask import Flask, request
app = Flask(__name__)
@app.route('/api/message', methods=['POST'])
def fake(): print(request.json); return {},200
if __name__=='__main__': app.run(port=8888)
