const Prototype = () => {
    return (
        <div className="container">
            <h2 className="title">Información del Prototipo</h2>
            <div className="user-card">
                <p>Nombre: Jakebot</p>
                <p>Batería: 80%</p>
                <p>Estado: Encendido</p>
                <p>Ubicación: Río Blanco</p>
            </div>
            <br />
            <div>
                <h2 className="title">Datos del Análisis</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Fecha</th>
                            <th className="border px-4 py-2">Metal Detectado</th>
                            <th className="border px-4 py-2">Concentración</th>
                            <th className="border px-4 py-2">Unidad</th>
                            <th className="border px-4 py-2">Ubicación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">10/02/2025</td>
                            <td className="border px-4 py-2">Plomo (Pb)</td>
                            <td className="border px-4 py-2">0.12</td>
                            <td className="border px-4 py-2">mg/L</td>
                            <td className="border px-4 py-2">Sector A</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">2</td>
                            <td className="border px-4 py-2">10/02/2025</td>
                            <td className="border px-4 py-2">Mercurio (Hg)</td>
                            <td className="border px-4 py-2">0.05</td>
                            <td className="border px-4 py-2">mg/L</td>
                            <td className="border px-4 py-2">Sector B</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">3</td>
                            <td className="border px-4 py-2">10/02/2025</td>
                            <td className="border px-4 py-2">Arsénico (As)</td>
                            <td className="border px-4 py-2">0.09</td>
                            <td className="border px-4 py-2">mg/L</td>
                            <td className="border px-4 py-2">Sector C</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Prototype;
