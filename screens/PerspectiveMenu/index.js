import {View, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {Feather} from '@expo/vector-icons';
import {useCallback} from "react";


const {width: SCREEN_SIZE} = Dimensions.get("window");

const PerspectiveMenu = () => {

    const translateX = useSharedValue(0);

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.x = translateX.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;
        },
        onEnd: () => {
            if (translateX.value <= SCREEN_SIZE / 3) {
                translateX.value = withTiming(0);
            } else {
                translateX.value = withTiming(SCREEN_SIZE / 2);
            }
        },
    });

    const rStyles = useAnimatedStyle(() => {

        const rotate = interpolate(translateX.value, [0, SCREEN_SIZE / 2], [0, 7], Extrapolate.CLAMP);

        return {
            transform: [
                {perspective: 100},
                {translateX: translateX.value},
                {rotateY: `-${rotate}deg`},
            ]
        }
    });

    const pressHandler = useCallback(() => {
        if (translateX.value > 0) {
            translateX.value = withTiming(0);
        } else {
            translateX.value = withTiming(SCREEN_SIZE / 2);
        }
    }, []);

    return <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureHandler}>
                <Animated.View style={[styles.menu, rStyles]}>
                    <Feather onPress={pressHandler} name="menu" size={50} color="black" style={{margin: 15}}/>
                </Animated.View>
            </PanGestureHandler>
        </View>
    </GestureHandlerRootView>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    menu: {
        flex: 1,
        backgroundColor: "white",

    }
})

export default PerspectiveMenu;
