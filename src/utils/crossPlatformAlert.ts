import { Alert, Platform } from 'react-native';

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export const showAlert = (
  title: string,
  message?: string,
  buttons?: AlertButton[]
) => {
  if (Platform.OS === 'web') {
    // For web, use native browser dialogs
    if (!buttons || buttons.length === 0) {
      window.alert(message ? `${title}\n\n${message}` : title);
      return;
    }

    // For confirmation dialogs with buttons
    if (buttons.length <= 2) {
      const confirmButton = buttons.find(b => b.style !== 'cancel');
      const cancelButton = buttons.find(b => b.style === 'cancel');
      
      const confirmed = window.confirm(message ? `${title}\n\n${message}` : title);
      
      if (confirmed && confirmButton?.onPress) {
        confirmButton.onPress();
      } else if (!confirmed && cancelButton?.onPress) {
        cancelButton.onPress();
      }
    } else {
      // For multiple buttons, fallback to simple alert
      window.alert(message ? `${title}\n\n${message}` : title);
      // Execute the first non-cancel button's action
      const primaryButton = buttons.find(b => b.style !== 'cancel');
      if (primaryButton?.onPress) {
        primaryButton.onPress();
      }
    }
  } else {
    // For mobile platforms, use React Native's Alert
    Alert.alert(
      title,
      message,
      buttons?.map(button => ({
        text: button.text,
        onPress: button.onPress,
        style: button.style,
      }))
    );
  }
};

export const showConfirm = (
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void,
  confirmText: string = 'OK',
  cancelText: string = 'Cancel'
) => {
  showAlert(title, message, [
    {
      text: cancelText,
      style: 'cancel',
      onPress: onCancel,
    },
    {
      text: confirmText,
      style: 'destructive',
      onPress: onConfirm,
    },
  ]);
};

export const showError = (message: string, title: string = 'Error') => {
  showAlert(title, message);
};