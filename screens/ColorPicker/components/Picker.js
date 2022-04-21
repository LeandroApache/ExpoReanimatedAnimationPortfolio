import {GestureHandlerRootView, PanGestureHandler, TapGestureHandler} from "react-native-gesture-handler";
import {View, StyleSheet, Dimensions} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Animated, {
    interpolateColor,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue, withSpring, withTiming
} from "react-native-reanimated";
import AnimatedAddition from "react-native-web/dist/vendor/react-native/Animated/nodes/AnimatedAddition";
import {useCallback} from "react";

const {width} = Dimensions.get("window");
const GRADIENT_WIDTH = width * 0.8;
const PICKER_SIZE = 40;

const Picker = ({colors, onChangeColor}) => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    const adjustedTranslateX = useDerivedValue(() => {
        return Math.min(Math.max(translateX.value, 0), GRADIENT_WIDTH - PICKER_SIZE);
    });

    const endGestureHandler = useCallback(() => {
        'worklet';
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
    }, [])

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.x = adjustedTranslateX.value;

            // we do it in tapGestureHandler
            // translateY.value = withSpring(-PICKER_SIZE);
            // scale.value = withSpring(1.2);
        },
        onActive: (event, context) => {
            console.log(event.translationX);
            translateX.value = event.translationX + context.x;
        },
        onEnd: endGestureHandler,
    });

    const tapGestureHandler = useAnimatedGestureHandler({
        onStart: (event) => {
            translateY.value = withSpring(-PICKER_SIZE);
            scale.value = withSpring(1.2);
            translateX.value = withTiming(event.absoluteX - PICKER_SIZE);
        },
        onEnd: endGestureHandler,
    });

    const rPickerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: adjustedTranslateX.value},
                {translateY: translateY.value},
                {scale: scale.value}
            ]
        }
    });

    const eInternalPickerStyle = useAnimatedStyle(() => {

        //should start with index = 0 for correct work (not one)
        const backgroundInputRange = colors.map((_, index) => (index / colors.length) * GRADIENT_WIDTH);

        const backgroundColor = interpolateColor(translateX.value, backgroundInputRange, colors);

        onChangeColor(backgroundColor);

        return {
            backgroundColor,
        }
    });

    return <GestureHandlerRootView>
        <TapGestureHandler onGestureEvent={tapGestureHandler}>
            <Animated.View>
                <PanGestureHandler onGestureEvent={panGestureHandler}>
                    <Animated.View style={{justifyContent: "center"}}>
                        <LinearGradient colors={colors} style={styles.gradient} start={{x: 0, y: 0}}
                                        end={{x: 1, y: 0}}/>
                        <Animated.View style={[styles.picker, rPickerStyle]}>
                            <Animated.View style={[styles.internalPicker, eInternalPickerStyle]}/>
                        </Animated.View>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </TapGestureHandler>
    </GestureHandlerRootView>
}

const styles = StyleSheet.create({
    gradient: {
        width: GRADIENT_WIDTH,
        height: 40,
        borderRadius: 30
    },
    picker: {
        position: "absolute",
        width: PICKER_SIZE,
        height: PICKER_SIZE,
        borderRadius: PICKER_SIZE / 2,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    internalPicker: {
        height: PICKER_SIZE / 2,
        width: PICKER_SIZE / 2,
        borderRadius: PICKER_SIZE / 4,
        // backgroundColor: "green"
    }
})

export default Picker;


