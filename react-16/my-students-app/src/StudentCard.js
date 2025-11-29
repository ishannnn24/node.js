import React from "react";

function StudentCard({ name, course, score }) {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <h2>{name}</h2>
      <p>Course: {course}</p>
      <p>Score: {score}</p>
    </div>
  );
}

export default StudentCard;
