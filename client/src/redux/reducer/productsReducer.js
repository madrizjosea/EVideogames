const initialState = {
  products: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action) {
    default:
      return {
        ...state,
      };
  }
}
