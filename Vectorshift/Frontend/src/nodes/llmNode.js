import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";

export const LLMNode = (props) => {
  const handlePositions = [
    {
      type: "target",
      id: "input-1",
      position: Position.Left,
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target",
      position: Position.Left,
      id: "input-2",
      style: { top: `${200 / 3}%` },
    },
    {
      type: "source",
      id: "output-1",
      position: Position.Right,
    },
  ];

  return (
    <BaseNode {...props} nodeType="llm" handlePositions={handlePositions}>
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
