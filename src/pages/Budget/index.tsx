import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemType } from "../../components/item";
import PriceBreakdown from "../../components/price-breakdown";
import useGetFirebase from "../../data/useGetFirebase";
import formatPrice from "../../utils/formatPrice";
import formatNumbers from "../../utils/formatNumbers";
import Items from "../../components/items";
import "./styles.scss";

const Budget: React.FC = () => {
  // routing stuff
  const navigate = useNavigate();
  const { state } = useLocation();
  const userBudget = state as number;

  const [items, setItems] = useState<ItemType[]>(); //holding items once fetched
  const [isLoading, setIsLoading] = useState<boolean>(true); //loading state while items fetched
  const [highRange, setHighRange] = useState<number>(0);
  const [lowRange, setLowRange] = useState<number>(0);
  const [activeItems, setActiveItems] = useState<Array<number>>([]);
  const [types, setTypes] = useState<Array<any>>([]);
  // Creating a new set from types will automatically remove duplicates giving list of types sans duplicates
  const filteredTypes = Array.from(new Set(types));

  useEffect(() => {
    // if user manually enters budget url, redirect back to welcome page so they can enter a budget
    if (userBudget === null) {
      navigate("/");
    } else {
      // Grab items from custom hook and set to state
      // setting additional ID and isDisabled properties before setting to items state, also maniuplate item price format so it only needs done once
      useGetFirebase.then((items) => {
        setIsLoading(false);
        items
          ?.sort((a, b) => (a.type > b.type ? 1 : -1))
          .forEach((item: ItemType, index) => {
            item.id = index;
            item.isDisabled = false;
            item.highPrice = Number(formatPrice(item.highPrice));
            item.lowPrice = Number(formatPrice(item.lowPrice));
            setTypes((types) => [...types, item.type]);
          });
        setItems(items as ItemType[]);
      });
    }
  }, [navigate, userBudget]);

  const handleItemToggle = (item: ItemType) => {
    // this conditional add/removes items to activeItems and calculates price range
    if (activeItems.includes(item.id)) {
      setActiveItems((activeItems) =>
        activeItems.filter((id) => item.id !== id)
      );
      setHighRange(highRange - item.highPrice);
      setLowRange(lowRange - item.lowPrice);
    } else {
      setActiveItems([...activeItems, item.id]);
      setHighRange(highRange + item.highPrice);
      setLowRange(lowRange + item.lowPrice);
    }
  };

  const resetSelection = () => {
    setHighRange(0);
    setLowRange(0);
    setActiveItems([]);

    items.forEach((item: ItemType) => {
      item.isDisabled = false;
    });
  };

  return (
    <Grid
      sx={{ minHeight: "100vh" }}
      container
      direction="column"
      className="budget"
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid item>
            <Typography variant="h4">
              Your budget is: ${formatNumbers(userBudget)}
            </Typography>
          </Grid>

          {/* create groups of items based on categories */}
          {/* refactored this heavily from a previous commit */}
          <Grid item container>
            {filteredTypes.map((type, index: number) => {
              return (
                <Items
                  activeItems={activeItems}
                  handleItemToggle={(item) => handleItemToggle(item)}
                  key={index}
                  type={type}
                  items={items?.filter((item) => item.type === type)}
                />
              );
            })}
          </Grid>
        </>
      )}
      <Grid
        container
        justifyContent="space-between"
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
  );
};

export default Budget;
