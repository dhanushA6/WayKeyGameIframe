import React from "react";

const GameInfo = ({
  timeLeft,
  currentLevel,
  levelContent,
  isFeedbackEnabled,
  toggleFeedback,
  selectedTime,
  setSelectedTime,
  gameActive,
  currentSectionTitle,
  // Add these new props
  setCurrentLevel,
  currentSectionIndex,
  setCurrentSectionIndex,
  setCurrentItemIndex
}) => {
  // Handle level change
  const handleLevelChange = (e) => {
    const newLevel = Number(e.target.value);
    setCurrentLevel(newLevel);
    setCurrentSectionIndex(0);
    setCurrentItemIndex(0);
  };

  // Handle section change
  const handleSectionChange = (e) => {
    const newSection = Number(e.target.value);
    setCurrentSectionIndex(newSection);
    setCurrentItemIndex(0);
  };

  return (
    <div className="game-info">
      <div className="time-section">Time: {timeLeft}s</div>
      
      {/* Level Selection Dropdown */}
      <div className="level-selector">
        <label htmlFor="level-select">Level: </label>
        <select
          id="level-select"
          value={currentLevel}
          onChange={handleLevelChange}
          disabled={gameActive}
        >
          {levelContent.map((level, index) => (
            <option key={index} value={index + 1}>
              Level {index + 1}: {level.description}
            </option>
          ))}
        </select>
      </div>

      {/* Section Selection Dropdown */}
      <div className="section-selector">
        <label htmlFor="section-select">Section: </label>
        <select
          id="section-select"
          value={currentSectionIndex}
          onChange={handleSectionChange}
          disabled={gameActive}
        >
          {levelContent[currentLevel - 1]?.sections.map((section, index) => (
            <option key={index} value={index}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      {/* Feedback Toggle */}
      
        <label className="toggle-container">
          <span className="toggle-label">
            {isFeedbackEnabled ? "Feedback On" : "Feedback Off"}
          </span>
          <div
            className={`toggle-switch ${isFeedbackEnabled ? "enabled" : ""}`}
            onClick={toggleFeedback}
          >
            <div className="toggle-slider"></div>
          </div>
        </label>
      

      {/* Time Selection Dropdown */}
      <div className="time-selector">
        <label htmlFor="time-select">Select Time: </label>
        <select
          id="time-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
          disabled={gameActive}
        >
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
          <option value={120}>2 minutes</option>
          <option value={180}>3 minutes</option>
        </select>
      </div>
    </div>
  );
};

export default GameInfo;