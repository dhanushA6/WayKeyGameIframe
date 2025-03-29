// import React from "react";

// const GameControls = ({ onStart, onRetry, onNextLevel, levelCompleted, accuracy }) => {
//   return (
//     <div className="game-controls">
//       {levelCompleted && (
//         <button className="start-button" onClick={onStart}>
//           Start Game
//         </button>
//       )}
//       {levelCompleted && accuracy >= 80 && (
//         <button className="proceed-button" onClick={onNextLevel}>
//           Next Level ➔
//         </button>
//       )}
//       {levelCompleted && (
//         <button className="retry-button" onClick={onRetry}>
//           Retry Level 🔄
//         </button>
//       )}
//     </div>
//   );
// };

// export default GameControls; 



import React from "react";

const GameControls = ({ 
  onStart, 
  onRetry, 
  onNextLevel, 
  levelCompleted, 
  accuracy,
  currentLevel,
  currentSection,
  levelContent,
  gameActive
}) => {
  // Determine if we should show the overlay
  const showOverlay = !gameActive && !levelCompleted;
  
  // Get section title and level title if available
  const getLevelTitle = () => {
    if (!levelContent || !levelContent[currentLevel - 1]) return `கடினம் ${currentLevel}`;
    return levelContent[currentLevel - 1].title || `கடினம் ${currentLevel}`;
  };
  
  const getSectionTitle = () => {
    if (!levelContent || 
        !levelContent[currentLevel - 1] || 
        !levelContent[currentLevel - 1].sections || 
        !levelContent[currentLevel - 1].sections[currentSection]) {
      return `Section ${currentSection + 1}`;
    }
    return levelContent[currentLevel - 1].sections[currentSection].title || `Section ${currentSection + 1}`;
  };

  return (
    <div className="game-controls">
      {showOverlay && (
        <div className="game-overlay">
          <div className="overlay-content">
            <h2 className="level-title">{getLevelTitle()}</h2>
            <h3 className="section-title">{getSectionTitle()}</h3>
            
            <div className="level-description">
              {levelContent && 
               levelContent[currentLevel - 1] && 
               levelContent[currentLevel - 1].description && (
                <p>{levelContent[currentLevel - 1].description}</p>
              )}
            </div>
            
            <button className="start-button" onClick={onStart}>
            தொடங்கு
            </button>
          </div>
        </div>
      )}
      
      {levelCompleted && (
        <button className="start-button" onClick={onStart}>
         தொடங்கு
        </button>
      )}
    </div>
  );
};

export default GameControls;