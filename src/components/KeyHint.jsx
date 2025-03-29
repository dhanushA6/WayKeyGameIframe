import React from "react";

const KeyHint = ({ tamilCharMap, currentKeyIndex, highlightedKey }) => {
  if (!tamilCharMap || tamilCharMap.length === 0) return null;

  // Find the current character based on the currentKeyIndex
  const currentChar = tamilCharMap.find(
    (char) =>
      currentKeyIndex >= char.startIndex && currentKeyIndex <= char.endIndex
  );

  if (!currentChar) return null;

  // Handle both array and string cases for englishKeys
  const engKeys = Array.isArray(currentChar.englishKeys)
    ? currentChar.englishKeys.join("")
    : currentChar.englishKeys;

  return (
    <div className="key-hint">
      {currentChar.tamilChar === " " ? (
        <p>
          <span className="highlighted-key"> Press Space </span>
        </p>
      ) : (
        <p>
          <span className="highlighted-key">{currentChar.tamilChar}</span>
          <span style={{ margin: "0 10px" }}>
            {" "}
            ➔ <span className="highlighted-key">{engKeys}</span>{" "}
          </span>
        </p>
      )}
    </div>
  );
};
export default KeyHint;
