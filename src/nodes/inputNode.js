import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";

export const InputNode = (props) => {
  const handlePositions = [
    {
      id: "output-1",
      type: "source",
      position: Position.Right,
    },
  ];

  return (
    <BaseNode {...props} nodeType="input" handlePositions={handlePositions}>
      {/* Additional InputNode specific content can go here */}
    </BaseNode>
  );
};
