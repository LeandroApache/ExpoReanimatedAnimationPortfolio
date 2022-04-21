import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native";
import Svg, {Circle} from "react-native-svg";
import Animated, {useAnimatedProps, useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";
import {useCallback, useEffect} from "react";
import {ReText} from "react-native-redash";

const BACKGROUND_COLOR = "#444B6F";
const BACKGROUND_STROKE_COLOR = "#303858";
const STROKE_COLOR = "#A6E1FA";

const {width, height} = Dimensions.get("window");

const CIRCLE_LENGTH = 1000; //2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgressBar = () => {

    const progress = useSharedValue(0);

    const progressText = useDerivedValue(() => {
        return `${Math.floor(progress.value * 100)}`;
    });

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
        }
    });

    const pressHandler = useCallback(()=>{
        progress.value = withTiming( progress.value > 0 ? 0 : 1, {duration: 2000});
    }, []);

    return <View style={styles.container}>
        <ReText style={styles.progressText} text={progressText}/>
        <Svg style={{position: "absolute"}}>
            <Circle cx={width / 2} cy={height / 2} r={R} stroke={BACKGROUND_STROKE_COLOR} strokeWidth={30}/>
            <AnimatedCircle cx={width / 2} cy={height / 2} r={R} stroke={STROKE_COLOR} strokeWidth={20}
                            strokeDasharray={CIRCLE_LENGTH} animatedProps={animatedProps} strokeLinecap={"round"}/>
        </Svg>
        <TouchableOpacity onPress={pressHandler} style={styles.button}>
            <Text style={styles.buttonText}>Run</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BACKGROUND_COLOR,
    },
    progressText: {
        marginTop: 40,
        fontWeight: '700',
        fontSize: 60,
        color: "white",
    },
    button: {
        position: 'absolute',
        bottom: 30,
        width: width * 0.7,
        height: 60,
        backgroundColor: BACKGROUND_STROKE_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    buttonText: {
        fontSize: 40,
        color: 'rgba(256,256,256, 0.7)',
        letterSpacing: 4
    }
})

export default CircleProgressBar;
