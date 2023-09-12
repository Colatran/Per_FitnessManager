import { StyleSheet, FlatList, View, Text } from "react-native";
import { useContext, useState } from "react";
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, exercises, schedules } from '../firebase.config';

import { color_background_light, styles_common, styles_text } from "../styles/styles";
import Button_Icon from "../components/Button_Icon";
import Slider from "../components/Slider";



const minSize = 50;
const alpha = "4";
const borderAlpha = "6";
const marginBetweenBlocks = 1;

export default function Schedule({ navigation }) {
  const [blocks, setBlocks] = useState([]);
  const [zoom, setZoom] = useState(1.0);





  const test = {
    title: "WeekDay",
    blocks: [
      {label: "Dormir",   start: 0, size: 360, color: "#0f0", },
      {label: "Trabalho", start: 540, size: 240, color: "#33f", },
      {label: "Intervalo", start: 780, size: 60, color: "#fff", },
      {label: "Trabalho", start: 840, size: 240, color: "#33f", },
      {label: "Trabalho", start: 1200, size: 15, color: "#3ff", },
      {label: "Dormir", start: 1320, size: 120, color: "#0f0", },
    ],
    points: [
      {label: "Almoço 1", point: 540},
      {label: "Almoço 2", point: 1200}
    ]
  };



  const setFixedBlocks = (currentBlocks) => {
    let newBlocks = [];

    for (let i = 0; i < currentBlocks.length; i++) {
      const item = currentBlocks[i];
      const nextStart = item.start + item.size;
      newBlocks.push(item);
  
      if(i + 1 === currentBlocks.length) {
        if(nextStart < 1440) {
          newBlocks.push({label: " ", start: nextStart, size: 1440 - nextStart, color: "#fff"});
        }
      }
      else {
        const nextItem = currentBlocks[i + 1];
        if(nextStart < nextItem.start) {
          newBlocks.push({label: " ", start: nextStart, size: nextItem.start - nextStart, color: "#fff"});
        }
      }
    }

    setBlocks(newBlocks);
  }

  




  const handleZoomChange = (value) => {
    setZoom(value);
  };



  return (
    <View style={styles_common.container}>

      <View style={{margin: 15, justifyContent: "center", alignItems: "center"}}>
        <Text style={styles_text.title}>Title</Text>
      </View>
    
      <View style={{flex:1, flexDirection: "row"}}>
        <View style={{flex:1}}>
          <FlatList
            data={test.blocks}
            renderItem={({item}) => {
              const size = item.size * zoom;
              return(
                <View style={{
                  height: size < minSize ? minSize : size,
                  backgroundColor: item.color + alpha,
                  borderColor: item.color + borderAlpha,
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: marginBetweenBlocks,
                  paddingHorizontal: 5,
                  paddingVertical: 3
                }}>
                  
                  <View style={{flexDirection: "row", flex: 1}}>
                    <View style={{flex: 1}}>
                      <Text style={styles_text.common}>{getTimeFromMinutes(item.start)} - {item.label}</Text>
                      <Text style={styles_text.common}>{getDurationFromMinuts(item.size)}</Text>
                      <View style={{flex: 1, justifyContent: "flex-end"}}>
                        <Text style={styles_text.common}>{getTimeFromMinutes(item.start + item.size)}</Text>
                      </View>
                    </View>
                    <View>
                      <Button_Icon icon="pencil"/>
                    </View>
                  </View>
                  
              </View>
              );
            }}
          />
        </View>

        <View style={{flex:1}}>
          
        </View>
      </View>

      <View style={{marginTop: 10, justifyContent: "center"}}>
        <View style={{alignItems: "center"}}>
          <Text style={styles_text.common}>Zoom: {zoom.toFixed(2)}</Text>
        </View>
        <Slider value={zoom} onValueChange={(value) => handleZoomChange(value)} />
      </View>

    </View>
  );
}



function getHoursNMinutsFromMinutes(minutes) {
  return {
    h: parseInt(minutes/60),
    m: parseInt(minutes%60),
  }
}
function getTimeFromMinutes(minutes) {
  const hm = getHoursNMinutsFromMinutes(minutes);
  const h = hm.h.toString().padStart(2, '0');
  const m = hm.m.toString().padStart(2, '0');
  return `${h}:${m}`;
}
function getDurationFromMinuts(minutes) {
  const hm = getHoursNMinutsFromMinutes(minutes);

  let h = hm.h === 0 ? "" : hm.h.toString() + "h";
  let m = hm.m === 0 ? "" : hm.m.toString() + "min";

  return `${h}${m}`;
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
