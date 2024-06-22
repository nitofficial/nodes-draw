import { styled } from "@mui/material";

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };
  const DraggableButton = styled("div")({
    cursor: "grab",
    minWidth: "80px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    backgroundColor: "#B1AFFF",
    justifyContent: "center",
    flexDirection: "column",
    boxShadow: `0 0 10px #BC7DFF`,
    borderRadius: "5px",
  });
  const Label = styled("span")({
    color: "#7752FE",
  });
  return (
    <DraggableButton
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{}}
      draggable
    >
      <Label>{label}</Label>
    </DraggableButton>
  );
};
