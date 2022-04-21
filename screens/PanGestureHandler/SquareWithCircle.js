import {View, StyleSheet} from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";

const SIZE = 100;
const CIRCLE_RADIUS = 150;

const SquareWithCircle = () => {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
        onEnd: (event) => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

            if (distance < CIRCLE_RADIUS + SIZE /2 ) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }

        },
    })

    const rStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value,
            }, {
                translateY: translateY.value,
            }]
        }
    })

    return <GestureHandlerRootView style={styles.container}>
        <View style={styles.circle}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={[styles.square, rStyles]}/>
            </PanGestureHandler>
        </View>
    </GestureHandlerRootView>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: "rgba(0, 0, 256, 0.5)",
        borderRadius: SIZE / 4,
        zIndex: 10
    },
    circle: {
        justifyContent: "center",
        alignItems: 'center',
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 4,
        borderColor: "rgba(0, 0, 256, 0.5)",
    }
})

export default SquareWithCircle;
