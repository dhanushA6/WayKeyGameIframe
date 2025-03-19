import React, { useRef, useEffect } from "react";
import getTamilToEnglishMap from '../components/utlis/getTamilToEnglishMap';
import phoneticMap from "./data/phoneticMap.json";

const TargetWord = ({ currentLevel, currentItem, currentKeyIndex, itemJustCompleted, paragraphFeedback, sectionTitle }) => {
  const paragraphRef = useRef(null);
  const cursorRef = useRef(null);

  // Effect to scroll to the cursor position when it changes
  useEffect(() => {
    if (currentLevel >= 4 && paragraphRef.current && cursorRef.current) {
      const container = paragraphRef.current;
      const cursor = cursorRef.current;
      
      // Calculate the position of the cursor relative to the container
      const cursorRect = cursor.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Check if cursor is out of view (either above or below)
      if (cursorRect.top < containerRect.top || cursorRect.bottom > containerRect.bottom) {
        // Scroll to make the cursor visible (middle of the container)
        const scrollAmount = cursor.offsetTop - container.offsetHeight / 2;
        container.scrollTop = Math.max(0, scrollAmount);
      }
    }
  }, [currentKeyIndex, currentLevel]);

  if (currentLevel <= 3) {
    // Break down the word into characters and highlight the current one
    let characterIndex = 0;
    let keyIndex = 0;
    const characters = [];
    
    while (characterIndex < currentItem.length) {
      // Find which keys produce this character
      const tamilToEnglishMap = getTamilToEnglishMap(phoneticMap);
      let charLength = 1;
      
      // Handle spaces explicitly
      if (currentItem[characterIndex] === " ") {
        const isCurrentChar = keyIndex === currentKeyIndex;
        
        characters.push(
          <span
            key={characterIndex}
            className={`char-container ${isCurrentChar ? "current-char" : ""} ${
              itemJustCompleted ? "item-completed" : ""
            } space-char`}
          >
            {isCurrentChar && <span className="cursor-pointer"></span>}
            {"\u00A0"} {/* Non-breaking space */}
          </span>
        );
        
        characterIndex += 1;
        keyIndex += 1;
        continue;
      } 
      
      // Try to find longest matching character (3, 2, or 1 units)
      for (let len = 4; len >= 1; len--) {
        if (characterIndex + len <= currentItem.length) {
          const tamilChar = currentItem.substring(
            characterIndex,
            characterIndex + len
          );
          if (tamilToEnglishMap[tamilChar]) {
            charLength = len;
            break;
          }
        }
      }
      
      const tamilChar = currentItem.substring(
        characterIndex,
        characterIndex + charLength
      );
      const keysForChar = tamilToEnglishMap[tamilChar] || "";
      
      // Calculate if this character is the current focus
      const isCurrentChar =
        keyIndex <= currentKeyIndex &&
        currentKeyIndex < keyIndex + keysForChar.length;
      
      characters.push(
        <span
          key={characterIndex}
          className={`char-container ${isCurrentChar ? "current-char" : ""} ${
            itemJustCompleted ? "item-completed" : ""
          }`}
        >
          {isCurrentChar && <span className="cursor-pointer"></span>}
          {tamilChar}
        </span>
      );
      
      characterIndex += charLength;
      keyIndex += keysForChar.length;
    }
    
    return <div className="current-word">{characters}</div>;
  }
  
  // For levels 4 and above, use paragraph feedback with cursor
  const renderParagraphWithCursor = () => {
    // Find the cursor position first
    const tamilToEnglishMap = getTamilToEnglishMap(phoneticMap);
    let runningKeyIndex = 0;
    let cursorCharIndex = -1;
    
    // Calculate cursor position
    for (let i = 0; i < paragraphFeedback.length; i++) {
      const char = paragraphFeedback[i];
      const nextKeyCount = char.char === " " ? 1 : (tamilToEnglishMap[char.char] || [char.char]).length;
      
      if (currentKeyIndex >= runningKeyIndex && currentKeyIndex < runningKeyIndex + nextKeyCount) {
        cursorCharIndex = i;
        break;
      }
      
      runningKeyIndex += nextKeyCount;
    }
    
    // Render paragraph with cursor
    return paragraphFeedback.map((char, index) => (
      <span
        key={index}
        className={`char-container paragraph-char ${char.status}`}
        ref={index === cursorCharIndex ? cursorRef : null}
      >
        {index === cursorCharIndex && <span className="cursor-pointer"></span>}
        {char.char === " " ? "\u00A0" : char.char}
      </span>
    ));
  };
  
  return (
    <div className="current-word paragraph-mode" ref={paragraphRef}>
      {renderParagraphWithCursor()}
    </div>
  );
};
 
export default TargetWord;