import {View, Text, StyleSheet} from "react-native";
import {GestureHandlerRootView, TapGestureHandler} from "react-native-gesture-handler";
import Animated, {
    measure,
    runOnJS,
    useAnimatedGestureHandler, useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import {useCallback} from "react";

const RippledSquare = () => {

    const onTapHandler = useCallback(() => {
        console.log("Tap");
    }, []);

    const centerX = useSharedValue(0);
    const centerY = useSharedValue(0);
    const scale = useSharedValue(0);
    const width = useSharedValue(0);
    const height = useSharedValue(0);
    const rippleOpacity = useSharedValue(1);

    const aRef = useAnimatedRef();

    const tapGestureHandler = useAnimatedGestureHandler({
        onStart: (tapEvent) => {
            const layout = measure(aRef);
            console.log(layout);
            width.value = layout.width;
            height.value = layout.height;

            centerX.value = tapEvent.x;
            centerY.value = tapEvent.y;
            scale.value = 0;
            rippleOpacity.value = 1;
            scale.value = withTiming(1, {duration: 1000});
        },
        onActive: () => {
            runOnJS(onTapHandler)();
        },
        // we use onFinish instead of onEnd for correct work with long touch
        onFinish: () => {
            console.log("Finish")
            rippleOpacity.value = withTiming(0);
        },
    });

    const rStyle = useAnimatedStyle(() => {
        const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
        const translateX = centerX.value - circleRadius;
        const translateY = centerY.value - circleRadius;

        return {
            position: "absolute",
            top: 0,
            left: 0,
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            backgroundColor: "rgba(0,0,0, 0.2)",
            opacity: rippleOpacity.value,
            transform: [
                {translateX},
                {translateY},
                {scale: scale.value},
            ]
        }
    });

    return <View style={styles.container}>
        <GestureHandlerRootView style={{backgroundColor: "blue"}}>
            <TapGestureHandler style={{backgroundColor: "blue"}} onGestureEvent={tapGestureHandler}>
                <Animated.View ref={aRef} style={styles.ripple}>
                    <Text style={styles.text}>Tap</Text>
                    <Animated.View style={rStyle}/>
                </Animated.View>
            </TapGestureHandler>
        </GestureHandlerRootView>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ripple: {
        width: 200,
        height: 200,
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        elevation: 10,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
    },
    text: {
        fontSize: 60,
        color: "grey",
    }
});

export default RippledSquare;
