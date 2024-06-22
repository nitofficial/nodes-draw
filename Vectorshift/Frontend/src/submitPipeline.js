import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const SubmitPipeline = ({ nodes, edges }) => {
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
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default SubmitPipeline;
