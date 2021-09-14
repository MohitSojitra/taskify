import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { TextElement } from "./TextElement";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";

function ErrorText(props) {
  const { errorMessage } = props;
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <ErrorRoundedIcon className={classes.iconStyle} />
      <TextElement font="semiBold" fontType="h7">
        {errorMessage}
      </TextElement>
    </Box>
  );
}

const useStyle = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  iconStyle: {
    width: "16px",
    height: "16px",
    marginRight: "4px",
  },
});

export default ErrorText;
