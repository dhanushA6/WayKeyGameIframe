import React, { useState, useEffect, useRef } from "react";
import GameControls from "./components/GameControls";
import GameInfo from "./components/GameInfo";
import TargetWord from "./components/TargetWord";
import InputArea from "./components/InputArea";
import Keyboard from "./components/Keyboard";
import LevelResults from "./components/LevelResults";
import KeyFeedback from "./components/KeyFeedback";
import getTamilToEnglishMap from "./components/utlis/getTamilToEnglishMap";
import convertToTamil from "./components/utlis/convertToTamil";
import levelContent from "./components/data/levelContent";
import phoneticMap from "./components/data/phoneticMap.json";
import "./Responsive.css";
import KeyHint from "./components/KeyHint";  
import keyBoardLabel from "./components/data/keyBoardLabel"; 
import SpecialKey from "./components/data/SpecialKey"; 
import shiftMap from "./components/data/shiftMap";
import RealtimeMetrics from "./components/RealtimeMetrics "; 
import PauseResumeOverlay  from "./components/Pause"


const TamilTypingTest = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [shiftOn, setShiftOn] = useState(false);
  const [inputText, setInputText] = useState("");
  const [tamilText, setTamilText] = useState("");
  const [timeLeft, setTimeLeft] = useState(500);
  const [gameActive, setGameActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [expectedKeys, setExpectedKeys] = useState([]);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [highlightedKey, setHighlightedKey] = useState("");
  const [wrongKeyPressed, setWrongKeyPressed] = useState(""); 

  const [isPaused, setIsPaused] = useState(false);


  const [correctTamilChars, setCorrectTamilChars] = useState(0);
  const [errorTamilChars, setErrorTamilChars] = useState(0);
  const [totalTamilCharsTyped, setTotalTamilCharsTyped] = useState(0);
  const [processedTamilChars, setProcessedTamilChars] = useState(new Set());

  const [correctKeysPressed, setCorrectKeysPressed] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [keyFeedback, setKeyFeedback] = useState({ key: "", status: "" });
  const [paragraphFeedback, setParagraphFeedback] = useState([]);
  const [tamilCharMap, setTamilCharMap] = useState([]);

  const [levelCompleted, setLevelCompleted] = useState(false);
  const [sectionCompleted, setSectionCompleted] = useState(false);
  const [levelMetrics, setLevelMetrics] = useState(null);
  const [errorByTamilChar, setErrorByTamilChar] = useState({});
  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(false);
  const [itemJustCompleted, setItemJustCompleted] = useState(false);
  const [selectedTime, setSelectedTime] = useState(180); // State for selected time
  

  const [realtimeWPM, setRealtimeWPM] = useState(0);
  const [realtimeCPM, setRealtimeCPM] = useState(0);
  const [realtimeAccuracy, setRealtimeAccuracy] = useState(100);
  const startTimeRef = useRef(null);  


  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const keyFeedbackTimerRef = useRef(null); 

  useEffect(() => {
    if (gameActive) {
      startTimeRef.current = Date.now();
    }
  }, [gameActive]);
  

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timerRef.current); // Stop the timer
  };

   
  // Function to resume the game
