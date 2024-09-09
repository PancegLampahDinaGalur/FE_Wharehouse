import * as React from "react";
import renderer from "react-test-renderer";

import Carlist from "../CarList";

it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Carlist
        image={require("@/assets/images/killua.png")}
        carName={"Inova"}
        passengers={5}
        baggage={4}
        price={"5000"}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
