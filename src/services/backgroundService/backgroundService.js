import BackgroundService from "react-native-background-actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {sendSms} from "../sendEmergency/sendSms";
import colors from "../../constants/colors";
import {sendEmail} from "../sendEmergency/sendEmail";

export const backgroundService = async () => {
  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).

  const emergencyContact = await AsyncStorage.getItem("@emergencyContacts");

  const parsedEmergencyContact = JSON.parse(emergencyContact);

  const phoneEmergency = [];
  const emailEmergency = [];

  parsedEmergencyContact.forEach(emergencyContact => {
    if (emergencyContact.phone_number) {
      phoneEmergency.push(emergencyContact.phone_number);
    } else {
      emailEmergency.push(emergencyContact.email);
    }
  });

  const sleep = async time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  const message =
    "A possible fall has been detected from useNameHere phone, please check them.";
  const subject = "Possible fall detected";
  const phoneNumber = "0916112143";
  const email = "liyuumk@gmail.com";

  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    console.log("inside background service");

    const {delay} = taskDataArguments;
    let counting = 0;

    console.log("counting for loop promise");
    for (let i = 0; counting <= 15; i++) {
      const abort = await AsyncStorage.getItem("@fallDetectionAbort");
      counting += 1;
      console.log(counting);
      if (abort) {
        break;
      }
      await AsyncStorage.setItem("@counting", counting.toString());
      await sleep(delay);
    }
    const abort = await AsyncStorage.getItem("@fallDetectionAbort");
    if (!abort) {
      // sendSms(phoneNumber, message);
      emailEmergency.forEach(element => {
        sendEmail(element, subject, message);
      });

      phoneEmergency.forEach(element => {
        sendSms(element, message);
      });

      await BackgroundService.stop();
    } else {
      await AsyncStorage.removeItem("@fallDetected");
      await AsyncStorage.removeItem("@counting");
      await AsyncStorage.removeItem("@fallDetectionAbort");
      await BackgroundService.stop();
    }

    // await new Promise(async resolve => {

    // });
  };

  const options = {
    taskName: "Example",
    taskTitle: "Medxpert is running in the background",
    taskDesc: "A possible fall detected",
    taskIcon: {
      name: "ic_launcher",
      type: "mipmap",
    },
    color: colors.primary,
    linkingURI: "medxpert://homee", // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };

  await BackgroundService.start(veryIntensiveTask, options);

  await BackgroundService.updateNotification({
    taskDesc: "New ExampleTask description",
  }); // Only Android, iOS will ignore this call
  // // iOS will also run everything here in the background until .stop() is called
  // setTimeout(() => {
  //   BackgroundService.stop();
  //   console.log('service stopped');
  // }, 6000);
  // await BackgroundService.stop();
};
