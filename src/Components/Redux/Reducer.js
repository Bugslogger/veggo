import { combineReducers } from "redux";

const initialState = {
    cart: []
}

export const addToCart = (state = initialState, action) =>{
    // console.log("action: ", cart);
    switch (action.type) {
        case "AddItem": return {
            ...state,
            cart: [...state.cart,{...action.playload.product, qty: 1}]
        };
        case "ADD_QTY": return {
            ...state,
            cart: state.cart.map((x) =>
              x.id === action.playload.product.id
                ? { ...action.playload.itemExist, qty: action.playload.qty + 1 }
                : x
            ),
          };
          case "REMOVE_ITEM":
            return {
              ...state,
              cart: state.cart.filter((x) => x.id !== action.playload.product.id),
            };
          case "DEC_QTY":
            return {
              ...state,
              cart: state.cart.map((x) =>
                x.id === action.playload.product.id
                  ? { ...action.playload.exist, qty: action.playload.qty - 1 }
                  : x
              ),
            };
        default: return {...state};
    }
}

export const rootReducer = combineReducers({
    addToCart
})


