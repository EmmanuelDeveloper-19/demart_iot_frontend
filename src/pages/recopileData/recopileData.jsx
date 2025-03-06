
// Datos simulados
const metalRecords = [
    { date: "2024-02-01", time: "10:30", metal: "Plomo", concentration: 1.2, unit: "mg/L", location: "Río Bravo", comments: "Niveles elevados detectados" },
    { date: "2024-02-05", time: "12:45", metal: "Mercurio", concentration: 0.6, unit: "mg/L", location: "Lago Azul", comments: "Dentro del límite permitido" },
    { date: "2024-02-10", time: "14:10", metal: "Arsénico", concentration: 1.8, unit: "mg/L", location: "Río Verde", comments: "Supera el umbral seguro" },
    { date: "2024-02-15", time: "09:20", metal: "Plomo", concentration: 2.3, unit: "mg/L", location: "Lago Rojo", comments: "Alerta: niveles peligrosos" },
    { date: "2024-02-20", time: "16:00", metal: "Mercurio", concentration: 0.9, unit: "mg/L", location: "Río Amarillo", comments: "Valores dentro del rango" },
];

const RecopileData = () => {

    return (
        <div className="container">
            <h2 className="title">Registro de Metales Detectados</h2>

            <div className="col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Metal</th>
                            <th>Concentración</th>
                            <th>Unidad</th>
                            <th>Ubicación</th>
                            <th>Comentarios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metalRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.time}</td>
                                <td>{record.metal}</td>
                                <td>{record.concentration.toFixed(2)}</td>
                                <td>{record.unit}</td>
                                <td>{record.location}</td>
                                <td>{record.comments}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <br />


            <div className="row">
                <div className="">
                    <button className="btn btn-info" >Descargar Excel</button>
                    <button className="btn btn-danger" >Descargar PDF</button>
                </div>
            </div>
        </div>
    )
}

export default RecopileData;