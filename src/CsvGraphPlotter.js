import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const videoMapping = {
  0: { name: "No Movement(static)", path: "/videos/static.mp4" },
  1: { name: "Forward Bend", path: "/videos/forward_bend.mp4" },
  2: { name: "Warrior Pose", path: "/videos/warrior.mp4" },
  3: { name: "Triangle Pose", path: "/videos/triangle.mp4" },
  4: { name: "Vajrasana", path: "/videos/vajrasan.mp4" },
  5: { name: "Backward Bend", path: "/videos/backwardbend_pose.mp4" },
};

const CsvGraphPlotter = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: Array.from({ length: 52 }, (_, colIdx) => ({
      label: `Column ${colIdx + 1}`,
      data: [],
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
      borderWidth: 1,
      fill: false,
    })),
  });
  const [currentActivity, setCurrentActivity] = useState("Unknown Activity");
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        updateChartAndVideo();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 50); // Update every 200ms
      return () => clearInterval(interval);
    }
  }, [data, currentIndex]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const parsedData = result.data.filter((row) => row.length === 53);
          setData(parsedData);
        },
        header: false,
        skipEmptyLines: true,
      });
    }
  };

  const updateChartAndVideo = () => {
    const currentRow = data[currentIndex];
    if (!currentRow) return;

    // Update graph
    setChartData((prevData) => {
      const newLabels = [...prevData.labels, `t ${currentIndex + 1}`];
      if (newLabels.length > 50) newLabels.shift(); // Keep max 50 labels

      const newDatasets = prevData.datasets.map((dataset, idx) => {
        const newData = [...dataset.data, parseFloat(currentRow[idx])];
        if (newData.length > 50) newData.shift(); // Keep max 50 data points
        return { ...dataset, data: newData };
      });

      return { ...prevData, labels: newLabels, datasets: newDatasets };
    });

    // Update video
    const label = parseInt(currentRow[52], 10);
    if (videoMapping[label]) {
      setCurrentActivity(videoMapping[label].name);
      setVideoSrc(videoMapping[label].path);
    } else {
      setCurrentActivity("Unknown Activity");
      setVideoSrc("");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Real-time Sensor Data Visualization</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ margin: "20px", padding: "10px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        <div style={{ width: "45%" }}>
          {chartData.labels.length > 0 ? (
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: { display: true, text: "Time", font: { size: 14 } },
                    grid: { display: true },
                  },
                  y: {
                    title: { display: true, text: "Values", font: { size: 14 } },
                    grid: { display: true },
                    min: 0,
                    max: 20,
                  },
                },
                plugins: {
                  legend: { display: false },
                  tooltip: { mode: "index", intersect: false },
                },
              }}
            />
          ) : (
            <p style={{ color: "#888" }}>Upload a CSV file to display the graph.</p>
          )}
        </div>

        <div style={{ width: "45%" }}>
          <h1>Current Activity: {currentActivity}</h1>
          {videoSrc ? (
            <video
              key={videoSrc}
              width="100%"
              height="400"
              loop
              autoPlay
              muted
              controls={false}
              style={{
                objectFit: "contain",
                pointerEvents: "none",
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No video available for the current activity.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CsvGraphPlotter;
