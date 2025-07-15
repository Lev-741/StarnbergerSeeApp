import { useState, useEffect } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import { Speedometer } from "@/components/Speedometer";
import { SettingsButton } from "@/components/SettingsButton";
import { AppleMaps, Coordinates, GoogleMaps } from "expo-maps";
import * as Location from "expo-location";
import {
  AppleMapsMarker,
  AppleMapsPolygon,
  AppleMapsPolyline,
} from "expo-maps/build/apple/AppleMaps.types";
import { island1, island2, outerLines } from "@/data/outerLine";
import { Feature, Polygon, Position } from "geojson";
import * as turf from "@turf/turf";
import { pointToPolygonDistance, point, polygon } from "@turf/turf";

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

const innerLine: Feature<Polygon> = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [outerLines],
  },
  properties: {},
};

const buffered: Feature<Polygon> = turf.buffer(innerLine, -0.3, {
  units: "kilometers",
}) as any as Feature<Polygon>;
const bufferedCoordinates = buffered.geometry.coordinates[0];

const ring = [...outerLines, ...bufferedCoordinates.reverse(), outerLines[0]];

const pointInside = point([11.276004, 47.901059]);

const ringTurf = polygon([ring]);

const allPolyLines: AppleMapsPolyline[] = [{ coordinates: slowWaterZone }];

const convertToCoordinates = (numbers: number[]) => ({
  latitude: numbers[1],
  longitude: numbers[0],
});

const outerLineCoordinates: Coordinates[] =
  outerLines.map(convertToCoordinates);
const island1Coordinates: Coordinates[] = island1.map(convertToCoordinates);
const island2Coordinates: Coordinates[] = island2.map(convertToCoordinates);
const innerLineCoordinates: Coordinates[] =
  bufferedCoordinates.map(convertToCoordinates);
const ringCoordinates: Coordinates[] = ring.map(convertToCoordinates);

const marker: AppleMapsMarker[] = [
  { coordinates: outerLineCoordinates[0], title: "outerLineStart" },
  { coordinates: innerLineCoordinates[0], title: "innerLineStart" },
  {
    coordinates: outerLineCoordinates[outerLineCoordinates.length - 1],
    title: "outerLineEnd",
  },
  {
    coordinates: innerLineCoordinates[innerLineCoordinates.length - 1],
    title: "innerLineEnd",
  },
];

const outerLineAppleCoordinates: AppleMapsPolygon[] = [
  { coordinates: ringCoordinates, color: "rgba(255, 0, 0, 0.5))" },
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
        setLocation(location);
      }
    );
  }, []);

  const pointInsideTest = pointToPolygonDistance(pointInside, ringTurf, {
    units: "meters",
  });

  console.log(pointInsideTest);

  if (Platform.OS === "ios") {
    return (
      <>
        <AppleMaps.View
          style={{ flex: 1 }}
          cameraPosition={{
            coordinates: StarnbergerSeeCoordinates,
            zoom: 11.3,
          }}
          polygons={outerLineAppleCoordinates}
          markers={marker}
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
