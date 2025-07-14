import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  speed: number | undefined | null;
}

export function Speedometer({ speed }: Props) {
  const speedRounded = speed?.toFixed(1)
  const topInset = useSafeAreaInsets().top;
  return (
    <View style={[styles.container, { marginTop: topInset }]}>
      <Text style={styles.text}>{speedRounded ?? "-"} km/h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignSelf: "center",
  },
  text: {
    fontSize: 32,
  },
});
