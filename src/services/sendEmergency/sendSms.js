import SmsAndroid from 'react-native-get-sms-android';
export const sendSms = (phoneNumber, message) => {
  SmsAndroid.autoSend(
    JSON.stringify(phoneNumber),
    JSON.stringify(message),
    fail => {
      console.log('Failed with this error: ' + fail);
    },
    success => {
      console.log('SMS sent successfully');
      console.log(success);
    },
  );
};
