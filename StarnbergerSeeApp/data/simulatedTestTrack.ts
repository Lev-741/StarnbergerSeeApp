// <?xml version="1.0" encoding="UTF-8"?>
// <gpx xmlns="http://www.topografix.com/GPX/1/1"
//   version="1.1"
//   creator="Copilot"
//   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//   xsi:schemaLocation="http://www.topografix.com/GPX/1/1 https://www.topografix.com/GPX/1/1/gpx.xsd">
//   <wpt lat="47.928826" lon="11.298118"><time>2025-07-15T15:00:00Z</time></wpt>
//   <wpt lat="47.930620" lon="11.297787"><time>2025-07-15T15:00:43Z</time></wpt>
//   <wpt lat="47.928948" lon="11.296713"><time>2025-07-15T15:01:26Z</time></wpt>
//   <wpt lat="47.927001" lon="11.297654"><time>2025-07-15T15:02:09Z</time></wpt>
// </gpx>

import * as Location from "expo-location";

export const simulatedRoute: Location.LocationObject[] = [
  {
    coords: {
      latitude: 47.928826,
      longitude: 11.298118,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: 5.55,
    },
    timestamp: 1752591600000,
  },
  {
    coords: {
      latitude: 47.93062,
      longitude: 11.297787,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: 5.55,
    },
    timestamp: 1752591643000,
  },
  {
    coords: {
      latitude: 47.928948,
      longitude: 11.296713,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: 5.55,
    },
    timestamp: 1752591686000,
  },
  {
    coords: {
      latitude: 47.927001,
      longitude: 11.297654,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: 5.55,
    },
    timestamp: 1752591729000,
  },
];

const startTime = 1752591600000;

export const simulatedRoute2 = [
  {
    fromLatitude: 47.886799,
    fromLongitude: 11.280765,
    toLatitude: 47.896639,
    toLongitude: 11.276649,
    steps: 30,
  },
  {
    fromLatitude: 47.896639,
    fromLongitude: 11.276649,
    toLatitude: 47.908334,
    toLongitude: 11.286825,
    steps: 50,
  },
  {
    fromLatitude: 47.908334,
    fromLongitude: 11.286825,
    toLatitude: 47.886799,
    toLongitude: 11.280765,
    steps: 60,
  },
];

export function getSimulatedRoute() {
  let simulatedRoute3: Location.LocationObject[] = [];
  for (let i = 0; i < simulatedRoute2.length; i++) {
    const route = simulatedRoute2[i];
    let distanceLat = 0;
    let distanceLong = 0;
    if (route.fromLatitude < route.toLatitude) {
      distanceLat = route.toLatitude - route.fromLatitude;
    } else {
      distanceLat = route.fromLatitude - route.toLatitude;
    }
    if (route.fromLongitude < route.toLongitude) {
      distanceLong = route.toLongitude - route.fromLongitude;
    } else {
      distanceLong = route.fromLongitude - route.toLongitude;
    }

    const stepsDistanceLat = distanceLat / simulatedRoute2[i].steps;
    const stepsDistanceLong = distanceLong / simulatedRoute2[i].steps;

    for (let j = 0; j < simulatedRoute2[i].steps; j++) {
      const stepsDistanceAddedLat =
        simulatedRoute2[i].fromLatitude + stepsDistanceLat * j;
      const stepsDistanceAddedLong =
        simulatedRoute2[i].fromLongitude + stepsDistanceLong * j;

      const object: Location.LocationObject = {
        coords: {
          latitude: stepsDistanceAddedLat,
          longitude: stepsDistanceAddedLong,
          altitude: null,
          accuracy: null,
          altitudeAccuracy: null,
          heading: null,
          speed: 20 / 3.6,
        },
        timestamp: 1752591729000 + j * 1000,
      };
      simulatedRoute3.push(object);
    }
  }
  return simulatedRoute3;
}

console.log(getSimulatedRoute());
