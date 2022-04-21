import {View, Text, StyleSheet} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
    interpolate, runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import {useCallback, useState} from "react";

const BUTTON_WIDTH = 200;
const CIRCLE_SIZE = 70;
const BUTTON_HEIGHT = 80;

const clamp = (value, min, max) => {
    "worklet";
    return Math.min(Math.max(value, min), max);
};

const Counter = () => {

    const [count, setCount] = useState(0);

    const incrementHandler = useCallback(() => {
        setCount((prevState) => prevState + 1);
    }, []);
    const decrementHandler = useCallback(() => {
        setCount((prevState) => prevState - 1);
    }, []);
    const cleanHandler = useCallback(() => {
        setCount(0);
    }, []);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

    const panGestureHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            console.log(event.translationY)
            translateX.value = clamp(
                event.translationX,
                -MAX_SLIDE_OFFSET,
                MAX_SLIDE_OFFSET,
            );
            translateY.value = clamp(
                event.translationY,
                0,
                MAX_SLIDE_OFFSET,
            )
        },
        onEnd: () => {
            if (translateX.value === MAX_SLIDE_OFFSET) {
                runOnJS(incrementHandler)();
            } else if (translateX.value === -MAX_SLIDE_OFFSET) {
                runOnJS(decrementHandler)();
            } else if (translateY.value === MAX_SLIDE_OFFSET) {
                runOnJS(cleanHandler)();
            }
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        },
    });

    const rCircleStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value},
            ]
        }
    });

    const rPlusMinusStyle = useAnimatedStyle(() => {
        const opacityX = interpolate(
            translateX.value,
            [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
            [0.2, 1, 0.2]
        );

        const opacityY = interpolate(
            translateY.value,
            [0, MAX_SLIDE_OFFSET],
            [1, 0]
        );

        return {
            opacity: opacityX * opacityY,
        };
    });
    const rCloseStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [0, MAX_SLIDE_OFFSET],
            [0, 1]
        );

        return {
            opacity,
        };
    });

    const rCounterStyle = useAnimatedStyle(()=>{
        return {
            transform: [
                {translateX: translateX.value * 0.1},
                {translateY: translateY.value * 0.1},
            ]
        }
    })

    return <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={[styles.counter, rCounterStyle]}>
                <Animated.View style={rPlusMinusStyle}>
                    <AntDesign name="plus" size={45} color="white"/>
                </Animated.View>
                <Animated.View style={rCloseStyle}>
                    <AntDesign name="close" size={45} color="white"/>
                </Animated.View>
                <Animated.View style={rPlusMinusStyle}>
                    <AntDesign name="minus" size={45} color="white"/>
                </Animated.View>
                <View style={styles.circleContainer}>
                    <Animated.View style={[styles.circle, rCircleStyle]}>
                        <Text style={styles.text}>{count}</Text>
                    </Animated.View>
                </View>
            </Animated.View>
        </PanGestureHandler>
    </GestureHandlerRootView>
};

const styles = StyleSheet.create({
    counter: {
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        backgroundColor: "black",
        borderRadius: 40,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    circleContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        backgroundColor: "white",
        borderRadius: CIRCLE_SIZE / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 30,
        letterSpacing: 3,
        fontWeight: "700",
    }
})

export default Counter;
