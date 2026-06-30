
from scanner import scan_repository
from pprint import pprint

def build_graph(files):
    nodes = []
    edges = []
    local_files = set()

    for file in files:
        local_files.add(file["name"])

    for file in files:
        nodes.append({
        "id": file["name"],
        "name": file["name"],
        "path": file["path"],
        "extension": file["extension"],
        "size": file["size"],
        "loc": file["Lines Of Code (loc)"],
        "dependencies": file["dependencies"]
    })
    
    for file in files:
        for dependency in file["dependencies"]:
            dependency_file = dependency + ".py"
            if dependency_file in local_files:
                edges.append(
                    {
                        "source": file["name"],
                        "target": dependency_file
                    }
                )
    print(edges)
    return {
        "nodes" : nodes,
        "edges" : edges
    }

if __name__ == "__main__":
    print("Inside main")

    files = scan_repository(".")
    print(len(files))

    graph = build_graph(files)

    pprint(graph)