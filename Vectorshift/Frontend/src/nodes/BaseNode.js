import React, { useState } from "react";
import { Handle } from "reactflow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Root = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  border: "1px solid #AD88C6",
  width: "auto",
  height: "auto",
  margin: "none",
  "&:hover": {
    boxShadow: "0 0 20px #BC7DFF", // Apply box-shadow only on hover
  },
  borderRadius: "15px",
}));

const HandleStyle = styled("div")({
  position: "absolute",
  background: "#AD88C6",
});

const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  borderBottom: "1px solid #AD88C6",
  padding: "10px",
}));
const Label = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: "16px",
  color: "#555",
}));

const SelectContainer = styled("div")(({ theme }) => ({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const defaultHandleStyle = {
  background: "#7752FE",
  height: "10px",
  width: "10px",
};
export const BaseNode = ({ id, data, nodeType, children, handlePositions }) => {
  const [currName, setCurrName] = useState(
    data?.name || id.replace(`${nodeType}-`, `${nodeType}_`)
  );
  const [type, setType] = useState(
    data.type || (nodeType === "input" || nodeType === "output" ? "Text" : "")
  );

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <Root>
      {handlePositions.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{ ...handle.style, ...defaultHandleStyle }}
          className={HandleStyle}
        />
      ))}
      <Heading variant="h6">
        {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
      </Heading>
      {(nodeType === "input" || nodeType === "output") && (
        <SelectContainer>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label variant="body1">Name</Label>
              <TextField value={currName} onChange={handleNameChange} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Label variant="body1">Type</Label>
              <FormControl variant="outlined" fullWidth>
                <Select
                  labelId={`${id}-type-label`}
                  value={type}
                  onChange={handleTypeChange}
                >
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value={nodeType === "input" ? "File" : "Image"} />
                </Select>
              </FormControl>
              {/* <select value={type} onChange={handleTypeChange}>
                <option value="Text">Text</option>
                <option value={nodeType === "input" ? "File" : "Image"}>
                  {nodeType === "input" ? "File" : "Image"}
                </option>
              </select> */}
            </div>
          </div>
        </SelectContainer>
      )}
      {children && <SelectContainer>{children}</SelectContainer>}
    </Root>
  );
};
