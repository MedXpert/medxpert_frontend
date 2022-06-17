/* eslint-disable no-async-promise-executor */
import BackgroundService from "react-native-background-actions";
import {sendSms} from "../sendEmergency/sendSms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../constants/colors";

export const backgroundService = async () => {
  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).

  const sleep = async time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  const {phoneNumber, message} = {
    phoneNumber: "0916112143",
    message:
      "A possible fall has been detected from useNameHere phone, please check them.",
  };

  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    console.log("inside background service");

    const {delay} = taskDataArguments;
    var counting = 0;

    await new Promise(async resolve => {
      console.log("counting for loop promise");
      for (let i = 0; counting <= 15; i++) {
        counting += 1;
        console.log(counting);
        const abort = await AsyncStorage.getItem("@fallDetectionAbort");
        if (abort) {
          break;
        }
        await AsyncStorage.setItem("@counting", counting.toString());
        await sleep(delay);
      }
      const abort = await AsyncStorage.getItem("@fallDetectionAbort");
      if(!abort){
        // sendSms(phoneNumber, message);
        console.log("Message sent");
        return;
      }else{  
        await AsyncStorage.removeItem("@fallDetected");
        await AsyncStorage.removeItem("@counting");
        await AsyncStorage.removeItem("@fallDetectionAbort");
        await BackgroundService.stop();
      }
    });
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
