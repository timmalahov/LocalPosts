import React, { useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "../RootNavigation";
import * as Linking from "expo-linking";
import { connect } from "react-redux";
import { getThemeByKey } from "./themes";
import Tabs from './Tabs'
import { addLinkHandlers, removeLinkHandlers } from '../services/linkingUtils'

const prefix = Linking.makeUrl("/");

const linking = {
    prefixes: [prefix]
};

const Routes = (props) => {
    const { isAuthentificated, selectedTheme } = props;

    useEffect(() => {
        removeLinkHandlers();
        addLinkHandlers(isAuthentificated);
    }, [isAuthentificated])

    useEffect(() => {
        return () => {
            removeLinkHandlers();
        };
    }, []);

    return (
        <NavigationContainer
            theme={ getThemeByKey(selectedTheme) }
            ref={ navigationRef }
            linking={ linking }
            onReady={ () => {
                isReadyRef.current = true;
                addLinkHandlers(isAuthentificated);
            } }
            fallback={ <Text>Loading...</Text> }
        >
            <Tabs isAuthentificated={ isAuthentificated }/>
        </NavigationContainer>
    );
};

const mapStateToProps = (state) => ({
    isAuthentificated: state.profile.isAuthentificated,
    selectedTheme: state.profile.theme
});

export default connect(mapStateToProps)(Routes);
