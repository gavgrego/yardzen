import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import checkPriceRange from "../../utils/checkPriceRange";
import formatNumbers from "../../utils/formatNumbers";
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
  }, [lowRange, highRange, customerBudget]);

  return (
    <Grid container direction="column">
      <Grid container direction="row" alignItems="center" item>
        <Grid item className="price-breakdown__heading">
          <Typography variant="h5">
            Current price range of items:&nbsp;
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5">${formatNumbers(lowRange)}</Typography>
        </Grid>
        <Grid item>&nbsp;—&nbsp;</Grid>
        <Grid item>
          <Typography variant="h5">${formatNumbers(highRange)}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h5">{budgetStatus}</Typography>
      </Grid>
      <Typography variant="h5">
        Your budget is: <strong>${formatNumbers(customerBudget)}</strong>
      </Typography>
    </Grid>
  );
};

export default PriceBreakdown;
