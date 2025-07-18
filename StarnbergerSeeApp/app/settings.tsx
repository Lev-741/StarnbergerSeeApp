import { useSettings } from "@/context/SettingsContext";
import { StyleSheet, Switch, Text, View } from "react-native";



const SettingsScreen = () => {
  const {
    isAlertEnabled,
    setIsAlertEnabled,
    isVibrationEnabled,
    setIsVibrationEnabled,
    isDemoEnabled,
    setIsDemoEnabled,
  } = useSettings();


  return (
    <View style={styles.container}>
      
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
        <Text style={styles.text2}>Demo</Text>
        <Switch
          value={isDemoEnabled}
          onValueChange={setIsDemoEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
