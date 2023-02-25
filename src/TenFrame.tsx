import React, { useMemo } from "react"
import { View, StyleSheet } from "react-native"

type TenFrameProps = {
  count: number
}

export const TenFrame = ({ count = 0 }: TenFrameProps) => {
  const boxes = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => (
      <View key={i} style={[styles.box]}>
        <View style={[i < count ? styles.active : { display: "none" }]} />
      </View>
    ))
  }, [count])

  return (
    <View style={styles.container}>
      <View style={styles.row}>{boxes.slice(0, 5)}</View>
      <View style={styles.row}>{boxes.slice(5)}</View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
  },

  box: {
    width: 50,
    height: 50,
    borderWidth: 1,
    padding: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    height: "90%",
    width: "90%",
    borderRadius: 50,
    backgroundColor: "red",
  },
  inactive: { display: "none" },
  filled: {
    backgroundColor: "black",
  },
})
