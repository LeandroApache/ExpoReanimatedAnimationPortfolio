import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    withTiming
} from "react-native-reanimated";
import {StyleSheet} from "react-native";
import {Switch} from "react-native";
import {useState} from "react";

const COLORS = {
    dark: {
        background: "#1E1E1E",
        circle: "#252525",
        text: "#F8F8F8",
    },
    light: {
        background: "#F8F8F8",
        circle: "#FFF",
        text: "#1E1E1E",
    }
}

const TRACK_COLORS = {
    false: "#767577",
    true: "#81b0ff",
}

const CIRCLE_RADIUS = 150;

const ToggleScheme = () => {
    const [theme, setTheme] = useState("light");

    //should add dependencies
    const mode = useDerivedValue(()=>{
        return theme === "light" ? withTiming(0)  : withTiming(1);
    }, [theme]);

    const toggleSwitch = (toggled) => {
        setTheme(toggled ? "dark" : "light")
    }

    const rContainerStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(mode.value,
            [0, 1], [COLORS.light.background, COLORS.dark.background]);

        return {
            backgroundColor,
        }
    });
    const rCircleStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(mode.value,
            [0, 1], [COLORS.light.circle, COLORS.dark.circle]);

        return {
            backgroundColor,
        }
    });
    const rTextStyle = useAnimatedStyle(() => {

        const color = interpolateColor(mode.value,
            [0, 1], [COLORS.light.text, COLORS.dark.text]);

        return {
            color,
        }
    });

    return <Animated.View style={[styles.container, rContainerStyle]}>
        <Animated.Text style={[styles.text, rTextStyle]}>THEME</Animated.Text>
        <Animated.View style={[styles.circle, rCircleStyle]}>
            <Switch value={theme === "dark"} onValueChange={toggleSwitch} trackColor={TRACK_COLORS}
                    thumbColor="#81b0ff"/>
        </Animated.View>
    </Animated.View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    circle: {
        height: CIRCLE_RADIUS * 2,
        width: CIRCLE_RADIUS * 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: CIRCLE_RADIUS,
        elevation: 8
    },
    text: {
        fontSize: 65,
        fontWeight: "700",
        letterSpacing: 5
    }
})

export default ToggleScheme;
