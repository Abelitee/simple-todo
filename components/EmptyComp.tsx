import { Image, ImageSourcePropType, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface EmptyNode {
  title: string;
  image: ImageSourcePropType;
}

export default function EmptyComp({ title, image }: EmptyNode) {
  return (
    <View style={styles.emptyCase}>
      <Image source={image} resizeMode="cover" style={styles.emptyImg} />
      <Text style={styles.emptyTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCase: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp(30)
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
