from flask import Flask, request

app = Flask(__name__)


@app.post("/extractFaces")
def extract_faces():
    req = request
    return ":)"


if __name__ == '__main__':
    app.run()
