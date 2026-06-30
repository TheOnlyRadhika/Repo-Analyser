function Sidebar({ file }) {

    if (!file) {
        return (
            <div className="sidebar">
                <h2>File Details</h2>
                <p>Select a file</p>
            </div>
        );
    }

    return (
        <div className="sidebar">

            <h2>{file.name}</h2>

            <p><strong>Path:</strong> {file.path}</p>

            <p><strong>Extension:</strong> {file.extension}</p>

            <p><strong>LOC:</strong> {file.loc}</p>

            <p><strong>Size:</strong> {file.size} bytes</p>

            <h3>Dependencies</h3>

            <ul>
                {file.dependencies.map((dependency) => (
                    <li key={dependency}>
                        {dependency}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Sidebar;