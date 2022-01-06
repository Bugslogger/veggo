export const AddItem = (product, currentCart) => (dispatch) => {
  const itemExist = currentCart.find((x) => x.id === product.id);
  if (itemExist) {
    // console.log("5", itemExist);
    dispatch({
      type: "ADD_QTY",
      playload: { product, itemExist, qty: itemExist.qty },
    });
  } else {
    // console.log("11", itemExist, product.id);
    dispatch({ type: "AddItem", playload: { product } });
  }
};

export const RemoveItem = (product, currentCart) => (dispatch) => {
    const exist = currentCart.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      dispatch({ type: "REMOVE_ITEM", playload: { product } });
    } else {
      dispatch({
        type: "DEC_QTY",
        playload: { product, exist, qty: exist.qty },
      });
    }
  };