const handleResume = () => {
  setIsPaused(false);
  
  // Restart the timer where it left off
  if (gameActive) {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishSection();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  
  // Re-focus the input field
  inputRef.current?.focus();
}; 

const handleExitLevel = () => {
  setIsPaused(false);
  resetGameState();
  // Additional logic if needed to return to level selection
};



   // Add a new useEffect to calculate real-time metrics
   useEffect(() => {
    if (gameActive && startTimeRef.current) {
      const calculateMetrics = () => {
        const elapsedTimeInSeconds = (Date.now() - startTimeRef.current) / 1000;
        if (elapsedTimeInSeconds > 0) {
          // Calculate WPM - Words per minute (Tamil characters / 5 * 60 / elapsed time)
          const wpm = Math.round((correctTamilChars / 5) * (60 / elapsedTimeInSeconds)) || 0;
          
          // Calculate CPM - Characters per minute (Tamil characters * 60 / elapsed time)
          const cpm = Math.round(correctTamilChars * (60 / elapsedTimeInSeconds)) || 0;
          
          // Calculate accuracy - correct characters / total characters typed * 100
          const accuracy = totalTamilCharsTyped > 0 
            ? Math.round((correctTamilChars / totalTamilCharsTyped) * 100) 
            : 100;
          
          setRealtimeWPM(wpm);
          setRealtimeCPM(cpm);
          setRealtimeAccuracy(accuracy);
        }
      };
      
      // Set up interval to update metrics every 500ms
      const metricsInterval = setInterval(calculateMetrics, 500);
      
      return () => clearInterval(metricsInterval);
    }
  }, [gameActive, correctTamilChars, totalTamilCharsTyped]); 

  // Game initialization and keyboard mapping
  useEffect(() => {
    if (gameActive && levelContent[currentLevel - 1]) {
      const currentSection =
        levelContent[currentLevel - 1].sections[currentSectionIndex];
      const currentItem = currentSection.content[currentItemIndex];
      const tamilToEnglishMap = getTamilToEnglishMap(phoneticMap);

      const expectedKeySequence = [];
      const charMap = [];
      let i = 0;

      while (i < currentItem.length) {
        let found = false;

        // Handle spaces explicitly
        if (currentItem[i] === " ") {
          const startIndex = expectedKeySequence.length;
          expectedKeySequence.push(" ");
          charMap.push({
            tamilChar: " ",
            startIndex: startIndex - 1,
            endIndex: expectedKeySequence.length - 1,
            length: 1,
            englishKeys: " ",
            isSpace: true,
          });
          i++;
          continue;
        }

        // Prioritize compound characters (up to 4 characters long)
        for (let len = 4; len >= 1; len--) {
          if (i + len <= currentItem.length) {
            const tamilChar = currentItem.substring(i, i + len);

            // Check if the Tamil character exists in the map
            if (tamilToEnglishMap[tamilChar]) {
              const englishSeq = tamilToEnglishMap[tamilChar];
              const startIndex = expectedKeySequence.length;

              // Push the English sequence for the Tamil character
              expectedKeySequence.push(...englishSeq);

              // Map the Tamil character to its English keys
              charMap.push({
                tamilChar,
                startIndex,
                endIndex: startIndex + englishSeq.length - 1,
                length: len,
                englishKeys: englishSeq,
                isSpace: false,
              });

              // Move the index forward by the length of the Tamil character
              i += len;
              found = true;
              break;
            }
          }
        }

        // If no compound character is found, treat it as a single character
        if (!found) {
          const tamilChar = currentItem[i];
          expectedKeySequence.push(tamilChar);
          charMap.push({
            tamilChar,
            startIndex: expectedKeySequence.length - 1,
            endIndex: expectedKeySequence.length - 1,
            length: 1,
            englishKeys: tamilChar,
            isSpace: false,
          });
          i++;
        }
      }

      // Update states
      setExpectedKeys(expectedKeySequence);
      setTamilCharMap(charMap);
      setCurrentKeyIndex(0);
      setProcessedTamilChars(new Set());

      // For levels 4 and above, initialize paragraph feedback
      if (currentLevel >= 4) {
        setParagraphFeedback(
          charMap.map((char) => ({
            char: char.tamilChar,
            status: "pending",
            isSpace: char.isSpace,
          }))
        );
      }

      // Highlight the first key in the sequence
      setHighlightedKey(expectedKeySequence[0] || "");
    }
  }, [gameActive, currentLevel, currentSectionIndex, currentItemIndex]);

  // Physical keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive || isPaused) return; // Don't process keys when paused

      e.preventDefault();
      if (e.key === "Backspace") {
        handleBackspace();
        return;
      }

      if (e.key.length === 1 || e.key === " ") {
        processKeyPress(e.key);
      }
    };

    const handleKeyUp = (e) => {
      // if (e.key === "Shift") setShiftOn(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameActive, isPaused, shiftOn, currentKeyIndex, expectedKeys]);

  // Focus management
  useEffect(() => {
    if (gameActive) inputRef.current?.focus();
  }, [gameActive]);

  useEffect(() => {
    if (gameActive && !isPaused) { // Only run timer when not paused
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishSection();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameActive, isPaused]); // Add isPaused to dependencies



  // Game logic functions
  const processKeyPress = (pressedKey) => {
    const expectedKey = expectedKeys[currentKeyIndex];

    if (!expectedKey) return;

    // Find the current Tamil character being typed
    const currentCharInfo = tamilCharMap.find(
      (char) =>
        currentKeyIndex >= char.startIndex && currentKeyIndex <= char.endIndex
    );

    if (currentCharInfo) {
      // Special handling for spaces

      if (currentCharInfo.isSpace) {
        if (pressedKey === " " && currentCharInfo.tamilChar === " ") {
          handleCorrectKey(pressedKey);
        } else {
          handleError(pressedKey);
        }
        return;
      }

      // Get all valid key sequences for this Tamil character from the phonetic map
      const tamilChar = currentCharInfo.tamilChar;
      const validSequences = Object.keys(phoneticMap).filter(
        (key) => phoneticMap[key] === tamilChar
      );

      // Check if the current key sequence + pressed key matches any valid sequence
      // Get current partial input for this Tamil character
      const currentPartialInput = inputText.slice(
        currentCharInfo.startIndex,
        currentKeyIndex
      );
      const newPotentialInput = currentPartialInput + pressedKey;

      // Check if any valid sequence starts with our new potential input
      const isValidKeyPress = validSequences.some(
        (seq) => seq === newPotentialInput
      );

      if (isFeedbackEnabled || currentLevel <= 3) {
        if (pressedKey == expectedKeys[currentKeyIndex]) {
          handleCorrectKey(pressedKey);
        } else {
          handleError(pressedKey);
        }
      } else {
        if (isValidKeyPress) {
          handleCorrectKey(pressedKey);
        } else {
          handleError(pressedKey);
        }
      }
    } else {
      // Fallback to original behavior for non-Tamil characters
      if (pressedKey === expectedKey) {
        handleCorrectKey(pressedKey);
      } else {
        handleError(pressedKey);
      }
    }
  };

  const handleCorrectKey = (key) => {
    setWrongKeyPressed("");
    setCorrectKeysPressed((prev) => prev + 1);
    setInputText((prev) => prev + key);
    setTamilText((prev) => convertToTamil(inputText + key));

    if (isFeedbackEnabled || currentLevel <= 3) showKeyFeedback(key, "correct");

    // Check if this is the last key of a Tamil character
    const charInfo = tamilCharMap.find(
      (char) =>
        currentKeyIndex >= char.startIndex && currentKeyIndex <= char.endIndex
    );

    // Update paragraph feedback for both characters and spaces
    updateParagraphFeedback(currentKeyIndex, 1);

    if (charInfo && currentKeyIndex === charInfo.endIndex) {
      // This is the last key of a Tamil character or a space
      if (!processedTamilChars.has(charInfo.startIndex)) {
        setCorrectTamilChars((prev) => prev + 1);
        setTotalTamilCharsTyped((prev) => prev + 1);
        setProcessedTamilChars((prev) => {
          const newSet = new Set(prev);
          newSet.add(charInfo.startIndex);
          return newSet;
        });
      }
    }

    if (currentKeyIndex < expectedKeys.length - 1) {
      const nextKeyIndex = currentKeyIndex + 1;
      setCurrentKeyIndex(nextKeyIndex);
      setHighlightedKey(expectedKeys[nextKeyIndex]);
    } else {
      setItemJustCompleted(true);
      setTimeout(() => {
        setItemJustCompleted(false);
        advanceToNextSegment();
      }, 500);
    } 

    if (startTimeRef.current) {
      const elapsedTimeInSeconds = (Date.now() - startTimeRef.current) / 1000;
      if (elapsedTimeInSeconds > 0) {
        // Update metrics if a Tamil character was completed
        const charInfo = tamilCharMap.find(
          (char) => currentKeyIndex >= char.startIndex && currentKeyIndex <= char.endIndex
        );
        
        if (charInfo && currentKeyIndex === charInfo.endIndex) {
          // This is the last key of a Tamil character
          const newCorrectChars = correctTamilChars + 1;
          const newTotalChars = totalTamilCharsTyped + 1;
          
          const wpm = Math.round((newCorrectChars / 5) * (60 / elapsedTimeInSeconds)) || 0;
          const cpm = Math.round(newCorrectChars * (60 / elapsedTimeInSeconds)) || 0;
          const accuracy = Math.round((newCorrectChars / newTotalChars) * 100) || 100;
          
          setRealtimeWPM(wpm);
          setRealtimeCPM(cpm);
          setRealtimeAccuracy(accuracy);
        }
      }
    }

  };

  const handleError = (pressedKey) => {
    setWrongKeyPressed(pressedKey);
    setErrorCount((prev) => prev + 1);
    if (isFeedbackEnabled || currentLevel <= 3)
      showKeyFeedback(pressedKey, "wrong");

    const charInfo = tamilCharMap.find(
      (char) =>
        currentKeyIndex >= char.startIndex && currentKeyIndex <= char.endIndex
    );

    if (charInfo) {
      // Track errors by Tamil character or space
      setErrorByTamilChar((prev) => ({
        ...prev,
        [charInfo.tamilChar]: (prev[charInfo.tamilChar] || 0) + 1,
      }));

      // If this is the first error for this Tamil character or space, increment the error count
      if (!processedTamilChars.has(charInfo.startIndex)) {
        setErrorTamilChars((prev) => prev + 1);
        setTotalTamilCharsTyped((prev) => prev + 1);
        setProcessedTamilChars((prev) => {
          const newSet = new Set(prev);
          newSet.add(charInfo.startIndex);
          return newSet;
        });
      }
    }

    if (currentLevel >= 4 && isFeedbackEnabled === false) {
      if (charInfo && currentKeyIndex === charInfo.endIndex) {
        updateParagraphFeedback(currentKeyIndex, 3);
      } else {
        updateParagraphFeedback(currentKeyIndex, 2);
      }

      if (currentKeyIndex < expectedKeys.length - 1) {
        const nextKeyIndex = currentKeyIndex + 1;
        setCurrentKeyIndex(nextKeyIndex);
        setHighlightedKey(expectedKeys[nextKeyIndex]);
        setInputText((prev) => prev + pressedKey);
        setTamilText((prev) => convertToTamil(inputText + pressedKey));
      } else {
        advanceToNextSegment();
      }
    } 

    if (startTimeRef.current) {
      const elapsedTimeInSeconds = (Date.now() - startTimeRef.current) / 1000;
      if (elapsedTimeInSeconds > 0) {
        // Update metrics if this is the first error for this Tamil character
        const charInfo = tamilCharMap.find(
          (char) => currentKeyIndex >= char.startIndex && currentKeyIndex <= char.endIndex
        );
        
        if (charInfo && !processedTamilChars.has(charInfo.startIndex)) {
          const newTotalChars = totalTamilCharsTyped + 1;
          
          const wpm = Math.round((correctTamilChars / 5) * (60 / elapsedTimeInSeconds)) || 0;
          const cpm = Math.round(correctTamilChars * (60 / elapsedTimeInSeconds)) || 0;
          const accuracy = Math.round((correctTamilChars / newTotalChars) * 100) || 0;
          
          setRealtimeWPM(wpm);
          setRealtimeCPM(cpm);
          setRealtimeAccuracy(accuracy);
        }
      }
    }
    
  };

  const handleBackspace = () => {
    if (currentLevel >= 4 && currentKeyIndex > 0) {
      const newKeyIndex = currentKeyIndex - 1;
      setCurrentKeyIndex(newKeyIndex);
      setHighlightedKey(expectedKeys[newKeyIndex]);
      setInputText((prev) => prev.slice(0, -1));
      setTamilText((prev) => convertToTamil(inputText.slice(0, -1)));

      // Find the Tamil character or space associated with this key
      const charInfo = tamilCharMap.find(
        (char) => newKeyIndex >= char.startIndex && newKeyIndex <= char.endIndex
      );

      if (charInfo) {
        // If we're going back to the start of a Tamil character or space, remove it from processed set
        if (newKeyIndex === charInfo.startIndex) {
          setProcessedTamilChars((prev) => {
            const newSet = new Set(prev);
            newSet.delete(charInfo.startIndex);
            return newSet;
          });
        }

        // Reset the feedback status for this character or space
        setParagraphFeedback((prev) =>
          prev.map((item, idx) =>
            idx === tamilCharMap.indexOf(charInfo)
              ? { ...item, status: "pending" }
              : item
          )
        );
      }
    }
  };

  // Game progression
  const advanceToNextSegment = () => {
    const currentSection =
      levelContent[currentLevel - 1].sections[currentSectionIndex];

    if (currentItemIndex < currentSection.content.length - 1) {
      // Move to next item in current section
      setCurrentItemIndex((prev) => prev + 1);
    } else if (
      currentSectionIndex <
      levelContent[currentLevel - 1].sections.length - 1
    ) {
      // Move to next section
      finishSection();
    } else {
      // Finish level
      finishLevel();
    }

    setInputText("");
    setTamilText("");
    setProcessedTamilChars(new Set());
  };

  const finishSection = () => {
    // Convert time from seconds to minutes for WPM calculation
    const timeElapsedInMinutes = (selectedTime - timeLeft) / 60;
  
    // Calculate Tamil character based metrics
    const totalTamilChars = tamilCharMap.length;
    const tamilWPM = timeElapsedInMinutes > 0 
      ? Math.round((correctTamilChars / 5) / timeElapsedInMinutes) || 0
      : 0;
    const tamilCPM = timeElapsedInMinutes > 0 
      ? Math.round(correctTamilChars / timeElapsedInMinutes) || 0
      : 0;
    const tamilAccuracy = totalTamilCharsTyped > 0
      ? Math.round((correctTamilChars / totalTamilCharsTyped) * 100) || 0
      : 0;
  
    setLevelMetrics({
      wpm: tamilWPM,
      cpm: tamilCPM,
      accuracy: tamilAccuracy,
      errorByTamilChar,
      totalTamilChars,
      correctTamilChars,
      errorTamilChars,
    });
  
    setGameActive(false);
    setSectionCompleted(true);
    setLevelCompleted(false);
    clearInterval(timerRef.current);
  };
  
  // Replace the finishLevel function with this corrected version
  const finishLevel = () => {
    // Convert time from seconds to minutes for WPM calculation
    const timeElapsedInMinutes = (selectedTime - timeLeft) / 60;
  
    // Calculate Tamil character based metrics
    const totalTamilChars = tamilCharMap.length;
    const tamilWPM = timeElapsedInMinutes > 0 
      ? Math.round((correctTamilChars / 5) / timeElapsedInMinutes) || 0
      : 0;
    const tamilCPM = timeElapsedInMinutes > 0 
      ? Math.round(correctTamilChars / timeElapsedInMinutes) || 0
      : 0;
    const tamilAccuracy = totalTamilCharsTyped > 0
      ? Math.round((correctTamilChars / totalTamilCharsTyped) * 100) || 0
      : 0;
  
    setLevelMetrics({
      wpm: tamilWPM,
      cpm: tamilCPM,
      accuracy: tamilAccuracy,
      errorByTamilChar,
      totalTamilChars,
      correctTamilChars,
      errorTamilChars,
    });
  
    setGameActive(false);
    setLevelCompleted(true);
    setSectionCompleted(false);
    clearInterval(timerRef.current);
  };

  // UI helper functions
  const showKeyFeedback = (key, status) => {
    setKeyFeedback({ key, status });
    clearTimeout(keyFeedbackTimerRef.current);
    keyFeedbackTimerRef.current = setTimeout(
      () => setKeyFeedback({ key: "", status: "" }),
      600
    );
  };

  const toggleFeedback = () => {
    setIsFeedbackEnabled((prev) => !prev);
  };

  const updateParagraphFeedback = (keyIndex, isCorrect) => {
    if (currentLevel < 4) return;

    const charInfo = tamilCharMap.find(
      (char) => keyIndex >= char.startIndex && keyIndex <= char.endIndex
    );

    if (charInfo) {
      setParagraphFeedback((prev) =>
        prev.map((item, idx) =>
          idx === tamilCharMap.indexOf(charInfo)
            ? {
                ...item,
                status:
                  isCorrect == 1
                    ? "correct"
                    : isCorrect == 2
                    ? "partial"
                    : "wrong",
              }
            : item
        )
      );
    }
  };

  // Game control functions
  const startGame = () => {
    setGameActive(true);
    setGameComplete(false);
    setLevelCompleted(false);
    setSectionCompleted(false);
    setTimeLeft(500); // Use selected time
    setCorrectKeysPressed(0); 
    setErrorCount(0); 
    setCurrentLevel(currentLevel);
    setCorrectTamilChars(0);
    setErrorTamilChars(0);
    setTotalTamilCharsTyped(0);
    setProcessedTamilChars(new Set());
    setErrorByTamilChar({});
    setShiftOn(false);
    inputRef.current?.focus();
  };

  const proceedToNextLevel = () => {
    if (currentLevel < levelContent.length) {
      setCurrentLevel((prev) => prev + 1);
      setCurrentSectionIndex(0);
      setCurrentItemIndex(0);
      resetGameState();
    } else {
      setGameComplete(true);
    }
  };

  const proceedToNextSection = () => {
    if (
      currentSectionIndex <
      levelContent[currentLevel - 1].sections.length - 1
    ) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentItemIndex(0);
      resetSectionState();
    } else {
      // This shouldn't happen but just in case
      finishLevel();
    }
  };

  const retryLevel = () => { 
    setIsPaused(false);
    if (sectionCompleted) {
      // Retry current section
      resetSectionState();
    } else {
      // Retry entire level
      resetGameState();
      setCurrentSectionIndex(0);
      setCurrentItemIndex(0);
    }
    // startGame();
  };

  const retrySection = () => { 
    setIsPaused(false);
    if (sectionCompleted) {
      // Retry current section
      resetSectionState();
    } else {
      // Retry entire level
      resetGameState();
      setCurrentSectionIndex(0);
      setCurrentItemIndex(0);
    }
    // startGame();
  };


  const resetSectionState = () => {
    setInputText("");
    setTamilText("");
    setErrorByTamilChar({});
    setLevelCompleted(false);
    setSectionCompleted(false);
    setLevelMetrics(null);
    setCorrectKeysPressed(0);
    setErrorCount(0);
    setCorrectTamilChars(0);
    setErrorTamilChars(0);
    setTotalTamilCharsTyped(0);
    setProcessedTamilChars(new Set());
    setGameActive(false);
    setTimeLeft(selectedTime);
    setCurrentItemIndex(0); 

    setRealtimeWPM(0);
    setRealtimeCPM(0);
    setRealtimeAccuracy(100);
    startTimeRef.current = null;
  };

  const resetGameState = () => {
    resetSectionState();
    setCurrentSectionIndex(0);
    setCurrentItemIndex(0); 

    setRealtimeWPM(0);
    setRealtimeCPM(0);
    setRealtimeAccuracy(100);
    startTimeRef.current = null;
  }; 




  useEffect(() => {
    const isUpperCase =
      /[A-Z!@#$%^&*()_+]/.test(highlightedKey) && highlightedKey !== " ";
    setShiftOn(isUpperCase);
  }, [highlightedKey]);

  // Helper function to get the current content item
  const getCurrentContent = () => {
    if (!levelContent[currentLevel - 1]) return null;

    const currentSection =
      levelContent[currentLevel - 1].sections[currentSectionIndex];
    if (!currentSection) return null;

    return currentSection.content[currentItemIndex];
  };

  // Helper function to get current section title
  const getCurrentSectionTitle = () => {
    if (!levelContent[currentLevel - 1]) return "";

    const currentSection =
      levelContent[currentLevel - 1].sections[currentSectionIndex];
    if (!currentSection) return "";

    return currentSection.title;
  };

  // Render components
  const renderKey = (key) => {
    const isSpecialKey =SpecialKey.includes(key);
    
    const displayKey = shiftOn ? shiftMap[key] || key.toUpperCase() : key;
    let isHighlighted = displayKey === highlightedKey;
    const hasFeedback = keyFeedback.key === displayKey;
    if (shiftOn && key === "Shift") {
      isHighlighted = true;
    }

    return (
      <button
        key={key}
        className={`key 
          ${
            isHighlighted && (isFeedbackEnabled || currentLevel <= 3)
              ? "highlighted"
              : ""
          }
          ${hasFeedback ? keyFeedback.status + "-feedback" : ""}
          ${isSpecialKey ? "special-key" : ""}
        `}
        style={{
          width:
            key === "Tab"
              ? "80px"
              : key === "Caps"
              ? "90px"
              : key === "Shift"
              ? "110px"
              : key === "Enter"
              ? "120px"
              : key === "Backspace"
              ? "140px"
              : key === "Ctrl" ||
                key === "Alt" ||
                key === "AltGr" ||
                key === "Win"
              ? "60px"
              : key === " "
              ? "400px"
              : "auto",
        }}
        tabIndex={-1}
      >
        {!isSpecialKey && (
          <>
            <div className="main-char">{displayKey}</div>
            <div className="shifted-char">{shiftMap[key] || ""}</div>
          </>
        )}
        {isSpecialKey && key}
      </button>
    );
  };

 
 return (
  <div className="tamil-typing-test">
    {!levelCompleted && !sectionCompleted && !gameComplete && (
      <div className="game-container">
        {gameActive && !isPaused && (
          <RealtimeMetrics
            realtimeWPM={realtimeWPM}
            realtimeCPM={realtimeCPM}
            realtimeAccuracy={realtimeAccuracy}
            timeLeft={timeLeft}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            gameActive={gameActive}
          />
        )}
        
        {gameActive && (
          <PauseResumeOverlay 
            isPaused={isPaused}
            onPause={handlePause}
            onResume={handleResume}
            onRestart={retryLevel}
            onExit={handleExitLevel}
          />
        )}
        
        {gameActive && !isPaused && (
          <>
            <TargetWord
              currentLevel={currentLevel}
              currentItem={getCurrentContent()}
              currentKeyIndex={currentKeyIndex}
              itemJustCompleted={itemJustCompleted}
              paragraphFeedback={paragraphFeedback}
              sectionTitle={getCurrentSectionTitle()}
            />
            
            <KeyHint
              tamilCharMap={tamilCharMap}
              currentKeyIndex={currentKeyIndex}
              highlightedKey={highlightedKey}
            />
            
            <InputArea
              inputText={inputText}
              tamilText={tamilText}
              inputRef={inputRef}
            />
            
            {(currentLevel <= 3) && (
              <Keyboard
                keys={keyBoardLabel}
                highlightedKey={highlightedKey}
                keyFeedback={keyFeedback}
                renderKey={renderKey}
              />
            )}
          </>
        )}
    {       
       !isPaused && (  <GameControls
          onStart={startGame}
          onRetry={retryLevel}
          onNextLevel={proceedToNextLevel}
          levelCompleted={levelCompleted}
          accuracy={levelMetrics?.accuracy}
          currentLevel={currentLevel}
          currentSection={currentSectionIndex}
          levelContent={levelContent}
          gameActive={gameActive && !isPaused}
        />)}
      </div>
    )}

    {(levelCompleted || sectionCompleted) && (
      <LevelResults
        {...levelMetrics}
        currentLevel={currentLevel}
        section={currentSectionIndex}
        islevelcompleted={levelCompleted}
        levelContent={levelContent}
        onStart={startGame}
        onRetry={retryLevel}
        onNextLevel={proceedToNextLevel}
        onNextSection={proceedToNextSection}
      />
    )}
  </div>
);
}; 

export default TamilTypingTest