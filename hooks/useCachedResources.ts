import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { setCustomText } from "react-native-global-props";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
 

  function defaultFonts() {
    const customTextProps = {
      style: {
        fontFamily: "noyh",
        //  fontSize: 20
      },
    };
    setCustomText(customTextProps);
  }

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          noyh: require("../assets/fonts/Noyh-Regular.ttf"),
          noyhB: require("../assets/fonts/Noyh-Bold.ttf"),
          proxima: require("../assets/fonts/Proxima-Nova-Font.otf"),
          proximaB: require("../assets/fonts/proxima-Bold.otf"),
        });

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        defaultFonts();
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
