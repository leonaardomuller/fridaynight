import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export function CustomMarker({ name }) {
  return (
    <LinearGradient
      colors={["purple", "blue"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.marker}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    bottom: 40,
    right: "20%",
    borderRadius: 50,
  },
  marker: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 50,
    elevation: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
