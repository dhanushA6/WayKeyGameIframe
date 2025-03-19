import React, { useEffect, useRef } from "react";

const InputArea = ({ inputText, tamilText, inputRef }) => {
  const tamilPreviewRef = useRef(null);

  // Automatically scroll the tamil-preview div to the bottom when tamilText changes
  useEffect(() => {
    if (tamilPreviewRef.current) {
      tamilPreviewRef.current.scrollTop = tamilPreviewRef.current.scrollHeight;
    }
  }, [tamilText]);

  // Automatically scroll the input field to the end when inputText changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [inputText]);

  return (
    <div className="input-area">
      <input
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={(e) => {}}
        placeholder="Start typing..."
        autoFocus
        className="hidden-input"
      />
      <div ref={tamilPreviewRef} className="tamil-preview">
        {tamilText}
      </div>
    </div>
  );
};

export default InputArea;