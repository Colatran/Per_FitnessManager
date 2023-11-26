import { View, FlatList } from "react-native";
import React from "react";

import { _space_m, _space_s } from "../styles/styles";



export default function List(props) {
  const data = props.data;

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            React.Children.map(props.children, child =>
              React.cloneElement(child, { item, index })
            )
          )
        }}
      />
    </View>
  );
}
