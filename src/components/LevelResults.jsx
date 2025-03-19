// import React from "react";

// const LevelResults = ({ wpm, cpm, accuracy, errorByTamilChar, currentLevel, section, islevelcompleted, levelContent, onRetry, onNextLevel, onNextSection }) => {
//   const errorEntries = Object.entries(errorByTamilChar).sort((a, b) => b[1] - a[1]);
  
//   // Determine if this is the last section in the level
//   const isLastSection = levelContent[currentLevel - 1] && 
//     section === levelContent[currentLevel - 1].sections.length - 1;

//   return (
//     <div className="level-results">
//       <h3>
//         {islevelcompleted 
//           ? `Level ${currentLevel} Completed!` 
//           : `Section ${section + 1} Completed!`}
//       </h3>
//       <div className="metrics">
//         <p>WPM: <strong>{wpm}</strong></p>
//         <p>CPM: <strong>{cpm}</strong></p>
//         <p>Accuracy: <strong>{accuracy}%</strong></p>
//       </div>
//       <div className="error-analysis">
//         <h4>Error Analysis</h4>
//         {errorEntries.length > 0 ? (
//           <ul>
//             {errorEntries.map(([char, count]) => (
//               <li key={char}>
//                 <span className="tamil-char">{char}</span>: {count} errors
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Perfect! No errors! 🎉</p>
//         )}
//       </div>
//       <div className="level-actions">
//         {accuracy >= 80 ? (
//           islevelcompleted ? (
//             currentLevel < levelContent.length ? (
//               <>
//                 <button className="proceed-button" onClick={onNextLevel}>
//                   Next Level ➔
//                 </button>
//                 <button className="retry-button" onClick={onRetry}>
//                   Retry Level 🔄
//                 </button>
//               </>
//             ) : (
//               <div className="completed-all">
//                 <p>🎉 All Levels Completed! 🎉</p>
//                 <button className="start-button" onClick={onRetry}>
//                   Play Again
//                 </button>
//               </div>
//             )
//           ) : (
//             <>
//               <button className="proceed-button" onClick={onNextSection}>
//                 Next Section ➔
//               </button>
//               <button className="retry-button" onClick={onRetry}>
//                 Retry Section 🔄
//               </button>
//             </>
//           )
//         ) : (
//           <>
//             <p className="accuracy-warning">Minimum 80% accuracy required</p>
//             <button className="retry-button" onClick={onRetry}>
//               Retry {islevelcompleted ? "Level" : "Section"} 🔄
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LevelResults; 



import React from "react";

const LevelResults = ({ wpm, cpm, accuracy, errorByTamilChar, currentLevel, section, islevelcompleted, levelContent, onRetry, onNextLevel, onNextSection }) => {
  const errorEntries = Object.entries(errorByTamilChar).sort((a, b) => b[1] - a[1]);
  
  // Determine if this is the last section in the level
  const isLastSection = levelContent[currentLevel - 1] && 
    section === levelContent[currentLevel - 1].sections.length - 1;

  return (
    <div className="level-results">
      <h3>
        {islevelcompleted 
          ? `Level ${currentLevel} Completed!` 
          : `Section ${section + 1} Completed!`}
      </h3>
      <div className="metrics">
        <p>WPM: <strong>{wpm}</strong></p>
        <p>CPM: <strong>{cpm}</strong></p>
        <p>Accuracy: <strong>{accuracy}%</strong></p>
      </div>
      <div className="level-actions">
        {accuracy >= 80 ? (
          islevelcompleted ? (
            currentLevel < levelContent.length ? (
              <>
                <button className="proceed-button" onClick={onNextLevel}>
                  Next Level ➔
                </button>
                <button className="retry-button" onClick={onRetry}>
                  Retry Level 🔄
                </button>
              </>
            ) : (
              <div className="completed-all">
                <p>🎉 All Levels Completed! 🎉</p>
                <button className="start-button" onClick={onRetry}>
                  Play Again
                </button>
              </div>
            )
          ) : (
            <>
              <button className="proceed-button" onClick={onNextSection}>
                Next Section ➔
              </button>
              <button className="retry-button" onClick={onRetry}>
                Retry Section 🔄
              </button>
            </>
          )
        ) : (
          <>
            <p className="accuracy-warning">Minimum 80% accuracy required</p>
            <button className="retry-button" onClick={onRetry}>
              Retry {islevelcompleted ? "Level" : "Section"} 🔄
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LevelResults;