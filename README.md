App structure

- Initial page with app name/header and Form field with their budget

  - On success, route to calculator page via react-router

- Display a list of items, sorted by type.

  - Only one item per type may be selected at a time, so diable other items of that type visually
  - Keep track of the price range whenever a new item is selected
  - if the current tally of price ranges is over the budget, highlight budget in red, under yellow, inside green

- Want to do some sort of drag and drop - user has a pool of items to select from, dragging an item into the budget zone considers the item selected
