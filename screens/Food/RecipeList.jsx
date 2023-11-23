import { View, Text } from "react-native";
import { useContext } from "react";

import { UserContext } from "../../utils/UserContext";
import { _icon_checkout, _icon_edit, styles_common, styles_text, styles_lists } from "../../styles/styles";
import List from "../../components/List";
import Button_Icon from "../../components/input/Button_Icon";
import Button_Footer_Add from "../../components/screen/Button_Footer_Add";



export default function RecipeList({ navigation }) {
  const { recipeDocs } = useContext(UserContext);

  const handleOnPressAdd = () => {
    navigation.navigate("RecipeEdit", {});
  }

  return (
    <View style={styles_common.container}>
      <List data={recipeDocs}>
        <ListItem navigation={navigation} />
      </List>
      <Button_Footer_Add onPress={handleOnPressAdd} />
    </View>
  );
}



function ListItem(props) {
  const { item } = props;
  const navigation = props.navigation;

  const handleOnPressCheck = (item) => {
  }
  const handleEditOnPress = (item) => {
    navigation.navigate("RecipeEdit", { recipe: item });
  }

  return (
    <View style={styles_lists.container}>
      <Button_Icon
        icon={_icon_checkout}
        onPress={() => handleOnPressCheck(item)}
      />

      <View style={styles_lists.container_label}>
        <Text style={styles_text.common}>{item.label}</Text>
      </View>

      <Button_Icon
        icon={_icon_edit}
        onPress={() => handleEditOnPress(item)}
      />
    </View>
  );
}
