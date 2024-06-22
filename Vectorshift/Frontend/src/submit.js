import React from "react";
import { useNodes, useEdges } from "reactflow";
import SubmitPipeline from "./submitPipeline";

export const SubmitButton = () => {
  const nodes = useNodes();
  const edges = useEdges();

  return <SubmitPipeline nodes={nodes} edges={edges} />;
};
