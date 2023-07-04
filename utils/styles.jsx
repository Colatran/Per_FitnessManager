import { StyleSheet } from 'react-native';

export const android_ripple_style = { 
  borderless: true,
  color: '#fff',
};

export const styles_text = StyleSheet.create({
  common: {
    color:'#fff'
  },
});

export const styles_item = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },

  section_text: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  section_buttons: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
});