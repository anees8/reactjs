import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
export const loader = (props) => {
  return (
    <Backdrop
      sx={{
        color: "#1976d2",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "rgba(25,118,210,0.1)"
      }}
      open={props.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
