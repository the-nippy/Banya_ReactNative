import Toast from 'react-native-root-toast';

 function ShowToast(text) {
  if (!text) {
    return;
  }
  Toast.show(text, {duration: Toast.durations.SHORT})
}

export {
   ShowToast,
}