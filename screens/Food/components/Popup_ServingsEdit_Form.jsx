import { View } from "react-native";


import { styles_buttons, styles_common } from "../../../styles/styles";
import { _ingredientEditScreen_deleteServing } from "../../../utils/Messages";
import Popup from "../../../components/Popup";
import Label from "../../../components/Label";
import Input_Text from "../../../components/input/Input_Text";
import Button_Delete from "../../../components/screen/Button_Delete";
import Button_YesNo from "../../../components/screen/Button_YesNo";



export default function Popup_ServingsEdit_Form(props) {
  const isVisible = props.isVisible;
  const setIsVisible = props.setIsVisible;
  const label = props.label;
  const setLabel = props.setLabel;
  const amount = props.amount;
  const setAmount = props.setAmount;
  const isEditing = props.isEditing;
  const onPressSave = props.onPressSave;
  const onPressDelete = props.onPressDelete;
  const formLabel = props.formLabel;



  const onPress_Close = () => {
    setIsVisible(false);
  }



  return (
    <Popup isVisible={isVisible}>
      <View style={styles_common.form}>
        <Label label={"Label"}>
          <Input_Text value={label} setValue={setLabel} placeholder={""} />
        </Label>
        <Label label={formLabel}>
          <Input_Text value={amount} setValue={setAmount} placeholder={""} keyboardType={"numeric"} />
        </Label>
        {
          isEditing ?
            <></>
            :
            <View style={{ alignItems: "flex-end" }}>
              <Button_Delete onPress={onPressDelete} message={_ingredientEditScreen_deleteServing} />
            </View>
        }
      </View>
      <View style={styles_buttons.container_footer}>
        <Button_YesNo style={styles_buttons.button_fill} onPressYes={onPressSave} onPressNo={onPress_Close} />
      </View>
    </Popup>
  );
}