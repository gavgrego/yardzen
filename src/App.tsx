import React, { useMemo, useState, useEffect } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import "./App.scss";
import useGetFirebase from "./data/useGetFirebase";
import { DocumentData } from "@firebase/firestore";
import Item from "./components/item";
import formatPrice from "./utils/formatPrice";
import checkPriceRange from "./utils/checkPriceRange";
import PriceBreakdown from "./components/price-breakdown";

function App() {
  //TODO: Add loading state while items may be loading
  // Grab items and set to state
  useEffect(() => {
    useGetFirebase.then((items) => {
      setItems(items);
    });
  }, []);
  const [items, setItems] = useState<DocumentData[]>();

  const userBudget = 5000000;
  // setting state for price range and keeping track of active items
  const [highRange, setHighRange] = useState<number>(0);
  const [lowRange, setLowRange] = useState<number>(0);
  const [activeItems, setActiveItems] = useState<Array<number>>([]);
  const [budgetText, setBudgetText] = useState<string>("");

  const handleItemToggle = (
    lowPrice: string,
    highPrice: string,
    id: number
  ) => {
    if (activeItems.includes(id)) {
      setActiveItems((activeItems) =>
        activeItems.filter((item) => item !== id)
      );
      setHighRange(highRange - parseInt(highPrice));
      setLowRange(lowRange - parseInt(lowPrice));
    } else {
      setActiveItems([...activeItems, id]);
      setHighRange(highRange + parseInt(highPrice));
      setLowRange(lowRange + parseInt(lowPrice));
    }
  };

  // loop through activeItems,
  useEffect(() => {
    setBudgetText(checkPriceRange(userBudget, lowRange, highRange));
  }, [lowRange, highRange]);

  return (
    <div className="App">
      <main>
        <Grid className="app-container" container direction="column">
          <Grid item container className="">
            {items
              ?.sort((a, b) => (a.type > b.type ? 1 : -1))
              .map((item: DocumentData, index: number) => {
                return (
                  <Item
                    handleItemToggle={() =>
                      handleItemToggle(item.lowPrice, item.highPrice, index)
                    }
                    key={index}
                    id={index}
                    type={item.type}
                    name={item.name}
                    lowPrice={formatPrice(item.lowPrice)}
                    highPrice={formatPrice(item.highPrice)}
                  />
                );
              })}
          </Grid>
          <PriceBreakdown
            lowRange={lowRange}
            highRange={highRange}
            budgetText={budgetText}
          />
        </Grid>
      </main>
    </div>
  );
}

export default App;
