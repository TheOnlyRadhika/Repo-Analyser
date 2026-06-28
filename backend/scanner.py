import os
def count_loc(filepath):
    try:
        with open(filepath, 'r') as file:
            return len(file.readlines())
    except Exception as e:
        print(f" Error Reading {filepath}: {e}")
        return 0

def scan_repository(repo_path):
    files = []
    for root, dirs, filenames in os.walk(repo_path):
        dirs[:] = [
            d for d in dirs
            if d not in ("venv", ".git","__pycache__")
        ]
        for filename in filenames:
            extension = os.path.splitext(filename)[1]
            size = os.path.getsize(filename)
            filepath = os.path.join(root, filename )
            loc = count_loc(filepath)
            files.append(
                {
                    "name" : filename,
                    "path" : filepath,
                    "extension" : extension,
                    "size" : size,
                    "Lines Of Code (loc)": loc
                }
            )
    return files

if __name__ == "__main__" :
    result = scan_repository(".")
    for file in result:
        print(file)