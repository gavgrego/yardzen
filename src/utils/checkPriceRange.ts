const checkPriceRange = (
  userBudget: number,
  lowRange: number,
  highRange: number
) => {
  if (userBudget > lowRange && userBudget < highRange) {
    return "Congrats! You are within your budget.";
  } else if (userBudget < highRange) {
    return "You are currently above your budget.";
  } else if (userBudget > lowRange) {
    return "You are currently below your budget.";
  }
};

export default checkPriceRange;
