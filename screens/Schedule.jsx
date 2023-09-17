import { StyleSheet, View, Text, FlatList, ScrollView} from "react-native";
import { useContext, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, exercises, schedules } from '../firebase.config';

import { color_background_light, styles_common, styles_text } from "../styles/styles";
import Button_Icon from "../components/Button_Icon";
import Slider from "../components/Slider";
import Block from "../components/screen_Schedule/Block";
import Pin from "../components/screen_Schedule/Pin";



const block_minSize = 50;
const block_alpha = "4";
const block_borderAlpha = "6";
const block_marginBetween = 1;
const pin_height = 20;

export default function Schedule({ navigation, route }) {
  const { item } = route.params;

  const [zoom, setZoom] = useState(1.0);
  const [blocks, setBlocks] = useState(getFixedBlocksWithPins(item.blocks, item.pins));
  console.log(blocks);


  const handleZoomChange = (value) => {
    setZoom(value);
  };



  return (
    <View style={styles_common.container}>

      <View style={{margin: 15, justifyContent: "center", alignItems: "center"}}>
        <Text style={styles_text.title}>{item.title}</Text>
      </View>
    
      <View style={{flex:1, flexDirection: "row"}}>

        <View style={{flex:1}}>
             
                <FlatList
                  data={blocks}
                  renderItem={({item}) => 
                    <Block
                      start = {item.start}
                      size = {item.size}
                      label = {item.label}
                      color = {item.color}
                      minSize = {block_minSize}
                      alpha = {block_alpha}
                      borderAlpha = {block_borderAlpha}
                      marginBetweenBlocks = {block_marginBetween}
                      zoom = {zoom}
                      pins = {item.pins}
                      pin_height = {pin_height}
                    />
                  }
                />
        </View>

        <View style={{flex:0}}>
          
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



const getFixedBlocksWithPins = (currentBlocks, pins) => {
  let newBlocks = [];
  let lastPinIndex = {i: 0};

  for (let i = 0; i < currentBlocks.length; i++) {
    const block = currentBlocks[i];
    const block_start = block.start;
    const block_size = block.size;
    const nextStart = block_start + block_size;

    pushNewBlock(newBlocks, block, pins, lastPinIndex);

    if(i + 1 === currentBlocks.length) {
      if(nextStart < 1440) {
        const newBlock = {label: " ", start: nextStart, size: 1440 - nextStart, color: "#fff"};
        pushNewBlock(newBlocks, newBlock, pins, lastPinIndex);
      }
    }
    else {
      const nextBlock = currentBlocks[i + 1];
      if(nextStart < nextBlock.start) {
        const newBlock = {label: " ", start: nextStart, size: nextBlock.start - nextStart, color: "#fff"};
        pushNewBlock(newBlocks, newBlock, pins, lastPinIndex);
      }
    }
  }

  return newBlocks;
}
const pushNewBlock = (newBlocks, block, pins, lastPinIndex) =>  {
  const start = block.start;
  const size = block.size;
  const correspondingPins = getCorrespondingPinsWithFixedMargin(pins, start, size, lastPinIndex);

  if(correspondingPins.length == 0) newBlocks.push(block);
  else newBlocks.push({...block, pins: correspondingPins});
}
const getCorrespondingPinsWithFixedMargin = (pins, start, size, lastPinIndex) => {
  const corresponding = getCorrespondingPins(pins, start, size, lastPinIndex);
  const totalPinHeight = corresponding.length * 5;

  let fixedCorresponding = [];

  if(totalPinHeight > size) {
    corresponding.forEach(pin => {
      fixedCorresponding.push({...pin, margin: 0});
    });
  }
  else {
    corresponding.forEach(pin => {
      const totalHeight = totalPinHeight + size;
      const heightFactor = size / totalHeight;
      const absoluteMargin = pin.pos - start;

      let margin = heightFactor * absoluteMargin;
      if(margin + pin_height > size ) margin = size - pin_height;

      fixedCorresponding.push({...pin, margin: margin});
    });
  }

  return fixedCorresponding;
}

const getCorrespondingPins = (pins, start, size, lastPinIndex) => {
  const end = start + size;

  let correspondingPins = [];

  for (let i = lastPinIndex.i; i < pins.length; i++) {
    const pin = pins[i];
    const pin_pos = pin.pos;

    if(pin_pos >= start) {
      if(pin_pos > end) {
        lastPinIndex.i = i;
        return correspondingPins;
      }
      else {
        correspondingPins.push(pin);
      }
    }
  }

  return correspondingPins;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
