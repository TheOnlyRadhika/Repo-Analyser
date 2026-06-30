from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI , HTTPException
from scanner import scan_repository
import os
from graph_builder import build_graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    if not os.path.isdir(path):
        raise HTTPException(
            status_code = 400,
            detail = "This file is not a directory"
        )
    files = scan_repository(path)
    graph = build_graph(files)

    return graph
