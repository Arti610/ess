// styles.js or theme.js
import {StyleSheet} from 'react-native';

// colors.js
export const primaryColor = '#00073d';
export const secondaryColor = '#2ecc71';
export const textColor = '#344054';
// Add more colors as needed


export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: 20,
    height: '100%',
    width: '100%',
  },
  inputContainer: {
    paddingBottom: 30,
  },
  lable: {
    color: textColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    paddingBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 5,
    padding: 10,
    borderRadius: 8,
    background: '#FFF',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    background: '#FFF',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
  },
  textHeading: {
    color: '#101828',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  textDesc: {
    color: '#475467',
    fontSize: 16,
    fontWeight: '400',
  },
  navigateText: {
    color: primaryColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
  },
  primaryButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: primaryColor
  },
  buttonText: {
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  dropdownArea:{
    width:"100%",
    height: 300,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 10,
    borderRadius: 8,
    background: '#FFF',
    marginTop: 5,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
  },
  dropDownContent:{
    width:"100%",
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 10,
    borderRadius: 8,
    background: '#FFF',
    marginTop: 5,

  },
  errorText: {color: 'red', fontSize: 14},
});
