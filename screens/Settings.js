import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useStore, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { setTheme } from "../screens/Profile/actions";
import { get } from "lodash";

export default function Settings({ navigation }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedTheme = useSelector((state) => get(state, "profile.theme"));

  const themedStyles = styles(theme);

  const setSelectedValue = (theme) => {
    dispatch(setTheme(theme));
  };

  return (
    <SafeAreaView style={themedStyles.container}>
      <View style={themedStyles.row}>
        <Picker
          label={"Theme"}
          selectedValue={selectedTheme}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item style={themedStyles.item} label="Light" value="light" />
          <Picker.Item style={themedStyles.item} label="Dark" value="dark" />
          <Picker.Item
            style={themedStyles.item}
            label="Custom"
            value="custom"
          />
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
      backgroundColor: theme.colors.backgroundColor,
      color: theme.colors.text,
      alignItems: "center",
      justifyContent: "center",
    },
    item: {
      color: theme.colors.text,
    },
    picker: {
      borderColor: "#f00",
      borderWidth: 1,
      height: 50,
      width: 150,
    },
  });
