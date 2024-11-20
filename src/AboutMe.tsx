import React from "react";
import { useParams, useLocation } from "react-router-dom";

const AboutMe = () => {
  const { id } = useParams<{ id?: string }>(); // Allow `id` to be undefined
  const location = useLocation();
  const pet = location.state;

  if (!pet) {
    return (
      <p>
        Pet data not available for URL:{" "}
        {id ? decodeURIComponent(id) : "Unknown"}
      </p>
    );
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <img
        src={pet.url}
        alt={pet.title}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <h1>{pet.title}</h1>
      <p style={{ marginTop: "10px", fontSize: "18px", color: "#666" }}>{pet.description}</p>
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#aaa" }}>Created: {pet.created}</p>
    </div>
  );
};

export default AboutMe;
