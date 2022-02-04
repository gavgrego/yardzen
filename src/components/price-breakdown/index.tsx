import { Grid } from "@mui/material";
import formatPrice from "../../utils/formatPrice";

type Props = {
  lowRange: number;
  highRange: number;
  budgetText: string;
};

const PriceBreakdown: React.FC<Props> = ({
  lowRange,
  highRange,
  budgetText,
}) => {
  return (
    <>
      <Grid item>{formatPrice(lowRange)}</Grid>
      <Grid item>{formatPrice(highRange)}</Grid>
      {budgetText}
    </>
  );
};

export default PriceBreakdown;
