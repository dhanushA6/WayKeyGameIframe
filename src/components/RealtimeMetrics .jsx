// import React from "react";

// const RealtimeMetrics = ({
//   realtimeWPM,
//   realtimeCPM,
//   realtimeAccuracy,
//   timeLeft,
//   selectedTime,
//   setSelectedTime,
//   gameActive,
// }) => {
//   return (
//     <div className="realtime-metrics">
//       {/* <div className="metric">
//         <div className="metric-label">WPM</div>
//         <div className="metric-value">{realtimeWPM}</div>
//       </div> */}
//       {/* <div className="metric">
//   <div className="metric-label">Accuracy</div>
//   <div className="metric-value">{realtimeAccuracy}%</div>
// </div> */} 
//       <div className="time-section">{timeLeft}s</div>
//       <div className="metric">
//         <div className="metric-value">{realtimeCPM}</div>
//       </div>  

//       {/* <div className="time-selector">
//         <label htmlFor="time-select">Select Time: </label>
//         <select
//           id="time-select"
//           value={selectedTime}
//           onChange={(e) => setSelectedTime(Number(e.target.value))}
//           disabled={gameActive}
//         >
//           <option value={30}>30 seconds</option>
//           <option value={60}>1 minute</option>
//           <option value={120}>2 minutes</option>
//           <option value={180}>3 minutes</option>
//         </select>
//       </div> */}

//     </div>
//   );
// };

// export default RealtimeMetrics;
 


import React from "react";

const RealtimeMetrics = ({
  realtimeWPM,
  realtimeCPM,
  realtimeAccuracy,
  timeLeft,
  selectedTime,
  setSelectedTime,
  gameActive,
}) => {
  // Convert timeLeft (in seconds) to MM:SS format
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div className="realtime-metrics">
      <div className="time-section">{formattedTime}</div>
      <div className="metric">
        <div className="metric-value">{realtimeCPM}</div>
      </div>
    </div>
  );
};

export default RealtimeMetrics;
