import {View, Text, StyleSheet} from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CountDown from "react-native-countdown-component";
import {CustomText} from "../../../components/general/CustomText";
import colors from "../../../constants/colors";
import {FallContext} from "../../../components/general/Context";
import {CustomButton} from "../../../components/general/CustomButton";
import {requestPermissions} from "../../../services/permissions/requestPermissions";
import { CountdownCircleTimer, useCountdown  } from "react-native-countdown-circle-timer";

const FallDetected = ({duration = 15}) => {
  const [timer, setTimer] = useState(0);
  const {fallStatus} = useContext(FallContext);
  const [count, setCount] = useState(15);

  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: true, duration: 15, colors: "#abc" });

  const onFinish = async () => {
    // Send sms message to emergency contacts
    // Send email to emergency contacts

    await AsyncStorage.removeItem("@fallDetected");
    fallStatus();
  };

  const onIAmOkay = async () => {
    await AsyncStorage.removeItem("@fallDetected");
    await AsyncStorage.setItem("@fallDetectionAbort", "true");
    fallStatus();
  };


  return (
    <View style={styles.container}>
      <CustomText
        content={"Possible fall detected. Are you okay?"}
        customStyles={{color: colors.white}}
        fontSize={18}
      />
      <CustomText content={"Sending emergency email and sms in"} fontSize={16} fontColor={colors.white} customStyles={{marginBottom: 20  }} />
      <View style={{marginTop: 20  }}>
        <CountdownCircleTimer
          isPlaying
          duration={parseInt(duration)}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={onFinish}
        >
          {({ remainingTime }) => <CustomText content={remainingTime} fontSize={30}></CustomText>}
        </CountdownCircleTimer>
      </View>

      <View style={styles.textAndButton}>
       
        <View style={styles.buttons}>
          <CustomButton
            customStyle={{padding: 10}}
            title={"I am okay"}
            backgroundColor={colors.green}
            fontColor={colors.white}
            height={70}
            width={"100%"}
            onPress={() => {
              onIAmOkay();
            }}
          />
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
  },
  textAndButton: {
    marginTop: 40,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});

export default FallDetected;
