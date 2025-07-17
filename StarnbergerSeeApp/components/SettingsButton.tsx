import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Icon } from "./Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends TouchableOpacityProps {}

export const SettingsButton = (props: Props) => {
  const bottomInset = useSafeAreaInsets().bottom;
  return (
    <TouchableOpacity
      style={{ ...styles.container, bottom: bottomInset }}
      {...props}
    >
      <Icon icon="settings" size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    padding: 12,
  },
});
