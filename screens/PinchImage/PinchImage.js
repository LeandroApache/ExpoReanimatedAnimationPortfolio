import {Dimensions, Image, StyleSheet, View} from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue, withTiming,
} from "react-native-reanimated";
import {GestureHandlerRootView, PinchGestureHandler} from "react-native-gesture-handler";

const {height, width} = Dimensions.get("window");

const imageUri = 'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'

const AnimatedImage = Animated.createAnimatedComponent(Image);

const PinchImage = () => {

    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchGestureHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            scale.value = event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        },
        onEnd: (event) => {
            scale.value = withTiming(1);
        }
    })

    const rImageStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: focalX.value},
                {translateY: focalY.value},
                {translateX: -width / 2},
                {translateY: -height / 2},
                {scale: scale.value},
                {translateX: -focalX.value},
                {translateY: -focalY.value},
                {translateX: width / 2},
                {translateY: height / 2},
            ]
        }
    })

    const rFocalPointStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: focalX.value},
                {translateY: focalY.value},
            ]
        }
    })

    return <GestureHandlerRootView style={{flex: 1}}>
        <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
            <Animated.View style={{flex: 1}}>
                <AnimatedImage style={[{flex: 1}, rImageStyle]} source={{uri: imageUri}}/>
                {/*<Animated.View style={[styles.focalPoint, rFocalPointStyle]}/>*/}
            </Animated.View>
        </PinchGestureHandler>
    </GestureHandlerRootView>
}

// const styles = StyleSheet.create({
//     focalPoint: {
//         ...StyleSheet.absoluteFillObject,
//         width: 20,
//         height: 20,
//         backgroundColor: "blue",
//         borderRadius: 10
//     }
// })

export default PinchImage;
