import { Speedometer } from "@/components/Speedometer";
import { useSettings } from "@/context/SettingsContext";
import { harborMarkers } from "@/data/harbors";
import { outerLines } from "@/data/outerLine";
import { getSimulatedRoute } from "@/data/simulatedTestTrack";
import * as turf from "@turf/turf";
import { point, pointToPolygonDistance, polygon } from "@turf/turf";
import { useAudioPlayer } from "expo-audio";
import * as Location from "expo-location";
import { AppleMaps, Coordinates, GoogleMaps } from "expo-maps";
import {
  AppleMapsMarker,
  AppleMapsPolygon,
} from "expo-maps/build/apple/AppleMaps.types";
import * as ScreenOrientation from "expo-screen-orientation";
// eslint-disable-next-line import/no-unresolved
import { Feature, Polygon } from "geojson";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, Vibration, View } from "react-native";

const audioSource = require("@/assets/alert2.mp3");

const simulatedRoute = getSimulatedRoute();

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

  const player = useAudioPlayer(audioSource);
  // useKeepAwake();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const { isAlertEnabled, isVibrationEnabled, isDemoEnabled } = useSettings();

  const SIMULATE_LOCATION: boolean = isDemoEnabled;

  const locationSpeed = (location?.coords.speed ?? 0) * 3.6;

  // unlock screen rotation
  useEffect(() => {
    const unlockScreenRotation = () => {
      ScreenOrientation.unlockAsync();
    };
    unlockScreenRotation();
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;
    if (SIMULATE_LOCATION === false) {
      const registerLocation = async () => {
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            // console.log(location);
            setLocation(location);
          }
        );
        console.log("Created location subscription");
      };
      registerLocation();
    }
    return () => {
      if (subscription != null) {
        console.log("Remove location subscription");
        subscription.remove();
      }
    };
  }, [SIMULATE_LOCATION]);

  useEffect(() => {
    let unsubscribeInterval: any;
    if (SIMULATE_LOCATION === true) {
      console.log("Going to create location simulator");

      unsubscribeInterval = setInterval(() => {
        const index = new Date().getSeconds() % simulatedRoute.length;
        console.log("Current simulator index: ", index);
        const simulatedLocation = simulatedRoute[index];
        setLocation(simulatedLocation);
      }, 1000);
      console.log("Created location simulator");
    }

    return () => {
      if (unsubscribeInterval != null) {
        console.log("Remove location simulator");
        clearInterval(unsubscribeInterval);
      }
    };
  }, [SIMULATE_LOCATION]);

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
    if (isVibrationEnabled) {
      Vibration.vibrate();
      console.log("vibrates");
    }
    if (isAlertEnabled) {
      player.seekTo(0);
      player.play();
      console.log("plays audio");
    }
  } else if (locationSpeed > 40) {
    alarmState = true;
    if (isVibrationEnabled) {
      Vibration.vibrate();
      console.log("vibrates");
    }
    if (isAlertEnabled) {
      player.seekTo(0);
      player.play();
      console.log("plays audio");
    }
  }

  const markers: AppleMapsMarker[] = harborMarkers;

  const simulatedMarkers: AppleMapsMarker[] = [
    ...markers,
    {
      title: "User Location",
      coordinates: {
        longitude: location?.coords.longitude,
        latitude: location?.coords.latitude,
      },
    },
  ];

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
          markers={SIMULATE_LOCATION ? simulatedMarkers : markers}
        />
        <View style={styles.overlay}>
          <Speedometer speed={locationSpeed} warning={alarmState} />
          
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
    paddingTop: 0,
  },
});
