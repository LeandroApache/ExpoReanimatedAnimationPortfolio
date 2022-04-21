import {GestureHandlerRootView, TapGestureHandler} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withTiming} from "react-native-reanimated";
import {Dimensions, Image, StyleSheet, ImageBackground} from "react-native";
import {useRef} from "react";

const {width: SIZE} = Dimensions.get("window");


const SingleDoubleTaps = () => {

    const scale = useSharedValue(0);
    const opacity = useSharedValue(1);

    const doubleTapRef = useRef();

    const rHeartStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: scale.value}
            ]
        }
    });

    const rCommentStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        }
    });

    return <GestureHandlerRootView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TapGestureHandler waitFor={doubleTapRef} onActivated={()=>{
            opacity.value = withTiming(0, undefined, (finished) => {
                if (finished) {
                    opacity.value = withDelay(500, withTiming(1));
                }
            })
            console.log("Single tap")
        }}>
            <TapGestureHandler numberOfTaps={2} maxDelayMs={250} ref={doubleTapRef} onActivated={() => {
                scale.value = withTiming(1, undefined, (finished) => {
                    if (finished) {
                        scale.value = withDelay(250, withTiming(0))
                    }
                });
                console.log(" Double tap")
            }}>
                <Animated.View>
                    <ImageBackground source={require("./assets/background.jpg")} style={styles.background}>
                        <Animated.Image source={require("./assets/heart.png")} style={[styles.heart, rHeartStyle]}/>
                    </ImageBackground>
                    <Animated.Text style={[styles.comment, rCommentStyle]}>Your comment</Animated.Text>
                </Animated.View>
            </TapGestureHandler>
        </TapGestureHandler>
    </GestureHandlerRootView>;
}

const styles = StyleSheet.create({
    background: {
        height: SIZE,
        width: SIZE,
        alignItems: "center",
        justifyContent: "center"
    },
    heart: {
        width: 120,
        height: 120,
    },
    comment: {
        fontWeight: "700",
        fontSize: 50,
        color: "rgba(99,99,218,0.3)",
        textAlign: "center",
        marginTop: 30,
    }
})

export default SingleDoubleTaps;
