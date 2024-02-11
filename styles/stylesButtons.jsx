import { StyleSheet } from "react-native";
import {
  _stlBtt_height,
  _stlBtt_width,
  _stlBtt_base_borderRadius,
  _stlBtt_button_borderRadius,
  _stlBtt_button_color,
  _stlBtt_elevation_idle,
  _stlBtt_elevation_press,
  _stlBtt_pressHeight,
  _stlBtt_shadowColor_idle,
  _stlBtt_shadowColor_press
} from "./styles";



export const stlButtons = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: _stlBtt_height,
    width: _stlBtt_width,
    borderRadius: _stlBtt_base_borderRadius,
  },

  pressableContainer: {
    width: "100%",
    height: "100%",
    borderRadius: _stlBtt_button_borderRadius,
    backgroundColor: _stlBtt_button_color,
  },
  pressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  button_idle: {
    elevation: _stlBtt_elevation_idle,
    borderBottomColor: _stlBtt_shadowColor_idle,
    borderBottomWidth: _stlBtt_pressHeight,
  },
  button_press: {
    elevation: _stlBtt_elevation_press,
    borderTopColor: _stlBtt_shadowColor_press,
    borderTopWidth: _stlBtt_pressHeight,
  },
});