import React, { useState } from "react";

function SimpleForm() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(text);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {submitted && <p>You typed: {submitted}</p>}
    </div>
  );
}

export default SimpleForm;
