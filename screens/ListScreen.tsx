import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons as Icon } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import EmptyComp from "../components/EmptyComp";
import ModalScreen from "./ModalScreen";
import ListComp from "../components/List";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeGoals, storeTask } from "../hooks/useStorage";

export default function ListScreen({
  navigation,
  route,
}: RootStackScreenProps<"List">) {
  const [newTask, setNewTask] = useState(false);

  const { title, type, itemColor, tasks } = route.params;

  const itemType: any = type;

  const [allTasks, setALlTasks] = useState(tasks);

  function taskAction(text: any) {
    if (!text) {
      return setNewTask(!newTask);
    }

    setALlTasks((current) => {
      const finalValue = [...current, { title: text, completed: false }];
      storeTask({ title, type, newTasks: finalValue });
      return finalValue;
    });
    setNewTask(false);
  }

  function deleteAction(value: any) {
    setALlTasks((current) => {
      let newArray = current.filter((item) => item !== value);
      storeTask({ title, type, newTasks: newArray });
      return newArray;
    });
  }

  function updateAction(data: any, nextData: any) {
    const current = allTasks;
    const objIndex = current.findIndex((obj) => obj == data);

    current[objIndex].title = nextData.title;
    current[objIndex].completed = nextData.completed;

    storeTask({ title, type, newTasks: current });
  }

  function handleTask() {
    setNewTask(!newTask);
  }

  async function handleDelete() {
    await removeGoals({ title, type });
    navigation.goBack();
  }

  return (
    <>
      <KeyboardAwareScrollView style={styles.container} scrollsToTop={false}>
        <View style={styles.titleCase}>
          <View style={styles.iconBox}>
            <Icon name={itemType} color={itemColor} size={wp(7)} />
          </View>
          <Text style={[styles.title, { color: itemColor }]} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {allTasks.length < 1 && !newTask ? (
          <EmptyComp
            title="Add a task to get started"
            image={require("../assets/images/checklist.png")}
          />
        ) : (
          <View>
            {allTasks.map((data, idx) => {
              return (
                <ListComp
                  data={data}
                  key={idx}
                  deleteAction={deleteAction}
                  updateAction={updateAction}
                />
              );
            })}
          </View>
        )}

        {newTask && (
          <View style={{ marginBottom: wp(4) }}>
            <ListComp action={taskAction} />
          </View>
        )}
      </KeyboardAwareScrollView>

      <View style={styles.base}>
        <TouchableOpacity style={styles.addCase} onPress={handleTask}>
          <Icon name="add-circle" size={wp(8)} color={itemColor} />
          <Text style={[styles.addItem, { color: itemColor }]}>New Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addCase} onPress={handleDelete}>
          <Icon name="trash" size={wp(6)} color={"#EB5757"} />
          <Text style={[styles.addItem]}>Delete Goal</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingBottom: wp(15),
  },
  titleCase: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp(6),
    marginBottom: wp(10),
  },
  title: {
    fontSize: wp(9),
    marginLeft: wp(2),
    fontFamily: "proximaB",
    textTransform: "capitalize",
  },
  iconBox: {
    backgroundColor: "rgba(113,135,156,0.1)",
    padding: wp(2),
    borderRadius: 5,
  },
  itemCase: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: wp(3),
    borderColor: "rgba(113,135,156,0.2)",
  },
  item: {
    fontSize: wp(4.8),
    maxWidth: wp(68),
  },
  iconCase: {
    padding: wp(2),
  },
  base: {
    position: "absolute",
    bottom: wp(8),
    left: wp(5),
    width: wp(90),
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addCase: {
    flexDirection: "row",
    alignItems: "center",
  },
  addItem: {
    fontSize: wp(5),
    marginLeft: wp(2),
    fontFamily: "proximaB",
    color: "#EB5757",
  },
  emptyCase: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImg: {
    width: wp(35),
    height: wp(35),
  },
  emptyTitle: {
    fontSize: wp(6),
    marginTop: wp(9),
  },
});
