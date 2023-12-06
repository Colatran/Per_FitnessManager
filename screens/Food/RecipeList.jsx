import { View } from "react-native";
import { useContext } from "react";

import { UserContext } from "../../utils/UserContext";
import { _icon_checkout, _icon_edit, styles_common } from "../../styles/styles";
import List from "../../components/List";
import ListItem_EditCheck from "../../components/screen/ListItem_EditCheck";
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

  const onPress_Edit = (item) => {
    navigation.navigate("RecipeEdit", { recipe: item });
  }
  const onPress_Check = (item) => {}

  return (
    <ListItem_EditCheck
      label={item.label}
      showEdit={true}
      showCheck={true}
      onPressEdit={() => onPress_Edit(item)}
      onPressCheck={() => onPress_Check(item)}
    />
  );
}
