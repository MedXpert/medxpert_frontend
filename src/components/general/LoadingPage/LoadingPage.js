import { View, Text } from "react-native";
import React from "react";
import colors from "../../../constants/colors";
import Spinner from "react-native-spinkit";

const LoadingPage = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: "center", alignItems: "center" }}>
      <Spinner
        isVisible
        color={colors.primary}
        size={70}
        type="WanderingCubes"
   
      />
    </View>
  );
};

export default LoadingPage;