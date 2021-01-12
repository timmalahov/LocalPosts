import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import Post from "./Post";

export default function PostList({ navigation }) {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=2")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ScrollView style={styles(theme).container}>
      {data.map((item, i) => (
        <Post key={i} data={item} />
      ))}
    </ScrollView>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: theme.colors.secondary,
    },
  });
