import { Paper, Grid, Typography, useTheme, Card } from "@mui/material";
import React, { useRef } from "react";
import "./styles.scss";
import formatType from "../../utils/formatType";

type Props = {
  id: number;
  type: string;
  name: string;
  lowPrice: string;
  highPrice: string;
  handleItemToggle: () => void;
};

const Item: React.FC<Props> = ({
  name,
  lowPrice,
  highPrice,
  type,
  handleItemToggle,
}) => {
  const card = useRef(null);
  const toggleItem = () => {
    handleItemToggle();
    console.log(card.current);
  };

  return (
    <Card
      ref={card}
      onClick={toggleItem}
      className={`item-card item-card__${type}`}
      raised={true}
    >
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h2">{name}</Typography>
        </Grid>
        <Grid container item>
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
  );
};

export default Item;
