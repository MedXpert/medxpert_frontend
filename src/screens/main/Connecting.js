import { View, Text } from "react-native";
import React from "react";
import {CustomText} from "../../components/general/CustomText";
import colors from "../../constants/colors";
import Spinner from "react-native-spinkit";

const Connecting = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", padding: 30}}>
      <Spinner   
        color={colors.white}
        size={50}
        type="Circle"/>
      <CustomText content={"You are not connected to internet."} fontColor={colors.white} fontSize={18} customStyles={{marginTop: 30  }}  />
      <CustomText content={"Please connect to internet."} fontColor={colors.white} fontSize={18} />
    </View>
  );
};

export default Connecting;