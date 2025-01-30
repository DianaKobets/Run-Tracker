//import { createClient } from "@supabase/supabase-js";
import supabase from "../storage/supabase.js";
import { Chart, LinearScale, CategoryScale, Title, Tooltip, Legend, LineController, PointElement, LineElement } from "chart.js";
import { useState, useEffect, useRef } from "react";

Chart.register(LinearScale, CategoryScale, Title, Tooltip, Legend, LineController, PointElement, LineElement);

export function Statistics() {
    const canvasRefTime = useRef(null); 
    const canvasRefDistance = useRef(null);  
    const [runs, setRuns] = useState([]);
    const [chartTime, setChartTime] = useState(null); 
    const [chartDistance, setChartDistance] = useState(null); 
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {

        if (runs.length > 0) {
            if (chartTime) {
                chartTime.destroy();
            }
            const newChartTime = new Chart(canvasRefTime.current, {
                type: 'line',
                data: {
                    labels: runs.map(run => {
                        const date = new Date(run.date);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0'); 
                        return `${day}-${month}`;
                    }),
                    datasets: [{
                        label: "Длительность пробежек",
                        data: runs.map(run => run.time),
                        borderColor: 'green', 
                        backgroundColor: 'rgba(0, 128, 0, 0.1)', 
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            type: 'linear',
                        },
                        x: {
                            type: 'category'
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    }
                }
            });
            setChartTime(newChartTime); 
            if (chartDistance) {
                chartDistance.destroy();
            }
            const newChartDistance = new Chart(canvasRefDistance.current, {
                type: 'line',
                data: {
                    labels: runs.map(run => {
                        const date = new Date(run.date);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0'); 
                        return `${day}-${month}`;
                    }),
                    datasets: [{
                        label: "Дистанция пробежек",
                        data: runs.map(run => run.distance),
                        borderColor: 'blue', 
                        backgroundColor: 'rgba(0, 0, 255, 0.1)', 
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            type: 'linear',
                        },
                        x: {
                            type: 'category'
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    }
                }
                
            });
            setChartDistance(newChartDistance); 
        }
    }, [runs]);


    async function getData() {
        const { data } = await supabase.from("runs").select();
        setRuns(data); 
    }

    return (
        <div className="flex flex-col m-10 px-10">
            <h3>График длительности пробежек</h3>
            <div style={{ position: 'relative', height: '250px', width: '600px' }}>
                <canvas ref={canvasRefTime} />
            </div>
            <h3>График дистанции пробежек</h3>
            <div style={{ position: 'relative', height: '250px', width: '600px' }}>
                <canvas ref={canvasRefDistance} />
            </div>
        </div>
    );
}
