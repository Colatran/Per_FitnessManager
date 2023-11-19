import { View, Text, FlatList } from "react-native";
import Button_Icon from "../Button_Icon";

import { getDurationText_FromMinuts, getTimeText_FromMinutes } from "../../../utils/Funtions";
import { styles_text } from "../../../styles/styles";
import Pin from "./Pin";



export default function Block(props) {
  const start = props.start 
  const size = props.size;
  const label = props.label;
  const color = props.color;
  const pins = props.pins;
  const pin_height = props.pin_height;
  
  const minSize = props.minSize;
  const alpha = props.alpha;
  const borderAlpha = props.borderAlpha;
  const marginBetweenBlocks = props.marginBetweenBlocks;
  const zoom = props.zoom;

  const sizeWithZoom = size * zoom;
  const totalPinHeight = pin_height * pins ? pins.length : 0;
  const minHeight = minSize < totalPinHeight ? totalPinHeight : minSize;

  const height = sizeWithZoom < minHeight ? minHeight : sizeWithZoom;



  return (
    <View style={{
      height: height,
      margin: marginBetweenBlocks,
      flexDirection: "row",
    }}>
      <View style={{
        flex: 1,
        backgroundColor: color + alpha,
        borderColor: color + borderAlpha,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 3
      }}>
        <View style={{flexDirection: "row", flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={styles_text.common}>{getTimeText_FromMinutes(start)} - {label}</Text>
            <Text style={styles_text.common}>{getDurationText_FromMinuts(size)}</Text>
            <View style={{flex: 1, justifyContent: "flex-end"}}>
              <Text style={styles_text.common}>{getTimeText_FromMinutes(start + size)}</Text>
            </View>
          </View>
          <View>
            <Button_Icon icon="pencil"/>
          </View>
        </View>
      </View>

      <View style= {{flex: 1, paddingTop: pin_height/2, backgroundColor: "#f004"}}>
        <FlatList
          data={pins}
          renderItem={({item}) => {
            return (
              <Pin
                pos={item.pos}
                label={item.label}
                color={item.color}
                marginFactor={item.marginFactor}
                index={item.index}
                height={pin_height}
                blockHeight={height}
              />
            );
          }}
        />
      </View>
    </View>
  );
}