import ast


def extract_dependencies(filepath):

    with open(filepath, "r", encoding="utf-8") as file:
        source_code = file.read()

    tree = ast.parse(source_code)

    dependencies = []

    for node in ast.walk(tree):

        if isinstance(node, ast.Import):

            for alias in node.names:
                dependencies.append(alias.name)

        elif isinstance(node, ast.ImportFrom):

            if node.module:
                dependencies.append(node.module)

    return dependencies

if __name__ == "__main__":

    deps = extract_dependencies("scanner.py")

    print(deps)