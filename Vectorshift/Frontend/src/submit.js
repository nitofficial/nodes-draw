import React from "react";
import { useNodes, useEdges } from "reactflow";
import axios from "axios";
import { styled } from "@mui/material";

const SubmitButton = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const SubmitButton = styled("div")({
    minWidth: "80px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    border: "2px solid #6e31f375",
    justifyContent: "center",
    flexDirection: "column",
    "&:hover": {
      boxShadow: "0 0px 10px #BC7DFF", // Apply box-shadow only on hover
    },
    borderRadius: "15px",
  });
  const Label = styled("span")({
    color: "#6e31f3",
    fontFamily: "sans-serif",
    fontWeight: 500,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const pipeline = { nodes, edges };
      const res = await axios.post(
        "http://127.0.0.1:8000/pipelines/parse",
        pipeline
      );
      const data = res.data;
      alert(
        `Number of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
      );
    } catch (error) {
      console.error("Error submitting pipeline", error);
      alert("Failed to submit the pipeline. Check the console for details.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SubmitButton onClick={handleSubmit}>
        <Label>Submit</Label>
      </SubmitButton>
    </div>
  );
};

export default SubmitButton;
