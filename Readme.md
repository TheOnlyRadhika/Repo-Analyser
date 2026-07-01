# Repository Analyzer & AI Code Visualizer

An AI-powered full-stack application that analyzes the structure of a software repository, constructs an interactive dependency graph, and generates intelligent summaries for individual source files using Google's Gemini API.

The project is designed to help developers quickly understand unfamiliar codebases by combining static code analysis with Large Language Models (LLMs).

---

##  Features

###  Repository Analysis
- Recursively scans a local repository
- Extracts metadata for every Python source file
- Computes:
  - File name
  - Absolute/relative path
  - File extension
  - File size
  - Lines of Code (LOC)
  - Imported modules

---

###  Dependency Analysis

Uses Python's Abstract Syntax Tree (AST) to parse source files and detect module imports.

Internal project dependencies are transformed into a directed dependency graph representing relationships between files.

Example:

```
main.py
 ├── scanner.py
 ├── graph_builder.py
 └── service_ai.py

graph_builder.py
 └── scanner.py
```

---

###  REST API (FastAPI)

The backend exposes REST endpoints for:

| Endpoint     | Method | Description                                      |
| ------------ | ------ | ------------------------------------------------ |
| `/analyse`   | GET    | Analyze repository and generate dependency graph |
| `/summarise` | POST   | Generate AI summary for a selected source file   |

---

###  Interactive Dependency Graph

The frontend visualizes repository dependencies using **React Flow**.

Features include:

- Interactive nodes
- Draggable graph
- Zoom & pan
- Automatic graph layout using Dagre
- Clickable files

---

###  AI-Powered Code Summarization

Selecting any file in the graph sends its contents to Google's Gemini API.

The AI generates:

- Purpose of the file
- Responsibilities
- Important functions
- Key dependencies
- Possible improvements

Example:

```
scanner.py

Purpose:
Scans the repository recursively and extracts metadata.

Main Responsibilities:
• Traverse directories
• Count LOC
• Extract imports
• Prepare metadata

Possible Improvements:
• Parallel scanning
• Ignore configurable folders
• Better error handling
```

---

##  Project Architecture

```
                 User

                   │

                   ▼

        React Frontend (Vite)

                   │

      Click Repository Node

                   │

                   ▼

         FastAPI REST Backend

        ┌────────────┬─────────────┐
        │            │             │
        ▼            ▼             ▼

 Repository     Dependency      AI Service
   Scanner        Builder        (Gemini)

        │            │
        └──────┬─────┘
               ▼

       Repository Graph

               ▼

        React Flow Graph
```

---

##  Tech Stack

### Backend

- Python
- FastAPI
- AST (Abstract Syntax Tree)
- Google Gemini API
- Pydantic

### Frontend

- React
- Vite
- React Flow
- Dagre

### AI

- Google Gemini 2.5 Flash

---

##  Project Structure

```
Repo-Analyser/

├── backend/
│
│   ├── main.py
│   ├── scanner.py
│   ├── dependency_parser.py
│   ├── graph_builder.py
│   ├── service_ai.py
│   ├── pyproject.toml
│   └── .env.example
│
├── frontend/
│
│   ├── src/
│   │
│   ├── App.jsx
│   ├── Sidebar.jsx
│   ├── layout.js
│   └── ...
│
├── README.md
└── .gitignore
```

---

##  Installation

### Clone Repository

```bash
git clone https://github.com/TheOnlyRadhika/Repo-Analyser.git

cd Repo-Analyser
```
s
---

## Backend Setup

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
uv sync
```

Create a `.env` file

```
GEMINI_API_KEY=YOUR_API_KEY
```

Run the FastAPI server

```bash
uv run uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

## How It Works

1. User clicks **Analyze Repository**
2. FastAPI scans every Python file
3. Imports are parsed using Python AST
4. A dependency graph is constructed
5. Graph is sent to React
6. React Flow renders the repository
7. Clicking any node requests an AI explanation
8. Gemini analyzes the source code
9. Summary appears inside the sidebar

---

## Learning Outcomes

This project demonstrates:

- Full-stack application development
- REST API design with FastAPI
- Static code analysis using Python AST
- Graph data structures
- Interactive graph visualization
- React state management
- API integration
- Prompt engineering
- Large Language Model integration
- Modern frontend development

---

## Future Improvements

- Repository upload support
- GitHub repository analysis
- Multi-language support (Java, C++, JavaScript)
- Cyclomatic complexity analysis
- Circular dependency detection
- Search & filtering
- Export graph as PNG/SVG
- Dark/Light theme
- Docker deployment
- Authentication

---


