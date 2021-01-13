import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import PostList from "../components/Posts";

const Feed = () => {
    return (
        <SafeAreaView style={ styles.container }>
            <PostList/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Feed
