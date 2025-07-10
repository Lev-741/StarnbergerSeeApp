import { Image } from "expo-image";
import { Platform, StyleSheet, View, Text } from "react-native";
import { Speedometer } from "@/components/Speedometer";
import { SettingsButton } from "@/components/SettingsButton";
import { AppleMaps, GoogleMaps } from "expo-maps";

export default function HomeScreen() {
  if (Platform.OS === "ios") {
    return (
      <View>
        <AppleMaps.View style={{ flex: 1 }} />
        <View>
          <Speedometer speed={10} />
          <SettingsButton />
        </View>
      </View>
    );
  } else if (Platform.OS === "android") {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return (
      <View>
        <Text>Maps are only available on Android and iOS</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
