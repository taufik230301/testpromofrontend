import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type PromoCardProps = {
  title: string;
  description: string;
  image: any;
  onPress?: () => void;
};

export default function PromoCard({
  title,
  description,
  image,
  onPress,
}: PromoCardProps) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = require("../../assets/images/icon1.png");
  const isImageValid = imgError || !image;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.7 }, // efek klik
      ]}
      onPress={onPress}
    >
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Image
            source={
              isImageValid
                ? fallbackImage
                : typeof image === "string"
                  ? { uri: image }
                  : image
            }
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
            onError={() => setImgError(true)}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "95%",
  },
  iconContainer: {
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 10,
    color: "#6B7280",
  },
});
