import {
  Paper,
  Grid,
  Typography,
  useTheme,
  Card,
  Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "./styles.scss";
import formatType from "../../utils/formatType";

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
  id,
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
