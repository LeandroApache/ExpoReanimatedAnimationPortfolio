import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
    CIRCLE_PROGRESS_BAR,
    COLORS_STACK,
    GESTURES_STACK,
} from "./constants";
import {FontAwesome} from '@expo/vector-icons'
import {Entypo} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import SquareWithCircle from "../screens/PanGestureHandler/SquareWithCircle";
import InterpolatedScroll from "../screens/InterpolatedScroll/InterpolatedScroll";
import ToggleScheme from "../screens/ToggleTheme/ToggleScheme";
import PinchImage from "../screens/PinchImage/PinchImage";
import SingleDoubleTaps from "../screens/SingleDoubleTaps/SingleDoubleTaps";
import PanGestureScroll from "../screens/PanGestureScroll/PanGestureScroll";
import ColorPicker from "../screens/ColorPicker/ColorPicker";
import CircleProgressBar from "../screens/CircleProgressBar/CircleProgressBar";
import SwipeToDelete from "../screens/SwipeToDelete";
import RippledSquare from "../screens/RippledSquare";
import PerspectiveMenu from "../screens/PerspectiveMenu";
import SlidingCounter from "../screens/SlidingCounter";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const GesturesStack = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={"Try to pull the square"} component={SquareWithCircle}/>
            <Drawer.Screen name={"Try zooming it..."} component={PinchImage}/>
            <Drawer.Screen name={"Tap one or two times..."} component={SingleDoubleTaps}/>
            <Drawer.Screen name={"Try to scroll..."} component={PanGestureScroll}/>
            <Drawer.Screen name={"Try to swipe any task..."} component={SwipeToDelete}/>
            <Drawer.Screen name={"Tap on the square..."} component={RippledSquare}/>
            <Drawer.Screen name={"Click or swipe"} component={PerspectiveMenu}/>
            <Drawer.Screen name={"Sliding counter"} component={SlidingCounter}/>
        </Drawer.Navigator>
    )
};

const ColorsStack = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={"Colors picker"} component={ColorPicker} options={{title: "Color picker panel"}}/>
            <Drawer.Screen name={"Interpolated scroll"} component={InterpolatedScroll}/>
            <Drawer.Screen name={"Toggle schema"} component={ToggleScheme}/>
        </Drawer.Navigator>
    )
};

const RootStack = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === GESTURES_STACK) {
                        iconName = "hand-pointer-o";
                        return <FontAwesome name={iconName} size={24} color={focused ? "tomato" : "gray"}/>
                    } else if (route.name === COLORS_STACK) {
                        iconName = "colours";
                        return <Entypo name={iconName} size={24} color={focused ? "tomato" : "gray"}/>
                    } else if (route.name === CIRCLE_PROGRESS_BAR) {
                        iconName = "progress-check";
                        return <MaterialCommunityIcons name={iconName} size={24} color={focused ? "tomato" : "gray"}/>
                    }

                    // You can return any component that you like here!
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                // tabBarLabel: "Opacity"
            })}>
                <Tab.Screen name={GESTURES_STACK} component={GesturesStack}
                            options={{title: "Gestures"}}/>
                <Tab.Screen name={COLORS_STACK} component={ColorsStack}
                            options={{title: "Colors"}}/>
                <Tab.Screen name={CIRCLE_PROGRESS_BAR} component={CircleProgressBar}
                            options={{title: "Progress Bar"}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
};

export default RootStack;
