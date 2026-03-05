function ChromaticScale() {

    return (
        <>
            <div className="card mt-4">

                <div className="card-body">

                    <h6 className="fw-bold">
                        Escala cromática
                    </h6>

                    <p className="text-muted small">
                        Tabla de referencia
                    </p>

                    <table className="table table-bordered text-center small">

                        <thead>
                            <tr>
                                <th>Grados</th>
                                <th>I</th>
                                <th>ii</th>
                                <th>iii</th>
                                <th>IV</th>
                                <th>V</th>
                                <th>vi</th>
                                <th>vii°</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Notas</td>
                                <td>C</td>
                                <td>D</td>
                                <td>E</td>
                                <td>F</td>
                                <td>G</td>
                                <td>A</td>
                                <td>B</td>
                            </tr>

                            <tr>
                                <td>Comodín</td>
                                <td>$1</td>
                                <td>$2</td>
                                <td>$3</td>
                                <td>$4</td>
                                <td>$5</td>
                                <td>$6</td>
                                <td>$7</td>
                            </tr>
                        </tbody>

                    </table>

                </div>

            </div>
        </>
    );
}

export default ChromaticScale;