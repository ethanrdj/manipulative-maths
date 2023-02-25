import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import { MainView } from "./src/MainView"

export default function App() {
  return (
    <View style={styles.container}>
      <MainView />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
})
