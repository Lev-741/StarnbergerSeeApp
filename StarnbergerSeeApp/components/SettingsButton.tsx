import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import { Icon } from "./Icon";

interface Props extends TouchableOpacityProps {}

export const SettingsButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container}}
      {...props}
    >
      <Icon icon="settings" size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
  },
});
