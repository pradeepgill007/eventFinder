import { serviceCall } from "./service-call";
import Store from "../reducers/store";

export function showLoader() {
  return {
    type: "SHOW_LOADER",
    payload: true
  };
}

export function getArtistEvents(artistDetails) {
  return {
    type: "GET_ARTIST_DATA",
    payload: serviceCall({
      parms: `artists/${artistDetails.data.name}/events/`
    }).then(response => {
      return {
        artistDetails,
        response
      };
    })
  };
}

export function getArtistDetail(name) {
  return {
    type: "GET_ARTIST_NAME",
    payload: serviceCall({ parms: `artists/${name}` }).then(response => {
      if (Object.keys(response.data).length) {
        Store.dispatch(getArtistEvents(response));
      } else {
        return `No Artist found with name ${name}`;
      }
    })
  };
}
