from fastapi import FastAPI , HTTPException
from scanner import scan_repository
import os

app = FastAPI()


@app.get("/")
def home():
    return {
        "message" : "Repo Analyser backend running"
    }

@app.get("/analyse")
def Analyser(path : str):
    if not os.path.exists(path):
        raise HTTPException(
            status_code = 404,
            detail = "Path does not exist"
        )
    files = scan_repository(path)
    return {
        "files" : files
    }