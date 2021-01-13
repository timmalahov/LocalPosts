import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../RootNavigation";
import { isRtl } from "../../localization";
import { get } from "lodash";

const profileDetailsText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus iaculis est quis ultrices. Quisque quis nibh efficitur, malesuada ligula sit amet, tincidunt purus. Praesent efficitur lobortis risus, vel tempus arcu varius at. Nam a sapien non dolor ultrices condimentum. Mauris id mollis diam, et congue est. Vivamus dignissim velit nulla, quis consectetur felis pharetra ut. Sed id tempor lectus. ";

export default function Profile (props) {
    const theme = useTheme();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const themedStyles = styles(theme);

    const { isAuthentificated, login, logout, route } = props;

    const redirectProps = get(route, "params.redirectProps");

    const handleLogin = () => {
        login();

        if (redirectProps) {
            navigate(redirectProps.name, redirectProps.params);
        }
    };

    const handleLoginPress = (isAuth) => {
        setUsername('')
        setPassword('')
        if (isAuth) {
            handleLogin();
        } else {
            logout();
        }
    };

    console.log(username, password)
    console.log(username && password)

    const ProfileDetails = () => (
        <ScrollView style={ themedStyles.profileDetails }>
            <View>
                <Image
                    style={ themedStyles.image }
                    source={ {
                        uri: `https://picsum.photos/id/1027/500/500`
                    } }
                />
                <Text
                    style={ [
                        themedStyles.loginText,
                        ...(isRtl() ? [themedStyles.textRtl] : [])
                    ] }
                >
                    Profile Info
                </Text>
            </View>
            <Text
                style={ [
                    themedStyles.detailsText,
                    ...(isRtl() ? [themedStyles.textRtl] : [])
                ] }
            >
                { profileDetailsText }
            </Text>
            <Button title={ "Log Out" } onPress={ () => handleLoginPress(false) }/>
        </ScrollView>
    );

    return (
        <View style={ themedStyles.container }>
            { isAuthentificated ? (
                <ProfileDetails/>
            ) : (
                <View style={ themedStyles.loginPanel }>
                    <TextInput
                        style={ [
                            themedStyles.input,
                            ...(isRtl() ? [themedStyles.textRtl] : [])
                        ] }
                        onChangeText={ (text) => setUsername(text) }
                        placeholder="Login"
                    />
                    <TextInput
                        style={ [
                            themedStyles.input,
                            ...(isRtl() ? [themedStyles.textRtl] : [])
                        ] }
                        onChangeText={ (text) => setPassword(text) }
                        placeholder="password"
                        secureTextEntry
                    />
                    <Button
                        style={ themedStyles.button }
                        disabled={ !(username && password) }
                        title={ "Log In" }
                        onPress={ () => handleLoginPress(true) }
                    />
                </View>
            ) }
        </View>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.secondary
        },
        loginPanel: {
            width: "100%",
            alignItems: "center"
        },
        input: {
            width: "80%",
            borderRadius: 5,
            borderColor: "#47a4ef",
            borderWidth: 1,
            height: 40,
            padding: 10,
            margin: 10,
            color: theme.colors.text
        },
        button: {
            color: "#f00",
            margin: 20
        },
        profileDetails: {
            height: "100%",
            width: "100%"
        },
        image: {
            width: "100%",
            height: 500
        },
        loginText: {
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
        detailsText: {
            padding: 20,
            fontSize: 18,
            color: theme.colors.text
        },
        textRtl: {
            textAlign: "right"
        }
    });
