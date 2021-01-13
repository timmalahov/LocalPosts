import React, { useEffect } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useTheme } from "@react-navigation/native";
import { isRtl } from "../localization";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { getPostDetails } from "../components/Posts/actions";

const defaultMapText = "This post was made from this location:";

const coordinates = {
    latitude: 35.1790507,
    longitude: -6.1389008
};

const region = {
    ...coordinates,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
};

export default function BlogPostDetails (props) {
    const theme = useTheme();
    const postDetails = useSelector((state) => get(state, "posts.postDetails"));
    const dispatch = useDispatch();

    const {
        route: { params }
    } = props;

    const themedStyles = styles(theme);

    useEffect(() => {
        dispatch(getPostDetails(params.id));
    }, [params]);

    return (
        <SafeAreaView style={ themedStyles.container }>
            <ScrollView>
                <View>
                    <Image
                        style={ themedStyles.image }
                        source={ {
                            uri: `https://picsum.photos/id/${ params.id }/500/500`
                        } }
                    />
                    <Text
                        style={ [
                            themedStyles.titleText,
                            ...(isRtl() ? [themedStyles.textRtl] : [])
                        ] }
                    >
                        { postDetails.title }
                    </Text>
                </View>
                <Text
                    style={ [
                        themedStyles.bodyText,
                        ...(isRtl() ? [themedStyles.textRtl] : [])
                    ] }
                >
                    { postDetails.body }
                </Text>
                <View>
                    <Text
                        style={ [
                            themedStyles.mapDescriptionText,
                            ...(isRtl() ? [themedStyles.textRtl] : [])
                        ] }
                    >
                        { defaultMapText }
                    </Text>
                    <MapView
                        style={ themedStyles.map }
                        region={ region }
                    >
                        <Marker coordinate={ coordinates }/>
                    </MapView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = theme =>
    StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: theme.colors.secondary
        },
        image: {
            width: "100%",
            height: 500
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
            textTransform: "capitalize"
        },
        bodyText: {
            padding: 20,
            margin: 10,
            fontSize: 18,
            borderLeftColor: "#222",
            backgroundColor: theme.colors.secondary,
            color: theme.colors.text
        },
        mapDescriptionText: {
            textAlign: "center",
            padding: 10,
            backgroundColor: "#222",
            color: "#fff",
            fontSize: 16
        },
        map: {
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height / 3
        },
        textRtl: {
            textAlign: "right"
        }
    });
