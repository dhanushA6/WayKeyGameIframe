import React from "react";

const PauseResumeOverlay = ({ 
  isPaused, 
  onPause, 
  onResume, 
  onRestart, 
  onExit 
}) => {
  return (
    <>
      {/* Pause button shown during gameplay */}
      {!isPaused && (
        <button 
          className="pause-button" 
          onClick={onPause}
          aria-label="Pause game"
        >
          <span className="pause-icon">❚❚</span>
        </button>
      )}

      {/* Overlay shown when game is paused */}
      {isPaused && (
        <div className="pause-overlay">
          <div className="pause-overlay-content">
            <h2>Game Paused</h2>
            <div className="pause-options">
              <button 
                className="resume-button" 
                onClick={onResume}
              >
                தொடரவும்
              </button>
              <button 
                className="restart-button" 
                onClick={onRestart}
              >
                மீண்டும் தொடங்கு
              </button>
              <button 
                className="exit-button" 
                onClick={onExit}
              >
                வெளியேறு
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PauseResumeOverlay;