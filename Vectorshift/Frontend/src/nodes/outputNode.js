import { BaseNode } from "./BaseNode";
import { Position } from "reactflow";

export const OutputNode = (props) => {
  const handlePositions = [
    {
      id: "input-1",
      type: "target",
      position: Position.Left,
    },
  ];

  return (
    <BaseNode {...props} nodeType="output" handlePositions={handlePositions}>
      {/* Additional OutputNode specific content can go here */}
    </BaseNode>
  );
};
