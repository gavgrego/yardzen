const checkPriceRange = (
  userBudget: number,
  lowRange: number,
  highRange: number
) => {
  if (userBudget > lowRange && userBudget < highRange) {
    return "You are currently within your budget.";
  } else if (userBudget < highRange) {
    return "Your selected items are above your current budget.";
  } else if (userBudget > lowRange) {
    return "Your selected items are below your current budget.";
  }
};

export default checkPriceRange;
