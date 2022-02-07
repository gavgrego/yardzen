import { Grid, Typography, useTheme } from "@mui/material";
import formatPrice from "../../utils/formatPrice";
import React, { useState, useEffect } from "react";
import checkPriceRange from "../../utils/checkPriceRange";
import "./styles.scss";

type Props = {
  lowRange: number;
  highRange: number;
  customerBudget: number;
};

const PriceBreakdown: React.FC<Props> = ({
  lowRange,
  highRange,
  customerBudget,
}) => {
  const [budgetStatus, setBudgetStatus] = useState<string>("");

  // changing the budget information text whenever either price range values change
  useEffect(() => {
    setBudgetStatus(checkPriceRange(customerBudget, lowRange, highRange));
  }, [lowRange, highRange]);

  return (
    <Grid container className="price-breakdown" direction="column">
      <Grid item className="price-breakdown__heading">
        <Typography variant="h4">
          Your selected items have a price range of:
        </Typography>
      </Grid>

      <Grid container direction="row" spacing={2} item>
        <Grid item>
          <Typography variant="h5">${formatPrice(lowRange)}</Typography>
        </Grid>
        <Grid item>—</Grid>
        <Grid item>
          <Typography variant="h5">${formatPrice(highRange)}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h5">{budgetStatus}</Typography>
      </Grid>
      <Grid item className="price-breakdown__heading">
        <Typography variant="h5">Your budget is ${customerBudget}</Typography>
      </Grid>
    </Grid>
  );
};

export default PriceBreakdown;
