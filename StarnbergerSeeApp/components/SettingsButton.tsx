import { StyleSheet, Text, View } from 'react-native';




export function SettingsButton() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{"Einstellungen"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 32,
    paddingVertical: 16,
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    marginTop: 64,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 32
  }
});
