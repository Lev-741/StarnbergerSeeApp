import { AppleMapsMarker } from "expo-maps/build/apple/AppleMaps.types";

const markers: AppleMapsMarker[] = [
  {
    title: "Hafen Starnberg",
    coordinates: {
      longitude: 11.355755,
      latitude: 47.998886,
    },
  },
  {
    title: "Marina Yachthafen",
    coordinates: {
      longitude: 11.2947,
      latitude: 47.869298,
    },
  },
  {
    title: "Hafen Bäck",
    coordinates: {
      longitude: 11.270539,
      latitude: 47.891636,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.312585,
      latitude: 47.955877,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.308705,
      latitude: 47.949997,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.308134,
      latitude: 47.946984,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.281848,
      latitude: 47.906842,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.276315,
      latitude: 47.897599,
    },
  },
  {
    title: "Hafen Seeshaupt",
    coordinates: {
      longitude: 11.321839,
      latitude: 47.821518,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.345539,
      latitude: 47.959962,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.351502,
      latitude: 47.997514,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.338827,
      latitude: 47.991339,
    },
  },
  {
    title: "Hafen",
    coordinates: {
      longitude: 11.336478,
      latitude: 47.986866,
    },
  },
];

export const harborMarkers: AppleMapsMarker[] = markers.map((marker) => ({
  ...marker,
  tintColor: "blue",
  systemImage: "sailboat.fill",
}));
