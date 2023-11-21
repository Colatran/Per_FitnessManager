import { StyleSheet, View, FlatList } from "react-native";
import React from "react";

import { _space_m, _space_s, styles_common, styles_lists } from "../styles/styles";



export default function List(props) {
  const data = props.data;

  return (
    <View style={styles.container_list}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View style={[styles_common.container_front, styles_lists.container_item]}>
              {
                React.Children.map(props.children, child =>
                  React.cloneElement(child, { item, index })
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
});
