import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import { color_background_input, styles_common, styles_text } from "../../styles/styles";
import { ref_food_ingredients } from "./Food_Crud";
import Input_TextLabel from "../../components/Input_TextLabel";




const margin = 5;
export default function IngredientEdit({ navigation }) {
  const [label, setLabel]         = useState("");
  const [weight, setWeight]        = useState("");

  const [energy, setEnergy]       = useState(0);
  const [fats, setFats]           = useState(0);
  const [saturates, setSaturates] = useState(0);
  const [carbs, setCarbs]         = useState(0);
  const [sugars, setSugar]        = useState(0);
  const [protein, setProtein]     = useState(0);
  const [salt, setSalt]           = useState(0);
  const [fiber, setFiber]         = useState(0);


  return (
    <View style={styles_common.container}>
      <Margin margin={margin}/>
      <Input_TextLabel label="Label" value={label} setValue={setLabel} placeholder={"Label"}/>
      <Margin margin={margin}/>
      
      <Input_TextLabel label="Unit Weight (g)" value={weight} setValue={setWeight} placeholder={""} keyboardType={"numeric"}/>
      <Margin margin={15}/>

      <Text style={styles_text.bold}>{"Nutrition (Per 100g): "}</Text>
      <View style={{marginLeft: 10}}>
        <Input_TextLabel label="Energy (kcal)" value={energy} setValue={setEnergy} placeholder={""} keyboardType={"numeric"}/>
        <Margin margin={margin}/>
        
        <Input_TextLabel label="Fat (g)" value={fats} setValue={setFats} placeholder={""} keyboardType={"numeric"}/>
        <Paragraph>
          <Input_TextLabel label="Saturates (g)" value={saturates} setValue={setSaturates} placeholder={""} keyboardType={"numeric"}/>
        </Paragraph>
        <Margin margin={margin}/>

        <Input_TextLabel label="Carbohydrate (g)" value={carbs} setValue={setCarbs} placeholder={""} keyboardType={"numeric"}/>
        <Paragraph>
          <Input_TextLabel label="Sugars (g)" value={sugars} setValue={setSugar} placeholder={""} keyboardType={"numeric"}/>
        </Paragraph>
        <Margin margin={margin}/>

        <Input_TextLabel label="Protein (g)" value={protein} setValue={setProtein} placeholder={""} keyboardType={"numeric"}/>
        <Margin margin={margin}/>

        <Input_TextLabel label="Salt (g)" value={salt} setValue={setSalt} placeholder={""} keyboardType={"numeric"}/>
        <Margin margin={margin}/>

        <Input_TextLabel label="Fiber (g)" value={fiber} setValue={setFiber} placeholder={""} keyboardType={"numeric"}/>
        <Margin margin={margin}/>
      </View>

      <View style={{flex:1, backgroundColor: "#f00"}}>

      </View>
    </View>
  );
}

function Paragraph(props) { return (<View style={{marginLeft: 30}}>{props.children}</View>);}
function Margin(props) { return (<View style={{margin: props.margin}}/>); }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
