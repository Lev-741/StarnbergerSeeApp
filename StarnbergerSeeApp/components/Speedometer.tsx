import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  speed: number | undefined | null;
  warning: boolean;
}

export function Speedometer({ speed, warning }: Props) {
  const speedRounded = speed?.toFixed(1);
  const topInset = useSafeAreaInsets().top;
  const overwriteStyle = {
    marginTop: topInset,
    backgroundColor: warning ? "red" : "white",
  
  };

  const overwriteStyleText = {
    color: warning ? "white" : "black",
  
  };

  return (
    <View style={[styles.container, overwriteStyle]}>
      <Text style={[styles.text, overwriteStyleText]}>{speedRounded ?? "-"} km/h</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignSelf: "center",
  },
  text: {
    fontSize: 32,
  },
});
