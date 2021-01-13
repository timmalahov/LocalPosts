import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { isRtl } from "../localization";

export default function Post (props) {
    const navigation = useNavigation();
    const theme = useTheme();

    const {
        data: { id, title = "" }
    } = props;

    const handlePostTouch = () => {
        navigation.navigate("Details", { id: id });
    };

    const textStyles = isRtl()
        ? [styles(theme).text, styles(theme).textRtl]
        : [styles(theme).text];

    return (
        <TouchableOpacity style={ styles(theme).container } onPress={ handlePostTouch }>
            <View style={ styles(theme).view }>
                <Image
                    style={ styles(theme).image }
                    source={ {
                        uri: `https://picsum.photos/id/${ id }/500/500`
                    } }
                />
                <Text numberOfLines={ 1 } style={ textStyles }>
                    { title }
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.secondary,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            margin: 10,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        },
        view: {
            width: "100%"
        },
        image: {
            width: "100%",
            height: 200,
            borderRadius: 10
        },
        text: {
            fontSize: 18,
            fontWeight: "700",
            padding: 10,
            textTransform: "capitalize",
            color: "#fff",
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "#2225"
        },
        textRtl: {
            textAlign: "right"
        }
    });
