import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// Datos simulados
const simulatedData = [
    { date: "2024-02-01", lead: 0.8, mercury: 0.5, arsenic: 1.2 },
    { date: "2024-02-05", lead: 1.2, mercury: 0.7, arsenic: 1.5 },
    { date: "2024-02-10", lead: 0.5, mercury: 0.6, arsenic: 0.9 },
    { date: "2024-02-15", lead: 1.5, mercury: 0.9, arsenic: 2.1 },
    { date: "2024-02-20", lead: 0.9, mercury: 0.4, arsenic: 1.3 },
    { date: "2024-02-25", lead: 1.8, mercury: 1.2, arsenic: 2.5 },
    { date: "2024-03-01", lead: 1.1, mercury: 0.8, arsenic: 1.7 },
];

const averageConcentrations = {
    lead: simulatedData.reduce((sum, d) => sum + d.lead, 0) / simulatedData.length,
    mercury: simulatedData.reduce((sum, d) => sum + d.mercury, 0) / simulatedData.length,
    arsenic: simulatedData.reduce((sum, d) => sum + d.arsenic, 0) / simulatedData.length,
};

// Filtrar datos con alta concentración
const historicalData = simulatedData.filter(d =>
    d.lead > averageConcentrations.lead ||
    d.mercury > averageConcentrations.mercury ||
    d.arsenic > averageConcentrations.arsenic
);

// Configuración del gráfico de líneas
const lineData = {
    labels: simulatedData.map(d => d.date),
    datasets: [
        {
            label: "Plomo (mg/L)",
            data: simulatedData.map(d => d.lead),
            borderColor: "#ff5733",
            backgroundColor: "rgba(255, 87, 51, 0.2)",
        },
        {
            label: "Mercurio (mg/L)",
            data: simulatedData.map(d => d.mercury),
            borderColor: "#3399ff",
            backgroundColor: "rgba(51, 153, 255, 0.2)",
        },
        {
            label: "Arsénico (mg/L)",
            data: simulatedData.map(d => d.arsenic),
            borderColor: "#33cc33",
            backgroundColor: "rgba(51, 204, 51, 0.2)",
        },
    ],
};

const lineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Tendencia de Metales Pesados",
        },
    },
};

// Configuración del gráfico de pastel
const pieData = {
    labels: ["Plomo", "Mercurio", "Arsénico"],
    datasets: [
        {
            data: [
                simulatedData.reduce((sum, d) => sum + d.lead, 0),
                simulatedData.reduce((sum, d) => sum + d.mercury, 0),
                simulatedData.reduce((sum, d) => sum + d.arsenic, 0),
            ],
            backgroundColor: ["#ff5733", "#3399ff", "#33cc33"],
        },
    ],
};

const pieOptions = {
    plugins: {
        title: {
            display: true,
            text: "Distribución Total de Metales Detectados",
        },
    },
};

const HistoricData = () => {
    return (
        <div className="container">
            <h2 className="title">Tendencia de Metales Pesados</h2>
            <div className="col-md-12">
                <div className="card">
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h2 className="title">Distribución de Metales Detectados</h2>

                    <div className="card">
                        <Pie data={pieData} options={pieOptions} className="grafica_pastel" />
                    </div>
                </div>

                <div className="col-md-6">
                    <h2 className="title">Registros con Alta Concentración</h2>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Plomo (mg/L)</th>
                                <th>Mercurio (mg/L)</th>
                                <th>Arsénico (mg/L)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicalData.map((d, index) => (
                                <tr key={index}>
                                    <td>{d.date}</td>
                                    <td>{d.lead.toFixed(2)}</td>
                                    <td>{d.mercury.toFixed(2)}</td>
                                    <td>{d.arsenic.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HistoricData;