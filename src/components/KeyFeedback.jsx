import React from "react";

const KeyFeedback = ({ keyFeedback }) => {
  return (
    <div className={`key-feedback ${keyFeedback.status}`}>
      {keyFeedback.key} - {keyFeedback.status}
    </div>
  );
};

export default KeyFeedback;