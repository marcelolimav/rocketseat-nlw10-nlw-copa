import { useTheme } from "native-base";
import { Platform } from "react-native";
import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { New } from "../screens/New";
import { Find } from "../screens/Find";
import { Polls } from "../screens/Polls";
import { Details } from "../screens/Details";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  const size = sizes[8];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
          marginLeft: 8,
          marginRight: 8,
          marginBottom: 10,
          borderRadius: 8,
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
          paddingTop: 10,
        },
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: "Novo Bolão",
        }}
      />
      <Screen
        name="polls"
        component={Polls}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: "Meus Bolões",
        }}
      />

      <Screen
        name="find"
        component={Find}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
