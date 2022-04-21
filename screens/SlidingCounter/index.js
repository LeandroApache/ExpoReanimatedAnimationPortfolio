import {View, StyleSheet} from "react-native";
import Counter from "./components/Counter";

const SlidingCounter = () => {
    return <View style={styles.container}>
        <Counter/>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    }
});

export default SlidingCounter;
