import { StyleSheet, View, FlatList } from "react-native";
import React from "react";

import { styles_common } from "../../styles/styles";



export default function ScreenList(props) {
  const data = props.data;

  return (
    <View style={styles.container_list}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={[styles_common.container_front, styles.container_list_item]}>
              {React.Children.map(props.children, child =>
                React.cloneElement(child, { item: item })
              )}
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
    marginVertical: 10
  },
  container_list_item: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center"
  }
});
