import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

import colors from "../config/colors";
import AppText from "../components/Text";

function UploadScreen({ onDone, progress = 0, visible = false, Text = "" }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
          <View style={{alignItems : "center", justifyContent : "center"}}>
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/done.json")}
            style={{width: 400, height: 400}}
            speed={1.3}
          />
          <AppText style={{fontSize: 32}} >{Text}
          </AppText>
          </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default UploadScreen;
