// styles.js or theme.js
import { StyleSheet } from 'react-native';

// colors.js
export const primaryColor = '#00073d';
export const secondaryColor = '#e4eafb';
export const textColor = '#102b4d';
export const IconColor = '#3d6fe2'
// Add more colors as needed


export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },

  body: {
    marginBottom: 20,
  },

  footer: {
    marginTop: 0,
  },

  formContainer: {
    padding: 20,
    height: '100%',
    width: '100%',
  },
  inputContainer: {
    paddingBottom: 15,
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lable: {
    color: textColor,
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 20,
    paddingBottom: 5,
    fontWeight: '600'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: '#D0D5DD',
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
  },
  textHeading: {
    color: textColor,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  textSubHeading: {
    color: textColor,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 32,

  },

  textDesc: {
    color: textColor,
    fontSize: 16,
    fontWeight: '400',

  },
  textSubDesc: {
    color: textColor,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400'
  },
  icons: {
    color: primaryColor
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
    marginVertical: 10,
    backgroundColor: primaryColor
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  dropdownArea: {
    width: "100%",
    height: 300,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginTop: 5,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
  },
  dropDownContent: {
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginTop: 5,

  },
  uploadUI: {
    padding: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    position: 'relative',
  },
  updateProfile: {
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  updateProfileBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: primaryColor,
    color: 'white',
    borderRadius: 15,
    padding: 8,
    fontSize: 15,

  },
  errorText: { color: 'red', fontSize: 14 },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addIcon: {
    backgroundColor: primaryColor,
    color: '#fff', 
    padding: 8,
    borderRadius: 25,
    fontSize: 30
  },

  // Launch Cameras and Gallary Bottom Sheet @start
  launchImageOption: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    position: 'fixed'
  },
  icon: {
    fontSize: 30,
    color: primaryColor,

  },
  touchableOpacity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  }
  // Launch Cameras and Gallary Bottom Sheet @end
});
