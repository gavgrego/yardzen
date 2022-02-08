import { Grid } from "@mui/material";
import React from "react";
import Item, { ItemType } from "../item";

type Props = {
  type?: string;
  items?: ItemType[];
  activeItems?: any[];
  handleItemToggle: (item: ItemType) => void;
};

const Items: React.FC<Props> = ({ items, handleItemToggle, activeItems }) => {
  const handleItemClick = (item: ItemType) => {
    // send price/cost info to Budget
    handleItemToggle(item);
    items.forEach((itemOfType: ItemType) => {
      if (item.id === itemOfType.id) {
        item.isDisabled = false;
        const filteredItems = items.filter(
          (filteredItem) => filteredItem.id !== item.id
        );

        //check if other items in the category are disabled, if they are, set all items to be enabled
        filteredItems.forEach((item: ItemType) => {
          item.isDisabled = true;
        });

        // if the item is active when clicked, reset items for the category
        if (activeItems.includes(item.id)) {
          items.forEach((item: ItemType) => {
            item.isDisabled = false;
          });
        }
      }
    });
  };
  return (
    <Grid container sx={{ width: "auto" }}>
      {items?.map((item: ItemType, index: number) => {
        return (
          <Item
            handleItemToggle={() => handleItemClick(item)}
            key={index}
            id={index}
            type={item.type}
            name={item.name}
            lowPrice={item.lowPrice}
            highPrice={item.highPrice}
            isDisabled={item.isDisabled}
          />
        );
      })}
    </Grid>
  );
};

export default Items;
