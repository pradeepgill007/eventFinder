import React from "react";
import { shallow } from "enzyme";
import { testStore } from "../../Utils/";
import Artist from "./index";

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(<Artist store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe("Artist Component", () => {
  describe("Having Props", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {
        artist: {
          loader: false,
          artistDetails: {
            thumb_url: "https://s3.amazonaws.com/bit-photos/thumb/8555629.jpeg",
            facebook_page_url: "http://www.facebook.com/43495831313",
            image_url: "https://s3.amazonaws.com/bit-photos/large/8555629.jpeg",
            name: "Mona",
            url:
              "https://www.bandsintown.com/a/152057?came_from=267&app_id=\\'jhg45hj4j5hgvh67j54\\'",
            events: [
              {
                venue: {
                  name: "Starland Ballroom",
                  country: "United States",
                  city: "Sayreville"
                },
                datetime: "2019-04-17T19:00:00"
              },
              {
                venue: {
                  name: "test 2",
                  country: "Germany",
                  city: "Munich"
                },
                datetime: "2019-08-17T19:00:00"
              }
            ]
          }
        }
      };
      wrapper = setUp(initialState);
    });

    it("Should render artish profile image", () => {
      const component = wrapper.find("img").prop("src").length;
      expect(component).toBeGreaterThan(6);
    });

    it("Should render artish name", () => {
      const component = wrapper.find(".artistName").text().length;
      expect(component).toBeGreaterThan(0);
    });

    it("Should render events heading", () => {
      const component = wrapper.find("h3").text();
      expect(component).toBe("Events");
    });

    it("Should render events", () => {
      const component = wrapper
        .find(".venueWrapper")
        .map(node => node.find(".col").map(node => node.first().text()));
      expect(component).toEqual([["Venue", "City", "Country", " Date"], ["Starland Ballroom", "Sayreville", "United States", "17-4-2019 19:0"], ["test 2", "Munich", "Germany", "17-8-2019 19:0"]]);
    });
  });

  describe("Having no Props", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {
        artist: {
          loader: true
        }
      };
      wrapper = setUp(initialState);
    });

    it("Should containe class for home24 heading", () => {
      const component = wrapper.find("h1").hasClass("home24Heading");
      expect(component).toBe(true);
    });

    it("Should containe class for heading color", () => {
      const component = wrapper.find("h1").hasClass("text-primary");
      expect(component).toBe(true);
    });

    it("Should render Heading", () => {
      const component = wrapper.find("h1").text();
      expect(component).toBe("Artist Events");
    });

    it("Should have the input field for enter artist name", () => {
      const input = wrapper.find("input");
      expect(input.prop("value")).toBe("");
    });

    it("Input field should have the onChange function", () => {
      const input = wrapper.find("input");
      input.simulate("change", { target: { value: "Changed" } });
      expect(wrapper.find("input").prop("value")).toBe("Changed");
    });

    it("Input field should have the placeholder text", () => {
      const input = wrapper.find("input");
      expect(input.prop("placeholder")).toBe("Enter artist name");
    });

    it("Should have button", () => {
      const component = wrapper.find("button").hasClass("btn-primary");
      expect(component).toBe(true);
    });
  });
});
