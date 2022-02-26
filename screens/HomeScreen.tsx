import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons as Icon } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import GoalComp from "../components/Goal";
import { useContext, useCallback, useState } from "react";
import { getGoals } from "../hooks/useStorage";
import { useFocusEffect } from "@react-navigation/native";
import EmptyComp from "../components/EmptyComp";

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<"Home">) {
  const [goals, setGoals] = useState([]);

  function handleList({ value }: { value: any }) {
    navigation.navigate("List", {
      title: value.title,
      type: value.type,
      itemColor: value.color,
      tasks: value.tasks,
    });
  }

  function createList() {
    navigation.navigate("Modal");
  }

  useFocusEffect(
    useCallback(() => {
      getGoals(setGoals);
    }, [])
  );

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title}>My Goals</Text>

        {goals.length < 1 ? (
          <EmptyComp
            title="Add a goal to get started"
            image={require("../assets/images/list.png")}
          />
        ) : (
          <View style={styles.list}>
            {goals.map((res, idx) => {
              return (
                <GoalComp
                  data={res}
                  action={() => {
                    handleList({ value: res });
                  }}
                  key={idx}
                />
              );
            })}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addBtn} onPress={createList}>
        <Icon name="add" color={"white"} size={wp(12)} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: wp(9),
    marginVertical: wp(7),
    fontFamily: "proximaB",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  addBtn: {
    width: wp(15),
    height: wp(15),
    paddingLeft: wp(1),
    borderRadius: wp(100),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#717ffe",
    position: "absolute",
    bottom: wp(8),
    right: wp(45),
  },
});
