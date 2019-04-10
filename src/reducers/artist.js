export default function Artist(state = {}, action) {
  switch (action.type) {
    case "SHOW_LOADER": {
      const newState = { ...state };
      newState.loaderFlag = action.payload;
      return newState;
    }

    case "GET_ARTIST_NAME": {
      const newState = { ...state };
      if (action.payload) {
        newState.errorMessage = action.payload;
        newState.loaderFlag = false;
      }
      return newState;
    }

    case "GET_ARTIST_DATA": {
      const newState = { ...state };
      const { artistDetails, response } = action.payload;
      newState.loaderFlag = false;
      newState.errorMessage = "";
      newState.artistDetails = artistDetails.data;
      newState.artistDetails.events = response.data;
      return newState;
    }

    default:
      return { ...state };
  }
}
