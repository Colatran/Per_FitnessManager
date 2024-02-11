import { StyleSheet } from 'react-native';



export const _space_xs = 2;
export const _space_s = 4;
export const _space_m = 8;
export const _space_l = 16;
export const _space_xl = 24;

export const _size_xxs = 16;
export const _size_xs = 36;
export const _sixe_s = 64;
export const _size_m = 100;

export const _borderRadius_m = 12;
export const _borderWidth_xs = 1;
export const _elevation_xxs = 0;
export const _elevation_s = 4;







export const _color_back_0        = '#1e1e1e';
export const _color_back_1        = '#252526';
export const _color_back_1_border = '#2d2d30';
export const _color_back_2        = '#3e3e42';
export const _color_transparent_0 = _color_back_0 + 'f0';
export const _color_front_0       = '#d1d1d1';
export const _color_front_1       = '#c0c0c0';
export const _color_warning_0     = '#cc3300';
export const _color_warning_1     = '#ffcc00';
export const _color_favourite     = '#ffd700';

export const _color_input             = _color_back_1;
export const _color_button            = _color_back_2;
export const _color_button_green      = '#306844';
export const _color_button_red        = '#940000';
export const _color_button_blue       = '#005073';
export const _color_androidRipple     = '#fff';

export const _textColor = _color_front_0;
export const _textColor_label = _color_front_1;
export const _fontSize = 14;
export const _fontSize_title = 20;
export const _fontSize_label = 12;

export const _textShadowColor = '#0005';
export const _textShadowOffset = {width: 1, height: 1};
export const _textShadowRadius = 5;
export const _textShadowRadius_title = 10;





export const _color_listItem = _color_back_1;

export const _space_container_padding_h = _space_m;
export const _space_container_padding_v = _space_s;

export const _space_item_margin_h = _space_m;
export const _space_item_margin_v = _space_s;

export const _space_listItem_margin = _space_m;
export const _space_list_margin_v = _space_m;

export const _border_color_section = _color_back_2;
export const _border_size_section = 1;



export const _stlBtt_height = _size_xs;
export const _stlBtt_width = _size_xs;
export const _stlBtt_base_borderRadius = 16;
export const _stlBtt_button_borderRadius = 2;
export const _stlBtt_button_color = "#777";
export const _stlBtt_elevation_idle = _elevation_s;
export const _stlBtt_elevation_press = _elevation_xxs;
export const _stlBtt_pressHeight = 2;
export const _stlBtt_shadowColor_idle = "#0004";
export const _stlBtt_shadowColor_press = "#0000";



export const android_ripple_style = { 
  borderless: true,
  color: _color_androidRipple,
};



export const _color_icon = _color_front_0;
export const _iconSize_s = 16;
export const _iconSize_m = 30;
export const _iconSize_l = 60;

export const _icon_add = 'plus';
export const _icon_edit = 'pencil';
export const _icon_checkout = 'eye';
export const _icon_yes = 'check';
export const _icon_no = 'close';
export const _icon_save = 'content-save';
export const _icon_delete = 'delete-forever';
export const _icon_boolean_true = 'check';
export const _icon_boolean_false = '';
export const _icon_alert = 'alert';
export const _icon_edit_list = 'file-document-edit';
export const _icon_favourite = 'star';
export const _icon_select = 'cursor-pointer';













//LEGACY
export const styles_common = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _color_back_0,
  },
  container_front: {
    borderRadius: _borderRadius_m,
    backgroundColor: _color_back_1,
    elevation: _elevation_s,
  },

  form: {
    borderRadius: _borderRadius_m,
    backgroundColor: _color_back_2,
    elevation: _elevation_s,
    paddingHorizontal: _space_m,
    paddingVertical: _space_l,
  },

  icon_margin: {
    width: 30,
    height: 31,
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
  label: {
    color: _color_front_1,
    textShadowColor: _textShadowColor,
    textShadowOffset: _textShadowOffset,
    textShadowRadius: _textShadowRadius,
    fontSize: _fontSize_label,
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
  },

  

  centred: {
    textAlign: 'center'
  }
});

export const styles_lists = StyleSheet.create({
  container_list: {
    flex: 1,
    paddingHorizontal: _space_m,
    backgroundColor: _color_back_0,
  },

  container_item: [styles_common.container_front, {
    paddingHorizontal: _space_m,
    paddingVertical: _space_s,
    marginVertical: _space_xs,
    flexDirection: "row",
    alignItems: "center"
  }],
  
  container_label: {
    marginHorizontal: _space_s,
    flex: 1,
  },
});

export const styles_buttons = StyleSheet.create({
  seperator: {
    marginHorizontal: _space_s,
  },

  sided: {
    flexDirection: "row",
  },

  button_fill: {
    flex: 1,
  },
  button_y: {
    backgroundColor: _color_button_green,
  },
  button_n: {
    backgroundColor: _color_button_red,
  },
  button_edit: {
    backgroundColor: _color_button_blue,
  },
  button_check: {
    backgroundColor: _color_button_blue,
  },

  container_footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: _space_l,
  },
  container_button: {
    flex: 1,
    flexDirection: "row"
  },
});


 const nut_blue       = '#5588ff';
 const nut_yellow_01  = '#f9a73e';
 const nut_yellow_02  = '#bf710d';
 const nut_red        = '#bf212f';
 const nut_green_01   = '#79d61c';
 const nut_green_02   = '#add683';
 const nut_green_03   = '#4d9605';
 const nut_silver     = '#c0c0c0';



