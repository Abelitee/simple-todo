import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { Ionicons as Icon } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { useEffect, useState } from "react";

interface listNode {
  data?: {
    title: string;
    completed: boolean;
  };
  action?: (text: string) => void;
  deleteAction?: (data?: object) => void;
  updateAction?: (data?: object, nextData?: object) => void;
}

export default function ListComp({
  data,
  action,
  deleteAction,
  updateAction,
}: listNode) {
  const colorScheme = useColorScheme();

  const color = Colors[colorScheme];

  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (data) {
      setText(data.title);
      setCompleted?.(data.completed);
    }
  }, [data]);

  function handleCheck() {
    setCompleted(!completed);
    data && updateAction?.(data, { title: text, completed: !completed });
  }

  return (
    <View style={styles.itemCase}>
      <TouchableOpacity style={styles.iconCase} onPress={handleCheck}>
        <Icon
          name={completed ? "checkmark-circle" : "ellipse-outline"}
          size={wp(6)}
          color={completed ? "#20b1b2" : color.text}
        />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <TextInput
          value={text}
          onChangeText={(text) => {
            setText(text);
            data && updateAction?.(data, { title: text, completed });
          }}
          blurOnSubmit={false}
          onEndEditing={() => {
            action?.(text);
          }}
          onBlur={() => {
            action?.(text);
          }}
          style={[styles.item, { color: color.text }]}
          multiline={true}
        />
      </View>

      <TouchableOpacity
        style={styles.binCase}
        onPress={() => {
          deleteAction?.(data);
        }}
      >
        <Icon name="trash" size={wp(5.5)} color={color.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
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
    backgroundColor: "#f2f2ff",
    padding: wp(2),
    borderRadius: 5,
  },
  itemCase: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: wp(4),
    borderColor: "rgba(113,135,156,0.2)",
  },
  item: {
    fontSize: wp(4.8),
    maxWidth: wp(68),
    fontFamily: "noyh",
  },
  iconCase: {
    paddingHorizontal: wp(3),
  },
  binCase: {
    padding: wp(2.5),
    borderRadius: 10,
    backgroundColor: "rgba(113,135,156,0.1)",
    marginLeft: wp(3),
  },
  base: {
    position: "absolute",
    bottom: wp(8),
    left: wp(5),
  },
  addCase: {
    flexDirection: "row",
    alignItems: "center",
  },
  addItem: {
    fontSize: wp(5),
    marginLeft: wp(2),
    fontFamily: "proximaB",
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
