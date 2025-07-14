import { useState, useEffect } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import { Speedometer } from "@/components/Speedometer";
import { SettingsButton } from "@/components/SettingsButton";
import { AppleMaps, Coordinates, GoogleMaps } from "expo-maps";
import * as Location from "expo-location";
import {
  AppleMapsPolygon,
  AppleMapsPolyline,
} from "expo-maps/build/apple/AppleMaps.types";
import { island1, island2, outerLines } from "@/data/outerLine";

const StarnbergerSeeCoordinates: Coordinates = {
  latitude: 47.9166,
  longitude: 11.3166,
};

const slowWaterZone: Coordinates[] = [
  { latitude: 47.89428923505896, longitude: 11.271948378651132 },
  { latitude: 47.99428923505896, longitude: 11.271948378651132 },
  { latitude: 47.89428923505896, longitude: 11.371948378651132 },
  { latitude: 47.89428923505896, longitude: 11.271948378651132 },
];

const allPolyLines: AppleMapsPolyline[] = [{ coordinates: slowWaterZone }];

const convertToCoordinates = (numbers: number[]) => ({
  latitude: numbers[1],
  longitude: numbers[0],
})

const outerLineCoordinates: Coordinates[] = outerLines.map(convertToCoordinates);
const island1Coordinates: Coordinates[] = island1.map(convertToCoordinates);
const island2Coordinates: Coordinates[] = island2.map(convertToCoordinates);

const outerLineAppleCoordinates: AppleMapsPolyline[] = [
  { coordinates: outerLineCoordinates },
  { coordinates: island1Coordinates },
  { coordinates: island2Coordinates },
];



export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const locationSpeed = (location?.coords.speed ?? 0) * 3.6;

  useEffect(() => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        console.log(
          "🚀 ~ useEffect ~ location:",
          (location?.coords.speed ?? 0) * 3.6
        );
        setLocation(location);
      }
    );
  }, []);

  if (Platform.OS === "ios") {
    return (
      <>
        <AppleMaps.View
          style={{ flex: 1 }}
          cameraPosition={{
            coordinates: StarnbergerSeeCoordinates,
            zoom: 11.3,
          }}
          polylines={outerLineAppleCoordinates}
        />
        <View style={styles.overlay}>
          <Speedometer speed={locationSpeed} />
          {/* <SettingsButton /> */}
        </View>
      </>
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

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
