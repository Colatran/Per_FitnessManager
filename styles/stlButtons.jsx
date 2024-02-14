import { StyleSheet } from "react-native";
import {
  _stlBtt_base_borderRadius,
  _stlBtt_button_borderRadius,
  _stlBtt_button_color,
  _stlBtt_elevation_idle,
  _stlBtt_elevation_press,
  _stlBtt_pressHeight,
  _stlBtt_shadowColor_idle,
  _stlBtt_shadowColor_press,
  _stlBtt_width_m,
  _stlBtt_height_m,
  _stlBtt_height_s,
  _stlBtt_width_s
} from "./styles";



/**
 * @description u_ utils
 * @description c_ container
 * @description b_ button 
 */
export const stlButtons = StyleSheet.create({
  u_press_idle: {
    elevation: _stlBtt_elevation_idle,
    borderBottomColor: _stlBtt_shadowColor_idle,
    borderBottomWidth: _stlBtt_pressHeight,
  },
  u_press_press: {
    elevation: _stlBtt_elevation_press,
    borderTopColor: _stlBtt_shadowColor_press,
    borderTopWidth: _stlBtt_pressHeight,
  },
  u_pressableContainer: {
    width: "100%",
    height: "100%",
    borderRadius: _stlBtt_button_borderRadius,
    backgroundColor: _stlBtt_button_color,
  },



  c_default: {
    justifyContent: "center",
    alignItems: "center",
    height: _stlBtt_height_m,
    width: _stlBtt_width_m,
    borderRadius: _stlBtt_base_borderRadius,
  },
  c_size_s: {
    height: _stlBtt_height_s,
    width: _stlBtt_width_s,
  },



  b_default: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  b_type_edit: {
    
  }
});

