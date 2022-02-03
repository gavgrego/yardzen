import React, { useMemo, useState, useEffect } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./App.css";
import useGetFirebase from "./data/useGetFirebase";
import { DocumentData } from "@firebase/firestore";
import Item from "./components/item";

function App() {
  useEffect(() => {
    useGetFirebase.then((items) => {
      setItems(items);
    });
  }, []);

  const [items, setItems] = useState<DocumentData[]>();

  // the Set syntax looks kind of dumb here but always thought this was a good and perfomant way to get a list sans duplicates
  const typesSet = new Set(
    items?.map((item) => {
      return item.type;
    })
  );

  const types = [...typesSet];

  return (
    <div className="App">
      <Link to="/invoices">Invoices</Link>
      <main>
        <Grid container className="">
          {items?.map((item: DocumentData, index: number) => {
            return (
              <Item
                key={index}
                type={item.type}
                name={item.name}
                lowPrice={item.lowPrice}
                highPrice={item.highPrice}
              />
            );
          })}
        </Grid>
      </main>
    </div>
  );
}

export default App;
