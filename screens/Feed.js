import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import PostList from "../components/PostList";

export default function Feed({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <PostList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
