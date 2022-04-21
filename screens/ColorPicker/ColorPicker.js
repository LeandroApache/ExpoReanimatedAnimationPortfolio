import {View, StyleSheet} from "react-native";
import Picker from "./components/Picker";
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {useCallback} from "react";

const COLORS = [
    "red",
    "purple",
    "blue",
    "cyan",
    "green",
    "yellow",
    "orange",
    "black",
    "white",
];

const CIRCLE_SIZE = 250;

const ColorPicker = () => {

    const backgroundColor = useSharedValue(COLORS[0]);

    const changeColorHandler = useCallback((newColor) => {
        'worklet';
        backgroundColor.value = newColor;
    }, []);

    const rCircleStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor: backgroundColor.value,
        }
    });

    return <>
        <View style={styles.topContainer}>
            <Animated.View style={[styles.circle, rCircleStyle]}/>
        </View>
        <View style={styles.bottomContainer}>
            <Picker colors={COLORS} onChangeColor={changeColorHandler}/>
        </View>
    </>
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        // backgroundColor: "red",
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: 'center',
        alignItems: "center"
    }
});

export default ColorPicker;
