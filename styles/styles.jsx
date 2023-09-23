import { StyleSheet } from 'react-native';
import { background_dark, background_input, background_light } from './colors';




export const color_background_dark = background_dark;
export const color_background_light = background_light;
export const color_background_input = background_input;



export const styles_common = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: background_dark,
  },

  container_front: {
    borderRadius: 10,
    backgroundColor: color_background_light,
    elevation: 4
  }
});



export const styles_text = StyleSheet.create({
  common: {
    color:"#fff",
    shadowColor: "#000",
    textShadowColor: '#0005',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  bold: {
    color:'#fff',
    fontWeight: 'bold',
    textShadowColor: '#0005',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  title: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },

  black_bold: {
    fontWeight: 'bold',
  }
});



export const android_ripple_style = { 
  borderless: true,
  color: '#fff',
};
