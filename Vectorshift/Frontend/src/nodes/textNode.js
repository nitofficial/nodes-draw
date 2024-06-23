import React, { useState, useEffect } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { TextField, FormControl } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const StyledTextField = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    resize: "none",
    overflow: "hidden",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #BEBEBE",
    },
    "&:hover fieldset": {
      border: "1px solid #707070",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #707070",
      boxShadow: "none",
    },
  },
});

const Label = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: "16px",
  color: "#555",
}));

const HelperText = styled(Typography)({});

export const TextNode = (props) => {
  const [currText, setCurrText] = useState(props.data?.text || "{{input}}");
  const [handles, setHandles] = useState([]);

  useEffect(() => {
    updateHandles(currText);
  }, [currText]);

  const updateHandles = (text) => {
    const variables = Array.from(
      text.matchAll(/{{\s*(\w+)\s*}}/g),
      (m) => m[1]
    );

    const newHandles = variables.map((variable, index) => ({
      id: `${props.id}-${variable}-${index + 1}`,
      position: { top: `${(index + 1) * 25}px` },
    }));

    setHandles(newHandles);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);
    updateHandles(text);
  };

  const handlePositions = [
    ...handles.map((handle) => ({
      type: "target",
      position: Position.Left,
      id: handle.id,
      style: handle.position,
    })),
    { type: "source", position: Position.Right, id: "textnode-output" },
  ];

  return (
    <BaseNode {...props} nodeType="text" handlePositions={handlePositions}>
      <FormControl fullWidth variant="outlined">
        <Label>
          Text
          <HelperText variant="caption">
            {" (Press Enter after variable name)"}
          </HelperText>{" "}
        </Label>
        <StyledTextField
          value={currText}
          onChange={handleTextChange}
          multiline
          variant="outlined"
          minRows={1}
          maxRows={Infinity}
        />
      </FormControl>
    </BaseNode>
  );
};
