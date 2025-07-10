import { StyleSheet, Text, View } from 'react-native';


interface Props {
  speed: number
}

export function Speedometer({speed}: Props) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{speed + " km/h"}</Text>
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
