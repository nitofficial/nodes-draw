import { useState, useRef } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { TextField, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    resize: "none",
    overflow: "hidden",
  },
}));
const Label = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
export const TextNode = (props) => {
  const [currText, setCurrText] = useState(props.data?.text || "{{input}}");
  const [handles, setHandles] = useState([]);
  const textRef = useRef(null);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);

    const variables = Array.from(
      text.matchAll(/{{\s*(\w+)\s*}}/g),
      (m) => m[1]
    );
    setHandles(
      variables.map((variable, index) => ({
        id: `${props.id}-${variable}`,
        position: { top: `${(index + 1) * 25}px` },
      }))
    );
  };

  const handlePositions = [
    ...handles.map((handle, index) => ({
      type: "target",
      position: Position.Left,
      id: handle.id,
      style: handle.position,
    })),
    { type: "source", position: Position.Right, id: "output" },
  ];

  return (
    <BaseNode {...props} nodeType="text" handlePositions={handlePositions}>
      <div>
        <FormControl fullWidth variant="outlined">
          <Label>Text:</Label>
          <StyledTextField
            inputRef={textRef}
            value={currText}
            onChange={handleTextChange}
            multiline
            variant="outlined"
            minRows={1}
            maxRows={Infinity}
          />
        </FormControl>
      </div>
    </BaseNode>
  );
};
