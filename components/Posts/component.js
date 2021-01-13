import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import Post from "./../Post";

export default function PostList (props) {
    const { getPostList, postList } = props
    const theme = useTheme();

    useEffect(() => {
        getPostList()
    }, []);

    return (
        <ScrollView style={ styles(theme).container }>
            {
                postList.map((item) => (
                    <Post key={ item.id } data={ item }/>
                ))
            }
        </ScrollView>
    );
}

const styles = theme =>
    StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: theme.colors.secondary
        }
    });
