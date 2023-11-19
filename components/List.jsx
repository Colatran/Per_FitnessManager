import { StyleSheet, View, FlatList } from "react-native";
import React from "react";

import { _space_m, _space_s, styles_common } from "../styles/styles";



export default function List(props) {
  const data = props.data;

  return (
    <View style={styles.container_list}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={[styles_common.container_front, styles.container_list_item]}>
              {
                React.Children.map(props.children, child =>
                  React.cloneElement(child, { item: item })
                )
              }
            </View>
          )
        }}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container_list: {
    flex: 1,
  },
  container_list_item: {
    paddingHorizontal: _space_m,
    paddingVertical: _space_s,
    marginVertical: _space_s,
    flexDirection: "row",
    alignItems: "center"
  }
});
