import React, { useMemo, useState, useEffect } from "react";
import { Grid, Typography, CircularProgress, Button } from "@mui/material";
import "./App.scss";
import useGetFirebase from "./data/useGetFirebase";
import { DocumentData } from "@firebase/firestore";
import Item from "./components/item";
import formatPrice from "./utils/formatPrice";
import PriceBreakdown from "./components/price-breakdown";

function App() {
  type Item = {
    lowPrice: number;
    highPrice: number;
    id: number;
    isDisabled: boolean;
    name: string;
    type: string;
  };
  const userBudget = 5000000;
  // setting state for price range and keeping track of active items

  // Grab items and set to state
  // setting additional ID and isDisabled properties before setting to items state
  useEffect(() => {
    useGetFirebase.then((items) => {
      setIsLoading(false);
      items
        ?.sort((a, b) => (a.type > b.type ? 1 : -1))
        .map((item: Item, index) => {
          item.id = index;
          item.isDisabled = false;
        });
      setItems(items);
    });
  }, []);

  const [items, setItems] = useState<DocumentData[]>(); //holding items once fetched
  const [isLoading, setIsLoading] = useState<boolean>(true); //loading state while items fetched
  const [highRange, setHighRange] = useState<number>(0);
  const [lowRange, setLowRange] = useState<number>(0);
  const [activeItems, setActiveItems] = useState<Array<number>>([]);

  const handleItemToggle = (
    lowPrice: string,
    highPrice: string,
    type: string,
    id: number
  ) => {
    // I'm thinking this below could be done in a more performant way, I don't like the idea of just
    // iterating through all the items when doing the id/type comparison – this will get hairy when # of items increases.
    // I think using something like Algolia is a would be fantastic for potentially filtering/sorting hundreds (or thousands) of items

    // checking to see if the item is currently in the list of active items
    if (activeItems.includes(id)) {
      setActiveItems((activeItems) =>
        activeItems.filter((item) => item !== id)
      );
      setHighRange(highRange - parseInt(highPrice));
      setLowRange(lowRange - parseInt(lowPrice));

      // look into refactoring this to be more performant
      items.forEach((item: Item) => {
        if (item.id === id) {
          item.isDisabled = false;
        } else if (item.id !== id && item.type === type) {
          item.isDisabled = false;
        }
      });
    } else {
      setActiveItems([...activeItems, id]);
      setHighRange(highRange + parseInt(highPrice));
      setLowRange(lowRange + parseInt(lowPrice));

      // look into refactoring this to be more performant
      items.forEach((item: Item) => {
        if (item.id !== id && item.type === type) {
          item.isDisabled = true;
        }
      });
    }
  };

  const resetSelection = () => {
    console.log("reset");
    setHighRange(0);
    setLowRange(0);
    setActiveItems([]);

    items.forEach((item: Item) => {
      item.isDisabled = false;
    });
  };

  return (
    <div className="App">
      <main>
        <Grid className="app-container" container direction="column">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid item container className="items">
              {items
                ?.sort((a, b) => (a.type > b.type ? 1 : -1))
                .map((item: DocumentData, index: number) => {
                  return (
                    <Item
                      handleItemToggle={() =>
                        handleItemToggle(
                          item.lowPrice,
                          item.highPrice,
                          item.type,
                          index
                        )
                      }
                      key={index}
                      id={index}
                      type={item.type}
                      name={item.name}
                      lowPrice={formatPrice(item.lowPrice)}
                      highPrice={formatPrice(item.highPrice)}
                      isDisabled={item.isDisabled}
                    />
                  );
                })}
            </Grid>
          )}
          <Grid
            container
            justifyContent="space-between"
            marginTop={2}
            className="price-breakdown"
          >
            <Grid item>
              <PriceBreakdown
                customerBudget={userBudget}
                lowRange={lowRange}
                highRange={highRange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={resetSelection}>
                Reset Selections
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default App;
