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
import "./LevelResults.css"

const LevelResults = ({ 
  wpm, 
  cpm, 
  accuracy, 
  errorByTamilChar, 
  currentLevel, 
  section, 
  islevelcompleted, 
  levelContent, 
  onRetry, 
  onNextLevel, 
  onNextSection 
}) => {
  const errorEntries = Object.entries(errorByTamilChar).sort((a, b) => b[1] - a[1]);
  
  // Determine if this is the last section in the level
  const isLastSection = levelContent[currentLevel - 1] &&
    section === levelContent[currentLevel - 1].sections.length - 1;

  // Tamil translations
  const tamilLabels = {
    level: "நிலை",
    section: "பிரிவு",
    completed: "நிறைவடைந்தது!",
    wpm: "நிமிடத்திற்கு சொற்கள்",
    cpm: "நிமிடத்திற்கு எழுத்துக்கள்",
    accuracy: "துல்லியம்",
    nextLevel: "அடுத்த நிலை ➔",
    nextSection: "அடுத்த பிரிவு ➔",
    retryLevel: "நிலையை மீண்டும் முயற்சி செய்க 🔄",
    retrySection: "பிரிவை மீண்டும் முயற்சி செய்க 🔄",
    allLevelsCompleted: "🎉 அனைத்து நிலைகளும் நிறைவடைந்தன! 🎉",
    playAgain: "மீண்டும் விளையாடு",
    accuracyWarning: "குறைந்தபட்சம் 80% துல்லியம் தேவை"
  };

  return (
    <div className="level-results-container">
      <div className="level-results">
        <h3 className="result-title">
          {islevelcompleted
            ? `${tamilLabels.level} ${currentLevel} ${tamilLabels.completed}`
            : `${tamilLabels.section} ${section + 1} ${tamilLabels.completed}`}
        </h3>
        
        <div className="metrics">
          {/* <div className="metric-item">
            <span className="metric-label">{tamilLabels.wpm}:</span>
            <span className="metric-value">{wpm}</span>
          </div>
          
          <div className="metric-item">
            <span className="metric-label">{tamilLabels.cpm}:</span>
            <span className="metric-value">{cpm}</span>
          </div>
          
          <div className="metric-item">
            <span className="metric-label">{tamilLabels.accuracy}:</span>
            <span className="metric-value">{accuracy}%</span>
          </div> */} 
           Metrics Calcualtion Need to be Added 
        </div>
        
        {/* <div className="error-summary">
          {errorEntries.length > 0 && (
            <div className="common-errors">
              <h4>அதிக பிழைகள்:</h4>
              <ul>
                {errorEntries.slice(0, 3).map(([char, count]) => (
                  <li key={char}>
                    <span className="error-char">{char}</span>
                    <span className="error-count">{count} பிழைகள்</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div> */}
        
        <div className="level-actions">
          {accuracy >= 0 ? (
            islevelcompleted ? (
              currentLevel < levelContent.length ? (
                <>
                  <button className="proceed-button" onClick={onNextLevel}>
                    {tamilLabels.nextLevel}
                  </button>
                  <button className="retry-button" onClick={onRetry}>
                    {tamilLabels.retryLevel}
                  </button>
                </>
              ) : (
                <div className="completed-all">
                  <p>{tamilLabels.allLevelsCompleted}</p>
                  <button className="start-button" onClick={onRetry}>
                    {tamilLabels.playAgain}
                  </button>
                </div>
              )
            ) : (
              <>
                <button className="proceed-button" onClick={onNextSection}>
                  {tamilLabels.nextSection}
                </button>
                <button className="retry-button" onClick={onRetry}>
                  {tamilLabels.retrySection}
                </button>
              </>
            )
          ) : (
            <>
              <p className="accuracy-warning">{tamilLabels.accuracyWarning}</p>
              <button className="retry-button" onClick={onRetry}>
                {islevelcompleted ? tamilLabels.retryLevel : tamilLabels.retrySection}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelResults;  


 
// import React from "react";
// import "./LevelResults.css";

// const LevelResults = () => {
//   // Hardcoded test values
//   const wpm = 45;
//   const cpm = 200;
//   const accuracy = 75; // Change this to test different accuracy thresholds
//   const errorByTamilChar = { "அ": 5, "ம": 3, "ந": 2 }; // Mock error counts
//   const currentLevel = 2;
//   const section = 1;
//   const islevelcompleted = false;
  
//   const levelContent = [
//     { sections: [1, 2, 3] },
//     { sections: [1, 2, 3] }
//   ];

//   const errorEntries = Object.entries(errorByTamilChar).sort((a, b) => b[1] - a[1]);

//   // Determine if this is the last section in the level
//   const isLastSection =
//     levelContent[currentLevel - 1] &&
//     section === levelContent[currentLevel - 1].sections.length - 1;

//   // Tamil translations
//   const tamilLabels = {
//     level: "நிலை",
//     section: "பிரிவு",
//     completed: "நிறைவடைந்தது!",
//     wpm: "நிமிடத்திற்கு சொற்கள்",
//     cpm: "நிமிடத்திற்கு எழுத்துக்கள்",
//     accuracy: "துல்லியம்",
//     nextLevel: "அடுத்த நிலை ➔",
//     nextSection: "அடுத்த பிரிவு ➔",
//     retryLevel: "நிலையை மீண்டும் முயற்சி செய்க 🔄",
//     retrySection: "பிரிவை மீண்டும் முயற்சி செய்க 🔄",
//     allLevelsCompleted: "🎉 அனைத்து நிலைகளும் நிறைவடைந்தன! 🎉",
//     playAgain: "மீண்டும் விளையாடு",
//     accuracyWarning: "குறைந்தபட்சம் 80% துல்லியம் தேவை"
//   };

//   return (
//     <div className="level-results-container">
//       <div className="level-results">
//         <h3 className="result-title">
//           {islevelcompleted
//             ? `${tamilLabels.level} ${currentLevel} ${tamilLabels.completed}`
//             : `${tamilLabels.section} ${section + 1} ${tamilLabels.completed}`}
//         </h3>

//         <div className="metrics">
//           <div className="metric-item">
//             <span className="metric-label">{tamilLabels.wpm}:</span>
//             <span className="metric-value">{wpm}</span>
//           </div>

//           <div className="metric-item">
//             <span className="metric-label">{tamilLabels.cpm}:</span>
//             <span className="metric-value">{cpm}</span>
//           </div>

//           <div className="metric-item">
//             <span className="metric-label">{tamilLabels.accuracy}:</span>
//             <span className="metric-value">{accuracy}%</span>
//           </div>
//         </div>

        
//         <div className="level-actions">
//           {accuracy >= 40 ? (
//             islevelcompleted ? (
//               currentLevel < levelContent.length ? (
//                 <>
//                   <button className="proceed-button" onClick={() => alert("Next Level Clicked")}>
//                     {tamilLabels.nextLevel}
//                   </button>
//                   <button className="retry-button" onClick={() => alert("Retry Level Clicked")}>
//                     {tamilLabels.retryLevel}
//                   </button>
//                 </>
//               ) : (
//                 <div className="completed-all">
//                   <p>{tamilLabels.allLevelsCompleted}</p>
//                   <button className="start-button" onClick={() => alert("Play Again Clicked")}>
//                     {tamilLabels.playAgain}
//                   </button>
//                 </div>
//               )
//             ) : (
//               <>
//                 <button className="proceed-button" onClick={() => alert("Next Section Clicked")}>
//                   {tamilLabels.nextSection}
//                 </button>
//                 <button className="retry-button" onClick={() => alert("Retry Section Clicked")}>
//                   {tamilLabels.retrySection}
//                 </button>
//               </>
//             )
//           ) : (
//             <>
//               <p className="accuracy-warning">{tamilLabels.accuracyWarning}</p>
//               <button className="retry-button" onClick={() => alert("Retry Clicked")}>
//                 {islevelcompleted ? tamilLabels.retryLevel : tamilLabels.retrySection}
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LevelResults;



