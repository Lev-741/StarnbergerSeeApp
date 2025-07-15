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
import { outerLines } from "@/data/outerLine";
import { Feature, Point, Polygon, Position } from "geojson";
import * as turf from "@turf/turf";
import { pointToPolygonDistance, point, polygon } from "@turf/turf";

const StarnbergerSeeCoordinates: Coordinates = {
  latitude: 47.9166,
  longitude: 11.3166,
};

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

const ringTurf = polygon([ring]);

const convertToCoordinates = (numbers: number[]) => ({
  latitude: numbers[1],
  longitude: numbers[0],
});

const ringCoordinates: Coordinates[] = ring.map(convertToCoordinates);

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

  const locationCoordinatesLat = location?.coords.latitude ?? 0;
  const locationCoordinatesLong = location?.coords.longitude ?? 0;

  const pointInsideCoordinates: number[] = [];

  pointInsideCoordinates.push(locationCoordinatesLong, locationCoordinatesLat);

  const pointInside = point(pointInsideCoordinates);

  const pointInsideTest = pointToPolygonDistance(pointInside, ringTurf, {
    units: "meters",
  });

  let alarmState = false;

  if (pointInsideTest < 0 && locationSpeed > 10) {
    alarmState = true;
  }

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
        />
        <View style={styles.overlay}>
          <Speedometer speed={locationSpeed} warning={alarmState} />
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
