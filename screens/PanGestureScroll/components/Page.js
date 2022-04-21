import Animated, {useAnimatedStyle} from "react-native-reanimated";
import {Dimensions, StyleSheet} from "react-native";
import {Text} from "react-native";

const {width: PAGE_SIZE} = Dimensions.get("window");

const Page = ({index, text, translateX}) => {

    const offset = PAGE_SIZE * index;

    const rStyle = useAnimatedStyle(()=>{
        return {
            transform: [
                {translateX: translateX.value + offset},
            ]
        }
    });

    return <Animated.View style={[{backgroundColor: `rgba(0,0,256,0.${index + 1})`}, styles.pageContainer, rStyle]}>
        <Text style={styles.text}>{text}</Text>
    </Animated.View>
}

const styles = StyleSheet.create({
    pageContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 50,
        color: "#FFF",
        fontWeight: "700",
        letterSpacing: 3,
        textTransform: "uppercase"
    }
})

export {PAGE_SIZE};

export default Page;
