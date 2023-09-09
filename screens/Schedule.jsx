import { StyleSheet, FlatList, View, Text } from "react-native";
import { useEffect, useState } from "react";
//import Slider from 'react-native-slider';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, workouts } from '../firebase.config';

import { styles_common, styles_text } from "../styles/styles";



const minSize = 50;
const maxSize = 200;
const alpha = "4";
const borderAlpha = "6";

export default function Schedule({ navigation }) {
  const [zoom, setZoom] = useState(1.0);

  const handleZoomChange = (value) => {
    setZoom(value);
  };



  const block = [
    {label: "Dormir",   start: 0, size: 360, color: "#0f0", },
    {label: "Trabalho", start: 540, size: 240, color: "#33f", },
    {label: "Intervalo", start: 780, size: 60, color: "#fff", },
    {label: "Trabalho", start: 840, size: 240, color: "#33f", },
    {label: "Trabalho", start: 1200, size: 20, color: "#3ff", },
    {label: "Dormir", start: 1320, size: 120, color: "#0f0", },
  ];



  const newBlock = [];  
  for (let i = 0; i < block.length; i++) {
    const item = block[i];
    const nextStart = item.start + item.size;
    newBlock.push(item);

    if(i + 1 === block.length) {
      if(nextStart < 1440) {
        newBlock.push({label: "", start: nextStart, size: 1440 - nextStart, color: "#fff"});
      }
    }
    else {
      const nextItem = block[i + 1];
      if(nextStart < nextItem.start) {
        newBlock.push({label: "", start: nextStart, size: nextItem.start - nextStart, color: "#fff"});
      }
    }
    
  }

  

  return (
    <View style={styles_common.container}>
      {/*
      <View>
        <Text style={styles_text.common}>Zoom: {zoom.toFixed(2)}</Text>
        <Slider
          value={zoom}
          onValueChange={handleZoomChange}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          style={{ width: 300 }}
          thumbTintColor="#007AFF"
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#000000"
        />
  </View>*/}

      <View style={{flexDirection: "row"}}>
        <View style={{flex:1}}>
          <FlatList
            data={newBlock}
            renderItem={({item}) => {
              const size = item.size;
              return(
                <View style={{
                  //height: size < minSize ? minSize : size > maxSize ? maxSize : size,
                  height: size * zoom,
                  backgroundColor: item.color + alpha,
                  borderColor: item.color + borderAlpha,
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 1,
                  paddingHorizontal: 5,
                }}>
                  <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                      <Text style={styles_text.common}>{getTimeFromMinutes(item.start)}</Text>
                    </View>
                    
                    <View style={{flex: 1, alignItems: "center"}}>
                      <Text style={styles_text.common}>{getTimeFromMinutes(item.size)}</Text>
                    </View>

                    <View style={{flex: 1, alignItems: "flex-end"}}>
                      <Text style={styles_text.common}>{item.label}</Text>
                    </View>
                  </View>

                  <View style={{flex: 1, justifyContent: "flex-end"}}>
                    <Text style={styles_text.common}>{getTimeFromMinutes(item.start + item.size)}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View style={{flex:1}}>
          
        </View>
      </View>

    </View>
  );
}



function getTimeFromMinutes(minutes) {
  const h = parseInt(minutes/60).toString().padStart(2, '0');
  const m = parseInt(minutes%60).toString().padStart(2, '0');
  return `${h}:${m}`;
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
