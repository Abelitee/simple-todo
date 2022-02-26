import { StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons as Icon } from "@expo/vector-icons";
import { Text, View } from "./Themed";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface GoalNode {
  data: {
    title: string;
    type?: any;
    color: string;
    tasks: Array<{}>;
  };
  action: () => void;
}
export default function GoalComp({ data, action }: GoalNode) {
  const taskLen = data.tasks.length;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.listCase, { backgroundColor: data.color }]}
      onPress={action}
    >
      <View style={styles.iconCase}>
        <Icon name={data.type} color={"white"} size={wp(6)} />
      </View>

      <Text style={styles.listTitle} numberOfLines={1}>
        {data.title}
      </Text>
      <Text style={styles.listSub}>
        {taskLen} {taskLen < 2 ? "task" : "tasks"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listCase: {
    width: wp(43),
    height: wp(43),
    marginBottom: wp(3),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  iconCase: {
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: wp(2),
    borderRadius: 5,
  },
  listTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginVertical: wp(4),
    color: "white",
    textTransform: "capitalize",
  },
  listSub: {
    fontSize: wp(4.3),
    color: "white",
  },
});
