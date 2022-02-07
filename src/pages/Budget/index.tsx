import { DocumentData } from "@firebase/firestore";
import { Button, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Item from "../../components/item";
import PriceBreakdown from "../../components/price-breakdown";
import useGetFirebase from "../../data/useGetFirebase";
import formatPrice from "../../utils/formatPrice";
import "./styles.scss";

const Budget: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userBudget = state;

  useEffect(() => {
    // if user manually enters budget url, redirect back to welcome page so they can enter a budget
    if (userBudget === null) {
      navigate("/");
    } else {
      // Grab items and set to state
      // setting additional ID and isDisabled properties before setting to items state
      useGetFirebase.then((items) => {
        setIsLoading(false);
        items
          ?.sort((a, b) => (a.type > b.type ? 1 : -1))
          .forEach((item: Item, index) => {
            item.id = index;
            item.isDisabled = false;
          });
        setItems(items);
      });
    }
  }, [navigate, userBudget]);

  type Item = {
    lowPrice: number;
    highPrice: number;
    id: number;
    isDisabled: boolean;
    name: string;
    type: string;
  };

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
    // otherwise, maybe would split the items up into their own "Items" components based on their type, so state for each type of item can be managed more easily

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
    setHighRange(0);
    setLowRange(0);
    setActiveItems([]);

    items.forEach((item: Item) => {
      item.isDisabled = false;
    });
  };

  return (
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
              customerBudget={userBudget as number}
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
  );
};

export default Budget;
