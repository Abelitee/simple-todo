import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { colorValues, iconValues } from "../static/modal";
import { RootStackScreenProps } from "../types";
import { storeGoal } from "../hooks/useStorage";

export default function ModalScreen({
  navigation,
}: RootStackScreenProps<"Modal">) {
  const colorScheme = useColorScheme();

  const color = Colors[colorScheme];

  const [text, setText] = useState("");
  const [listIcon, setListIcon] = useState<any>("list");
  const [listColor, setListColor] = useState("#518aff");

  function handleBack() {
    navigation.goBack();
  }

  async function createGoal() {
    await storeGoal({ title: text, type: listIcon, color: listColor });
    handleBack();
  }

  return (
    <ScrollView style={styles.container}>
      <Icon
        name="close-circle"
        size={wp(10)}
        color={"#b1bbd0"}
        style={styles.close}
        onPress={handleBack}
      />

      <View style={[styles.mainCase, { backgroundColor: color.background2 }]}>
        <View style={[styles.iconCase, { backgroundColor: listColor }]}>
          <Icon name={listIcon} size={wp(15)} color={"white"} />
        </View>
        <TextInput
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
          placeholder="List Name"
          style={[
            styles.title,
            { backgroundColor: color.background3, color: color.backgroundAlt },
          ]}
        />
      </View>

      <View style={[styles.subCase, { backgroundColor: color.background2 }]}>
        {iconValues.map((value, idx) => {
          return (
            <TouchableOpacity
              style={styles.iconType}
              onPress={() => {
                setListIcon(value.name);
              }}
              key={idx}
            >
              <Icon
                name={value.name}
                size={wp(6)}
                color={color.backgroundAlt}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.subCase, { backgroundColor: color.background2 }]}>
        {colorValues.map((value, idx) => {
          return (
            <TouchableOpacity
              style={[styles.colorPlate, { backgroundColor: value }]}
              key={idx}
              onPress={() => {
                setListColor(value);
              }}
            />
          );
        })}
      </View>

      <View>
        <TouchableOpacity
          style={[styles.btn, { opacity: text ? 1 : 0.7 }]}
          disabled={text ? false : true}
          onPress={createGoal}
        >
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  close: {
    alignSelf: "flex-end",
    marginBottom: wp(3),
  },
  mainCase: {
    borderRadius: 10,
    padding: wp(3),
  },
  iconCase: {
    padding: wp(3),
    borderRadius: wp(100),
    alignSelf: "center",
    marginVertical: wp(6),
    elevation: 1,
  },
  title: {
    fontSize: wp(5),
    textAlign: "center",
    backgroundColor: "#EDF1F7",
    borderRadius: 10,
    padding: wp(3),
    fontFamily: "proximaB",
  },
  subCase: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: wp(3),
    backgroundColor: "#F7F9FC",
    marginTop: wp(4),
  },
  iconType: {
    width: wp(12),
    height: wp(12),
    padding: wp(3),
    elevation: 1,
    opacity: 0.5,
  },
  colorPlate: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(100),
  },
  btn: {
    alignSelf: "center",
    paddingHorizontal: wp(6),
    paddingVertical: wp(3),
    marginTop: wp(15),
    borderRadius: 8,
    backgroundColor: "#518aff",
  },
  btnText: {
    fontSize: wp(5),
    color: "white",
    fontFamily: "proximaB",
  },
});
