import PromoCard from "@/components/card/PromoCard";
import PromoDetailModal from "@/components/modal/PromoDetailModal";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const SPACING = 0.1;

export default function SpecialPromoCarousel() {
  const flatListRef = useRef<FlatList>(null);
  const [selectedPromo, setSelectedPromo] = useState<any>(null);
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch("http://10.187.87.76:5129/api/promos"); // replace dengan local ip komputer
        if (!response.ok) throw new Error("Failed to fetch promos");
        const data = await response.json();
        setPromos(data); // pastikan API return array
      } catch (error: any) {
        console.error(error);
        Alert.alert("Error", error.message || "Gagal mengambil promo");
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Special Promo</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={promos}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH, marginRight: SPACING }}>
            <PromoCard {...item} onPress={() => setSelectedPromo(item)} />
          </View>
        )}
      />

      <PromoDetailModal
        visible={!!selectedPromo}
        promo={selectedPromo}
        onClose={() => setSelectedPromo(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    width: CARD_WIDTH,
    marginRight: SPACING,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 140,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDesc: {
    marginTop: 6,
    color: "gray",
  },
  button: {
    marginTop: 12,
    backgroundColor: "black",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
});
