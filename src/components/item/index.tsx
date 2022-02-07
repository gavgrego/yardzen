import { Card, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import formatType from "../../utils/formatType";
import "./styles.scss";

type Props = {
  id: number;
  type: string;
  name: string;
  lowPrice: string;
  highPrice: string;
  isDisabled: boolean;
  handleItemToggle: () => void;
};

const Item: React.FC<Props> = ({
  name,
  lowPrice,
  highPrice,
  type,
  isDisabled,
  handleItemToggle,
}) => {
  return (
    <Tooltip
      title={
        isDisabled ? "Only one item per category may be selected at a time" : ""
      }
    >
      <Card
        onClick={!isDisabled ? handleItemToggle : null}
        className={`item-card item-card__${type} ${
          isDisabled ? "disabled" : "enabled"
        } `}
        raised={true}
      >
        <Grid container direction="column" className="item-card__contain">
          <Grid item>
            <Typography variant="h5">{name}</Typography>
          </Grid>
          <Grid container item className="item-card__price-range">
            <Grid item>
              <Typography color="primary">${lowPrice}</Typography>
            </Grid>
            <Grid item>&nbsp;-&nbsp;</Grid>
            <Grid item>
              <Typography color="primary">${highPrice}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className="item-card__type" color="primary">
              {formatType(type)}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Tooltip>
  );
};

export default Item;
