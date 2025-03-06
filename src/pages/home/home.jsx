import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import "../../index.css";

// Registrar los elementos necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Home = () => {

  // Datos de ejemplo para las gráficas
  const chartData1 = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Metales pesados",
        data: [40, 55, 45, 70, 60, 80],
        borderColor: "#5c5ab0",
        backgroundColor: "rgba(92, 90, 176, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartData2 = {
    labels: ["Plomo", "Mercurio", "Arsénico", "Cadmio"],
    datasets: [
      {
        data: [50, 20, 30, 10],
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A0"],
      },
    ],
  };

  const chartData3 = {
    labels: ["Última semana", "Predicción"],
    datasets: [
      {
        label: "Metales pesados",
        data: [65, 80],
        borderColor: "#413F9A",
        backgroundColor: "rgba(65, 63, 154, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="container">
      {/* Primer Row - Gráficas de datos registrados */}
      <div className="row">
        <div className="col-md-6">
          <div className="card" >
            <h3>Últimos Datos Registrados</h3>
            <Line data={chartData1} options={{ responsive: true }} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card" style={{height:"400px"}}>
            <h3>Metales en Tiempo Real</h3>
            <Pie data={chartData2} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Segundo Row - Niveles y Predicciones */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <h3>Niveles de Metales Pesados: Última Semana y Predicción</h3>
            <Line data={chartData3} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
