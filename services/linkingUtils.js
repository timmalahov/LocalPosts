import * as Linking from 'expo-linking'
import { navigate } from '../RootNavigation'

export const handleURL = ({ url }, isAuthentificated) => {
    let { queryParams } = Linking.parse(url);

    if (queryParams.postId) {
        navigate("Details", { id: queryParams.postId });
        return;
    }

    if (queryParams.options) {
        if (isAuthentificated) {
            navigate("Settings");
            return;
        }
        navigate("Profile", {
            redirectProps: { name: "Settings", params: queryParams.options }
        });
    }
};

export const addLinkHandlers = (isAuthentificated) => {
    Linking.getInitialURL()
        .then((url) => {
            if (url) {
                handleURL({ url }, isAuthentificated);
            }
        })
        .catch((err) => {
            console.error(err);
        });
    Linking.addEventListener("url", (url) => handleURL(url, isAuthentificated));
}

export const removeLinkHandlers = () => {
    Linking.removeEventListener("url");
}
