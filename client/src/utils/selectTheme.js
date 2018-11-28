const overrides = {
  borderRadius: 0,
  colors: {
    danger: "#DE350B",
    dangerLight: "#FFBDAD",
    neutral0: "#000",
    neutral5: "#333",
    neutral10: "#555",
    neutral20: "#777",
    neutral30: "#999",
    neutral40: "#aaa",
    neutral50: "#bbb",
    neutral60: "#ccc",
    neutral70: "#ddd",
    neutral80: "#eee",
    neutral90: "#fff",
    primary: "#cc6e15", // existing selection & focus control color
    primary25: "#12151e", // hover selection color
    primary50: "#12151e", // active selection color
    primary75: "#ddd",
  },
  spacing: {
    baseUnit: 4, // horizontal spacing
    controlHeight: 38, // select control height
    menuGutter: 4, // between the select and menu
  }
}

export default (theme) => {
  return {
    ...theme,
    ...overrides,
    colors: {
      ...theme.colors,
      ...overrides.colors,
    },
    spacing: {
      ...theme.spacing,
      ...overrides.spacing,
    }
  }
}
