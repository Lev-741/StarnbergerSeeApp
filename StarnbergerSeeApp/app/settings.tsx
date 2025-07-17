import { View, StyleSheet, Text, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Icon } from "@/components/Icon";
import { router } from "expo-router";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSettings } from "@/context/SettingsContext";

interface SettingsScreenProps {}
interface Props extends TouchableOpacityProps {}

const SettingsScreen = () => {
  const {
    isAlertEnabled,
    setIsAlertEnabled,
    isVibrationEnabled,
    setIsVibrationEnabled,
    isDemoEnabled,
    setIsDemoEnabled,
  } = useSettings();

  const topInset = useSafeAreaInsets().top;
  return (
    <View style={styles.container}>
      <View style={{ ...styles.header, marginTop: topInset + 16 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", left: 16, bottom: 16 }}
        >
          <Icon icon="arrow-back" size={36} />
        </TouchableOpacity>
        <Text style={styles.text}>Einstellungen</Text>
      </View>
      <View style={styles.rows}>
        <Text style={styles.text2}>Alarmton</Text>
        <Switch value={isAlertEnabled} onValueChange={setIsAlertEnabled} />
      </View>
      <View style={styles.rows}>
        <Text style={styles.text2}>Vibration</Text>
        <Switch
          value={isVibrationEnabled}
          onValueChange={setIsVibrationEnabled}
        />
      </View>
      <View style={styles.rows}>
        <Text style={styles.text2}>Audio</Text>
        <Switch
          value={isDemoEnabled}
          onValueChange={setIsDemoEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  rows: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 32,
    marginVertical: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 32,
  },
  text2: {
    fontSize: 24,
  },
});

export default SettingsScreen;
