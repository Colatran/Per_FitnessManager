import Button_SaveDelete from './Button_SaveDelete';
import Button_Add from './Button_Add';



export default function Button_AddSaveDelete(props) {
  const isEdit = props.isEdit;
  const style = props.style;
  const onPressAdd = props.onPressAdd;
  const onPressSave = props.onPressSave;
  const onPressDelete = props.onPressDelete;

  return isEdit ? (
    <Button_SaveDelete
      onPressSave={onPressSave}
      onPressDelete={onPressDelete}
      style={style}
    />
  ) : (
    <Button_Add
      style={style}
      onPress={onPressAdd}
    />
  );
}

