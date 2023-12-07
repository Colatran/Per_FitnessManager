import { FlatList } from "react-native";
import React from "react";

import { _space_s } from "../styles/styles";



export default function List(props) {
  const data = props.data;
  const style = props.style;

  return (
    <FlatList
      style={[{ paddingVertical: _space_s }, style]}
      data={data}
      renderItem={({ item, index }) => {
        return (
          React.Children.map(props.children, child =>
            React.cloneElement(child, { item, index })
          )
        )
      }}
    />
  );
}
