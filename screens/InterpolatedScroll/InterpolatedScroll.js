import {StyleSheet} from "react-native";
import Animated, {useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import ScrollPage from "./components/ScrollPage";

const CLUBS = [
    {
        name: "Manchester United",
        colors: {
            primary: "#DA291C",
            secondary: "#FBE122",
            additional: "#000000"
        }
    },
    {
        name: "Barcelona",
        colors: {
            primary: "#A50044",
            secondary: "#004D98",
            additional: "#EDBB00"
        }
    },
    {
        name: "Real Madrid",
        colors: {
            primary: "#FFFFFF",
            secondary: "#00529F",
            additional: "#FEBE10"
        }
    },
    {
        name: "Chelsea",
        colors: {
            primary: "#6A7AB5",
            secondary: "#034694",
            additional: "#D1D3D4"
        }
    },
    {
        name: "Juventus",
        colors: {
            primary: "#000000",
            secondary: "#FFFFFF",
            additional: "#FFCD00"
        }
    },
]

const InterpolatedScroll = () => {

    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        console.log(event.contentOffset.x);
        translateX.value = event.contentOffset.x;
    })

    return <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16} pagingEnabled horizontal style={styles.container}>
        {CLUBS.map((team, index) => {
            const {name} = team;
            return <ScrollPage key={index} title={name} index={index} translateX={translateX}/>
        })}
    </Animated.ScrollView>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    }
})

export default InterpolatedScroll;
