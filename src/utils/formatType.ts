const formatType = (type: string): string => {
  return type.replaceAll("_", " ").toLowerCase();
};

export default formatType;
