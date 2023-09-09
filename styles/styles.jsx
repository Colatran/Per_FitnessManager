import { StyleSheet } from 'react-native';
import { background_dark, background_light } from './colors';




export const color_background_dark = background_dark;
export const color_background_light = background_light;



export const styles_common = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: background_dark,
  }
});



export const styles_text = StyleSheet.create({
  common: {
    color:'#fff'
  },
  bold: {
    color:'#fff',
    fontWeight: 'bold',
  },

  black_bold: {
    fontWeight: 'bold',
  }
});



export const android_ripple_style = { 
  borderless: true,
  color: '#fff',
};
