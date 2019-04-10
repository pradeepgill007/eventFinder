import Artist from "./artist";

describe("Questions and Question Details Reducer", () => {
  it("Should return default state", () => {
    const newState = Artist(undefined, {});
    expect(newState).toEqual({});
  });

  it("Should return new state for show loaderFlag type", () => {
    const testValue = {
      loaderFlag: true
    };
    const newState = Artist(undefined, {
      type: "SHOW_LOADER",
      payload: true
    });
    expect(newState).toEqual(testValue);
  });
});
