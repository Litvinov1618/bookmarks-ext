import React from "react";
import renderer from "react-test-renderer";
import SavePageSettings from "../components/SavePageSettings";
import SaveButton from "../components/SaveButton";
import FilterList from "../components/FilterList";

it("SavePageSettings component renders correctly", () => {
  const component = renderer.create(<SavePageSettings />).toJSON();
  expect(component).toMatchSnapshot();
});

it("SaveButton component renders correctly", () => {
  const component = renderer.create(<SaveButton />).toJSON();
  expect(component).toMatchSnapshot();
});

it("FilterList component renders correctly", () => {
  const component = renderer.create(<FilterList />).toJSON();
  expect(component).toMatchSnapshot();
});
