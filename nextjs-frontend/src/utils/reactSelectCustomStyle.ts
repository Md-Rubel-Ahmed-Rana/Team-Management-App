const customStyles = {
  option: (base: any, state: any) => ({
    ...base,
    width: "100%",
    backgroundColor: state.isSelected ? "#d6edf7" : "white",
    color: state.isSelected ? "white" : "black",
    outline: "none !important",
    boxShadow: "rgba(192, 37, 37, 0.24) 0px 3px 8px;",
    ":hover": {
      backgroundColor: "lightblue",
      borderColor: "#cccccc",
    },
  }),
  control: (base: any) => ({
    ...base,
    border: "1px solid #e5e7eb !important",
    ":hover": {
      outline: "none !important",
      border: "none",
    },
  }),
};

export default customStyles;
