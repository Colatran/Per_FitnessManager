import { View, Text } from "react-native";

import { _space_m, styles_buttons, styles_common, styles_lists, styles_text } from "../../../styles/styles";
import { _recipeEditScreen_deleteIngredient } from "../../../utils/Messages";
import { getPhysicalState } from "../../../utils/Functions";
import Popup from "../../../components/Popup";
import Label from "../../../components/Label";
import Input_Text from "../../../components/input/Input_Text";
import Button_YesNo from "../../../components/screen/Button_YesNo";
import Button_Delete from "../../../components/screen/Button_Delete";
import List from "../../../components/List";
import Button_Select from "../../../components/screen/Button_Select";



export default function Popup_Ingredient_EditAmount(props) {
  const isVisible = props.isVisible;
  const setIsVisible = props.setIsVisible;
  const amount = props.amount;
  const setAmount = props.setAmount;
  const amountMultiply = props.amountMultiply;
  const setAmountMultiply = props.setAmountMultiply;
  const servingsList = props.servingsList;
  const label = props.label;
  const sufix = props.sufix;
  const onPressSave = props.onPressSave;
  const onPressDelete = props.onPressDelete;
  const onPress_Item_Select = props.onPress_Item_Select;



  const onPress_Close = () => {
    setIsVisible(false);
  }



  return (
    <Popup isVisible={isVisible}>
      <View style={{ flex: 1 }} />
      <View style={[styles_common.form, { flex: 4 }]}>

        <View style={{ flexDirection: "row" }}>
          <Text style={[styles_text.bold, { flex: 1 }]}>{label}</Text>
          <Button_Delete onPress={onPressDelete} message={_recipeEditScreen_deleteIngredient} />
        </View>

        <Label label={"Amount (" + sufix + ")"}>
          <Input_Text
            value={amount} setValue={setAmount}
            placeholder={""} keyboardType={"numeric"} style={{ alignItems: "center" }}
          />
        </Label>

        <View style={{ flexDirection: "row", flex: 1, marginTop: _space_m }}>
          <View style={{ flex: 1, paddingRight: _space_m }}>
            <Label label={"Multiply"}>
              <Input_Text
                value={amountMultiply} setValue={setAmountMultiply}
                placeholder={""} keyboardType={"numeric"} style={{ alignItems: "center" }}
              />
            </Label>
          </View>

          <View style={[styles_common.container_front, styles_lists.container_list, { flex: 2 }]}>
            <List data={servingsList}>
              <ListItem 
                sufix={sufix}
                onPressSelect={onPress_Item_Select} />
            </List>
          </View>
        </View>

      </View>
      <View style={styles_buttons.container_footer}>
        <Button_YesNo style={styles_buttons.button_fill} onPressYes={onPressSave} onPressNo={onPress_Close} />
      </View>
      <View style={{ flex: 1 }} />
    </Popup>
  );
}



function ListItem(props) {
  const { item, index } = props;

  const sufix = item.sufix;
  const onPressSelect = props.onPressSelect;

  const i_amount = item.amount;
  const i_label = item.label;

  return (
    <View style={styles_lists.container_item}>
      <View style={[styles_lists.container_label, { flexDirection: "row" }]}>
        <View style={{flexDirection: "row"}}>
          <Text style={[styles_text.common, {flex: 1}]}>{i_amount} {sufix}</Text>
          <Text style={[styles_text.label, {flex: 1}]}>{i_label}</Text>
        </View>
      </View>
      <Button_Select onPress={() => { onPressSelect(index) }} />
    </View>
  );
}