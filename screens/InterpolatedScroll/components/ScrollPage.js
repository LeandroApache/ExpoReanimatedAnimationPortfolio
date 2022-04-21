import {Dimensions, View} from "react-native";
import {StyleSheet} from "react-native";
import Animated, {Extrapolate, interpolate, interpolateColor, useAnimatedStyle} from "react-native-reanimated";

const {width, height} = Dimensions.get("window");
const SIZE = width * 0.6;

const ScrollPage = ({index, title, translateX}) => {

    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const pageBackgroundOutputRange = ["#DA291C", "#A50044", "#00529F", "#6A7AB5", "#000000"];
    const squareBackgroundOutputRange = ["#FBE122", "#004D98", "#FFFFFF", "#034694", "#FFFFFF"];
    const textColorOutputRange = ["#000000", "#EDBB00", "#FEBE10", "#D1D3D4", "#FFCD00"];

    const reanimatedPageStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(translateX.value,
            [0, width, width * 2, width * 3, width * 4],
            pageBackgroundOutputRange
        );
        return {
            backgroundColor
        }
    })

    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP);
        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2, 0],
            Extrapolate.CLAMP);
        const backgroundColor = interpolateColor(translateX.value,
            [0, width, width * 2, width * 3, width * 4],
            squareBackgroundOutputRange
        );
        return {
            transform: [{scale}],
            borderRadius,
            backgroundColor
        }
    })

    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(translateX.value,
            inputRange,
            [300, 0, -300]);
        const opacity = interpolate(translateX.value,
            inputRange,
            [-1, 1, -1]);
        const color = interpolateColor(translateX.value,
            [0, width, width * 2, width * 3, width * 4],
            textColorOutputRange
        );
        return {
            transform: [{translateY}],
            opacity,
            color
        }
    })

    return <Animated.View style={[styles.page, reanimatedPageStyle]}>
        <Animated.View style={[styles.square, rStyle]}>
            <Animated.Text style={[styles.text, rTextStyle]}>{title}</Animated.Text>
        </Animated.View>
    </Animated.View>
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height,
        width,
    },
    square: {
        justifyContent: "center",
        alignItems: 'center',
        height: SIZE,
        width: SIZE,
    },
    text: {
        fontWeight: "700",
        fontSize: 35,
        textAlign: "center"
    }
})

export default ScrollPage;
