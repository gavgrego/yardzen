const formatPrice = (num: number): string => {
  return (num / 100).toFixed(2);
};

export default formatPrice;
