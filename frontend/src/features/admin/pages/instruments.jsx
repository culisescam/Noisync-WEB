import { Link } from "react-router-dom";
import SearchBar from "../../shared/components/SearchBar";
import IntrumentsTable from "../components/InstrumentsTable";
import AddInstrumentCategoryCard from "../components/addInstrumentCategoryCard";
import { useState } from "react";



function Instruments() {
    const [showAdd, setShowAdd] = useState(false);


    const user = JSON.parse(localStorage.getItem("user"));
    const isLeader = user?.role === "LEADER";
    const instruments = [
        { id: 1, name: "Guitarra", cant: 5 },
        { id: 2, name: "Bajo", cant: 3 },
        { id: 3, name: "Batería", cant: 2 },
    ];
    if (showAdd) {
        return (
            <AddInstrumentCategoryCard
                onBack={() => setShowAdd(false)}
            />
        );
    }
    return (
        <>
            {/* CARD BUSQUEDA Y AGREGAR */}
            <div className="card shadow-sm mb-4">

                <div className="card-body">

                    <h5 className="mb-0">Nueva categoría</h5>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">

                        <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-3 w-100 w-lg-auto">

                            <div style={{ minWidth: "220px" }} className="flex-grow-1">

                                <div className="my-3">

                                    <div className="input-group">

                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-search text-muted"></i>
                                        </span>

                                        <input
                                            type="text"
                                            className="form-control border-start-0"
                                            placeholder="Nombre de la categoría..."
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* SOLO LIDER PUEDE AGREGAR */}
                        {isLeader && (
                            <button
                                className="btn btn-dark px-4 py-2 align-self-start align-self-lg-auto"
                                style={{ whiteSpace: "nowrap" }}
                                onClick={() => setShowAdd(true)}
                            >
                                + Agregar
                            </button>
                        )}

                    </div>

                </div>

            </div>


            {/* TABLA */}
            <div className="card">

                <div className="card-body">

                    <IntrumentsTable
                        instruments={instruments}
                        isLeader={isLeader}
                    />

                </div>

            </div>
        </>
    );
}

export default Instruments;