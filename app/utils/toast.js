import Toast from 'react-native-root-toast';

function ShowToast(text) {
  if (!text) {
    return;
  }
  Toast.show(text, {duration: 1000, backgroundColor: '#9c9c9c', position: -50})
}

export {
  ShowToast,
}
