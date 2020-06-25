import React from "react";
import renderer from "react-test-renderer";
import SavePageSettings from "../components/SavePageSettings";
import SavePageButton from "../components/SavePageButton";
import FilterList from "../components/FilterList";

it("SavePageSettings component renders correctly", () => {
  const component = renderer.create(<SavePageSettings />).toJSON();
  expect(component).toMatchSnapshot();
});

it("SavePageButton component renders correctly", () => {
  const component = renderer.create(<SavePageButton />).toJSON();
  expect(component).toMatchSnapshot();
});

it("FilterList component renders correctly", () => {
  const component = renderer.create(<FilterList />).toJSON();
  expect(component).toMatchSnapshot();
});
