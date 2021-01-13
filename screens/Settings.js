import React from "react";
import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { setTheme } from "../screens/Profile/actions";
import { get } from "lodash";

export default function Settings () {
    const theme = useTheme();
    const dispatch = useDispatch();
    const selectedTheme = useSelector((state) => get(state, "profile.theme"));

    const themedStyles = styles(theme);

    const setSelectedValue = (theme) => {
        dispatch(setTheme(theme));
    };

    const pickerItemColorProp = Platform.OS === 'ios' ? theme.colors.text : '#000'

    return (
        <SafeAreaView style={ themedStyles.container }>
            <View style={ themedStyles.row }>
                <Picker
                    label={ "Theme" }
                    selectedValue={ selectedTheme }
                    style={ themedStyles.picker }
                    itemStyle={ themedStyles.item }
                    onValueChange={ (itemValue) => setSelectedValue(itemValue) }>
                    <Picker.Item color={ pickerItemColorProp } label="Light" value="light"/>
                    <Picker.Item color={ pickerItemColorProp } label="Dark" value="dark"/>
                    <Picker.Item color={ pickerItemColorProp } label="Custom" value="custom"/>
                </Picker>
            </View>
        </SafeAreaView>
    );
}

const styles = (theme) =>
    StyleSheet.create({
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            alignItems: "center",
            justifyContent: "center"
        },
        item: {
            color: theme.colors.text,
            backgroundColor: theme.colors.background
        },
        picker: {
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            height: 50,
            width: 150
        }
    });
