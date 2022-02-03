import { Paper, Grid, Typography, useTheme } from "@mui/material";
import React from "react";

type Props = {
  type: string;
  name: string;
  lowPrice: number;
  highPrice: number;
};

const Item: React.FC<Props> = (item) => {
  const theme = useTheme();

  return (
    <Paper>
      <Grid container>
        <Grid item>
          <Typography color="primary">{item.type}</Typography>
        </Grid>
        <Grid item>
          <Typography color="primary">{item.name}</Typography>
        </Grid>
        <Grid item>
          <Typography color="primary">{item.lowPrice}</Typography>
        </Grid>
        <Grid item>
          <Typography color="primary">{item.highPrice}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Item;
