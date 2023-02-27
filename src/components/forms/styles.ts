import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  signInBox: {
    width: "410px",
    height: "450px",
    boxSizing: "content-box",
    boxShadow: "0px 44px 65px rgba(176, 183, 195, 0.19)",
    borderRadius: "15px",
    background: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    background: "#F8FAFC",
    position: "relative",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    color: "#323B4B",
    fontSize: "24px",
    lineHeight: "29px",
    textAlign: "center",
    paddingBottom: "20px",
    fontWeight: "bold",
    fontStyle: "normal",
  },
  textInputWrapper: {
    position: "relative",
    paddingTop: "1rem",
    width: "352px",
    "& div": {
      borderRadius: "15px",
    },
    "& input": {
      width: "100%",
      height: "100%",
      minHeight: "55px",
      boxSizing: "border-box",
      borderRadius: "15px",
      background: "white",
      backgroundColor: "white",
      "&:focus-visible": {
        outline: "none",
      },
      "&:focus": {
        borderColor: "#377DFF",
      },
    },
  },
  description: {
    color: "#8A94A6",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "29px",
    textAlign: "center",
    paddingBottom: "20px",
  },
}));

export default useStyles;
