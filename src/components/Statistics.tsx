import { db } from "../firebase/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { Chart, LinearScale, CategoryScale, Title, Tooltip, Legend, LineController, PointElement, LineElement } from "chart.js";
import { useState, useEffect, useRef } from "react";
import './css/Statistics.css'

Chart.register(LinearScale, CategoryScale, Title, Tooltip, Legend, LineController, PointElement, LineElement);

export function Statistics() {
    const canvasRefTime = useRef(null);
    const canvasRefDistance = useRef(null);
    const [runs, setRuns] = useState([]);
    const chartTimeRef = useRef(null);
    const chartDistanceRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "runs"), (querySnapshot) => {
            const runsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setRuns(runsData);
        });

        return () => unsubscribe(); // Отписка при размонтировании компонента
    }, []);

    useEffect(() => {
        if (runs.length > 0) {
            const labels = runs.map(run => {
                const date = new Date(run.date.toDate());
                return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            });

            const createChart = (canvasRef, chartRef, label, data, color) => {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }
                chartRef.current = new Chart(canvasRef.current, {
                    type: "line",
                    data: {
                        labels,
                        datasets: [{
                            label,
                            data,
                            borderColor: color,
                            backgroundColor: `${color}33`, // Цвет с прозрачностью
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: { type: "linear" },
                            x: { type: "category" }
                        },
                        plugins: { legend: { position: "top" } }
                    }
                });
            };

            createChart(canvasRefTime, chartTimeRef, "Длительность пробежек", runs.map(run => run.time), "green");
            createChart(canvasRefDistance, chartDistanceRef, "Дистанция пробежек", runs.map(run => run.distance), "blue");
        }
    }, [runs]);

    return (
        <div className="charts-container">
            <h3>График длительности пробежек</h3>
            <div className="chart">
                <canvas ref={canvasRefTime} />
            </div>
            <h3>График дистанции пробежек</h3>
            <div className="chart">
                <canvas ref={canvasRefDistance} />
            </div>
        </div>
    );
}
