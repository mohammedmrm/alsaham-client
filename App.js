import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import AppNavigator from "./app/navigations/AppNavigation";
import AuthNavigator from "./app/navigations/AuthNavigator";
import navigationTheme from "./app/navigations/NavigationTheme";
import { navigationRef } from "./app/navigations/rootNavigation";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const [loaded] = useFonts({
    Tjw_blod: require("./app/assets/fonts/Cairo-Bold.ttf"),
    Tjw_xblod: require("./app/assets/fonts/Cairo-Black.ttf"),
    Tjw_medum: require("./app/assets/fonts/Cairo-SemiBold.ttf"),
    Tjw_light: require("./app/assets/fonts/Cairo-Light.ttf"),
    Tjw_reg: require("./app/assets/fonts/Cairo-Regular.ttf"),
    Tjw_Ereg: require("./app/assets/fonts/Cairo-ExtraLight.ttf"),
  });
  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (user.code != "300") setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={async () => {
          setIsReady(true);
          await SplashScreen.hideAsync();
        }}
        onError={(e) => console.log(e)}
      />
    );

  if (!loaded) {
    return null;
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? (
            user.token ? (
              <ApplicationProvider {...eva} theme={eva.light}>
                <AppNavigator />
              </ApplicationProvider>
            ) : (
              <AuthNavigator />
            )
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthContext.Provider>
  );
}
