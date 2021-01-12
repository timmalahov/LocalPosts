import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useTheme } from "@react-navigation/native";
import { isRtl } from "../localization";

const defaultMapText = "This post was made from this location:";

const coordinates = {
  latitude: 35.1790507,
  longitude: -6.1389008,
};

export default function BlogPostDetails({ ...props }) {
  const theme = useTheme();
  const [data, setData] = useState({});
  const {
    route: { params },
  } = props;

  const themedStyles = styles(theme);

  const getPostDetails = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getPostDetails(params.id);
  }, [params]);

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView>
        <View>
          <Image
            style={themedStyles.image}
            source={{
              uri: `https://picsum.photos/id/${params.id}/500/500`,
            }}
          />
          <Text
            style={[
              themedStyles.titleText,
              ...(isRtl() ? [themedStyles.textRtl] : []),
            ]}
          >
            {data.title}
          </Text>
        </View>
        <Text
          style={[
            themedStyles.bodyText,
            ...(isRtl() ? [themedStyles.textRtl] : []),
          ]}
        >
          {data.body}
        </Text>
        <View>
          <Text
            style={[
              themedStyles.mapDescriptionText,
              ...(isRtl() ? [themedStyles.textRtl] : []),
            ]}
          >
            {defaultMapText}
          </Text>
          <MapView
            style={themedStyles.map}
            region={{
              latitude: 35.1790507,
              longitude: -6.1389008,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker coordinate={coordinates} />
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: "#fff",
      backgroundColor: theme.colors.secondary,
    },
    image: {
      width: "100%",
      height: 500,
    },
    titleText: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor: "#2225",
      color: "#fff",
      padding: 20,
      fontSize: 20,
      fontWeight: "600",
      textTransform: "capitalize",
    },
    bodyText: {
      padding: 20,
      margin: 10,
      fontSize: 18,
      borderLeftColor: "#222",
      backgroundColor: theme.colors.secondary,
      color: theme.colors.text,
    },
    mapDescriptionText: {
      textAlign: "center",
      padding: 10,
      backgroundColor: "#222",
      color: "#fff",
      fontSize: 16,
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height / 3,
    },
    textRtl: {
      textAlign: "right",
    },
  });
