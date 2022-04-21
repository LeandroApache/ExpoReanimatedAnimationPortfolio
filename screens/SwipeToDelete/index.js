import {ScrollView, View, Text, StyleSheet} from "react-native";
import ListItem from "./components/ListItem";
import {useCallback, useState} from "react";

const TOPICS = [
    "JavaScript",
    "React",
    "React Native",
    "Node JS",
    "Redux",
    "MySQL",
    "MongoDB",
];

const TASKS = TOPICS.map((topic, index) => ({topic, index}));

const SwipeToDelete = () => {

    const [tasks, setTasks] = useState(TASKS);

    const deleteTaskHandler = useCallback((task) => {
        setTasks((tasks)=> tasks.filter(item=> item.index !== task.index))
    }, []);

    return <View style={styles.container}>
        <Text style={styles.title}>Tasks</Text>
        <ScrollView style={{flex: 1}}>
            {tasks.map(task => {
                return <ListItem key={task.index} task={task} onDeleteTask={deleteTaskHandler}/>
            })}
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 60,
        color: "white",
        textAlign: "center",
        marginBottom: 15,
    }
})

export default SwipeToDelete;
