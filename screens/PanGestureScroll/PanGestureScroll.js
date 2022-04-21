import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
    cancelAnimation,
    useAnimatedGestureHandler,
    useDerivedValue,
    useSharedValue,
    withDecay
} from "react-native-reanimated";
import Page, {PAGE_SIZE} from "./components/Page";

const ITEMS = ["What`s", "up", "mobile", "devs?"];
const MAX_TRANSLATE_X = -PAGE_SIZE * (ITEMS.length - 1);

const PanGestureScroll = () => {
    const translateX = useSharedValue(0);
    //we used it for fix scroll to left and right outside of our pages
    const clampedTranslateX = useDerivedValue(() => {
        return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
    });

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.x = clampedTranslateX.value;
            cancelAnimation(translateX);
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.x;
        },
        onEnd: (event) => {
            //for smooth scroll
            translateX.value = withDecay({velocity: event.velocityX})
        },
    });

    return <GestureHandlerRootView style={{flex: 1}}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
            <Animated.View style={{flex: 1, flexDirection: 'row'}}>
                {ITEMS.map((item, index) => {
                    return <Page key={index} text={item} index={index} translateX={clampedTranslateX}/>
                })}
            </Animated.View>
        </PanGestureHandler>
    </GestureHandlerRootView>
}

export default PanGestureScroll;
