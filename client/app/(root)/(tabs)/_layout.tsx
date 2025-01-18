import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient"

interface Tab {
  focused: boolean,
  icon: ImageSourcePropType,
  title: string,
  isCustom: boolean
}

const TabIcon = ({ focused, icon, title, isCustom}: Tab) => (
  <View className="flex-1 flex flex-col items-center">
    {isCustom ? (
      <View className="rounded-full overflow-hidden relative  ">
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#fda4af', '#a855f7']} className="p-5">
        <Image source={images.magicwand} className="w-7 h-7" tintColor={"#fff"} />
      </LinearGradient>
      </View>
    ) : (
      <Image
        source={icon}
        tintColor={focused ? "#262626" : "#666876"}
        resizeMode="contain"
        className="w-7 h-7 mt-2"
      />
    )}
    <Text
      className={`${
        focused
          ? "text-[#262626] font-rubik-semibold"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center mt-2`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#e5e5e5",
          borderTopWidth: 0,
          minHeight: 70,
          borderTopStartRadius: 25,
          borderTopEndRadius: 25
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" isCustom={false} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Explore" isCustom={false} />
          ),
        }}
      />
      <Tabs.Screen
        name="magic"
        options={{
          title: "Magic",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={images.magicwand}
              title="Magic"
              isCustom={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.bell} title="Alerts" isCustom={false} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" isCustom={false} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
