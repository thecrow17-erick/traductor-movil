import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native"
import { Translate } from "./components"

export const ScreenApp = () => {
  return (
    <SafeAreaView style={styleSheet.todo}>
      <ScrollView >
        <Translate/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styleSheet = StyleSheet.create({
  todo: {
    backgroundColor:"white",
    width: "100%",
    height: "100%"
  },
})

