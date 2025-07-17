import * as React from "react";
import { ComponentType } from "react";
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

export type IconType = keyof typeof MaterialIcons.glyphMap;

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconType;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"];

  /**
   *  Image wrapper size
   */
  wrapperSize?: number;
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size = 16,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View;

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={[WRAPPER, $containerStyleOverride]}
    >
      <MaterialIcons size={size} name={icon} color={color} />
    </Wrapper>
  );
}

const WRAPPER: ViewStyle = {
  borderRadius: 32,
  justifyContent: "center",
  alignItems: "center",
};
