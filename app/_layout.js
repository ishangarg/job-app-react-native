import { Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().then(() => {
    console.log("SplashScreen prevented from auto-hiding");
}).catch(console.warn);

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            console.log('Fonts loaded, hiding SplashScreen');
            await SplashScreen.hideAsync().then(() => {
                console.log("SplashScreen hidden");
            }).catch(console.warn);
        }
    }, [fontsLoaded]);

    useEffect(() => {
        console.log('Checking font load status');
        if (fontsLoaded) {
            console.log('Fonts are loaded, preparing to hide SplashScreen');
            onLayoutRootView();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        console.log('Fonts not loaded yet');
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack />
        </View>
    );
}

export default Layout;
