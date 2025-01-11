

// import React from "react";
// import CsvGraphPlotter from "./CsvGraphPlotter";

// function App() {
//   return (
//     <div>
//       <header style={{ textAlign: "center", padding: "20px", backgroundColor: "#f0f0f0" }}>
//         <h1>Sensorless Sensing: CSV Graph Viewer</h1>
//       </header>
//       <CsvGraphPlotter />
//     </div>
//   );
// }

// export default App;






import React from "react";
import CsvGraphPlotter from "./CsvGraphPlotter"; // Import the CsvGraphPlotter component

const App = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <CsvGraphPlotter /> {/* Render the CsvGraphPlotter component */}
    </div>
  );
};

export default App;
