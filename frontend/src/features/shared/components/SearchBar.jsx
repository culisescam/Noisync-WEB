import '../styles/SearchBar.css';

function SearchBar() {
    return (
        <div className="my-3">
            <div className="input-group">

                <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search text-muted"></i>
                </span>

                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Buscar canción..."
                />

            </div>
        </div>
    );
}

export default SearchBar;