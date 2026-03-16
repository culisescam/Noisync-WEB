function Filters({ filtro, setFiltro }) {
    return (
        <div className="custom-segment">
            <input
                type="radio"
                id="todas"
                name="filter"
                checked={filtro === "todas"}
                onChange={() => setFiltro("todas")}
            />
            <label htmlFor="todas">Todas</label>

            <input
                type="radio"
                id="publicas"
                name="filter"
                checked={filtro === "publicas"}
                onChange={() => setFiltro("publicas")}
            />
            <label htmlFor="publicas">Públicas</label>

            <input
                type="radio"
                id="privadas"
                name="filter"
                checked={filtro === "privadas"}
                onChange={() => setFiltro("privadas")}
            />
            <label htmlFor="privadas">Privadas</label>
        </div>
    );
}

export default Filters;