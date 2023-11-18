import { StyleSheet } from 'react-native';



export const _space_xs = 2;
export const _space_s = 4;
export const _space_m = 8;
export const _space_l = 16;
export const _space_xl = 24;

export const _size_xs = 36;
export const _sixe_s = 64;
export const _size_m = 100;

export const _borderRadius_m = 12;
export const _elevation_s = 4;

export const _color_base_back         = '#1e1e1e';
export const _color_base_front        = '#252526';
export const _color_baseBorder_front  = '#2d2d30';
export const _color_button            = '#3e3e42';
export const _color_button_green      = "#306844";
export const _color_button_red        = "#940000";
export const _color_neutral_0         = '#d1d1d1';
export const _color_androidRipple     = '#fff';

export const _textColor = _color_neutral_0;
export const _textShadowColor = '#0005';
export const _textShadowOffset = {width: 1, height: 1};
export const _textShadowRadius = 5;
export const _textShadowRadius_title = 10;
export const _fontSize = 14;
export const _fontSize_title = 20;

export const _color_icon = _color_neutral_0;
export const _iconSize_m = 30;

export const _icon_edit = "pencil";
export const _icon_check = "eye";




export const styles_common = StyleSheet.create({
  container: {
    flex: 1,
    padding: _space_l,
    paddingTop: _space_l,
    backgroundColor: _color_base_back,
  },
  container_front: {
    borderRadius: _borderRadius_m,
    backgroundColor: _color_base_front,
    elevation: _elevation_s,
  }
});

export const styles_text = StyleSheet.create({
  common: {
    color: _textColor,    
    textShadowColor: _textShadowColor,
    textShadowOffset: _textShadowOffset,
    textShadowRadius: _textShadowRadius,
    fontSize: _fontSize,
  },
  bold: {
    color: _textColor,    
    textShadowColor: _textShadowColor,
    textShadowOffset: _textShadowOffset,
    textShadowRadius: _textShadowRadius,
    fontSize: _fontSize,
    fontWeight: 'bold',
  },
  title: {
    color: _textColor,  
    textShadowColor: _textShadowColor,
    textShadowOffset: _textShadowOffset,
    textShadowRadius: _textShadowRadius_title,
    fontSize: _fontSize_title,
    fontWeight: 'bold',
  },

  bold_black: {
    fontWeight: 'bold',
  }
});

export const styles_lists = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  container_label: {
    marginHorizontal: _space_s,
    flex: 1,
  },

  button: {
    marginHorizontal: _space_xs,
  }
});



export const android_ripple_style = { 
  borderless: true,
  color: _color_androidRipple,
};







//LEGACY
export const color_background_dark = background_dark;
export const color_background_light = background_light;
export const color_background_input = background_input;
export const background_dark    = "#212121";
export const background_light   = "#343434";
export const background_input   = "#515151";
export const nut_blue       = "#5588ff";
export const nut_yellow_01  = "#f9a73e";
export const nut_yellow_02  = "#bf710d";
export const nut_red        = "#bf212f";
export const nut_green_01   = "#79d61c";
export const nut_green_02   = "#add683";
export const nut_green_03   = "#4d9605";
export const nut_silver     = "#c0c0c0";