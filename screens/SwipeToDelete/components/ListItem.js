import {View, Text, StyleSheet, Dimensions} from "react-native";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import {Ionicons} from '@expo/vector-icons';

const {width} = Dimensions.get("window");
const TRANSLATE_X_TRASH = -(width * 0.3);
const ITEM_HEIGHT = 70;

const ListItem = ({task, onDeleteTask}) => {
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(ITEM_HEIGHT);
    const marginBottom = useSharedValue(40);
    const containerOpacity = useSharedValue(1);

    const panGestureHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: (event) => {
            if (translateX.value < TRANSLATE_X_TRASH) {
                translateX.value = withTiming(-width);
                itemHeight.value = withTiming(0);
                marginBottom.value = withTiming(0);
                containerOpacity.value = withTiming(0, undefined, (isFinished)=>{
                    if (isFinished) {
                       runOnJS(onDeleteTask)(task);
                    }
                });
            } else {
                translateX.value = withTiming(0, {duration: 1000});
            }
        },
    });

    const rTaskStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translateX.value},
            ],
        }
    });
    const rContainerStyle = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            marginBottom: marginBottom.value,
            opacity: containerOpacity.value,
        }
    });

    const rIconStyle = useAnimatedStyle(() => {
        const opacity = translateX.value < TRANSLATE_X_TRASH ? 1 : 0;
        return {
            opacity,
        }
    });

    return <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={[styles.itemContainer, rContainerStyle]}>
                <Animated.View style={[styles.item, rTaskStyle]}>
                    <Text style={styles.text}>{task.topic}</Text>
                </Animated.View>
                <Animated.View style={[styles.iconContainer, rIconStyle]}>
                    <Ionicons name="trash-outline" size={40} color="tomato"/>
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    </GestureHandlerRootView>
};

const styles = StyleSheet.create({
    itemContainer: {
        width: "100%",
        // marginBottom: 40,
        alignItems: 'center',
        justifyContent: "center"
    },
    item: {
        width: "80%",
        height: 80,
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 15,
        paddingLeft: 20,
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        elevation: 10,
    },
    text: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    iconContainer: {
        height: ITEM_HEIGHT,
        width: ITEM_HEIGHT,
        position: "absolute",
        right: "10%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
})


export default ListItem;
