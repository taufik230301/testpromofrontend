import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
type Promo = {
  id: string;
  title: string;
  description: string;
  expiry_date: string;
  voucher_code: string;
  terms: string[];
};

type Props = {
  visible: boolean;
  promo: Promo | null;
  onClose: () => void;
};

const handleCopy = async (code: string) => {
  await Clipboard.setStringAsync(code);
  Alert.alert("Berhasil", "Kode voucher berhasil disalin!");
};

export default function PromoDetailModal({ visible, promo, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={{ fontSize: 18 }}>✕</Text>
          </Pressable>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{promo?.title}</Text>

            <View style={styles.expiryRow}>
              <Feather name="clock" size={16} color="#9B6BCB" />
              <Text style={styles.subtitle}>
                Berlaku sampai {promo?.expiry_date}
              </Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Syarat dan Ketentuan</Text>

            {promo && promo.terms && promo.terms.length > 0 ? (
              promo.terms.map((term, index) => (
                <Text key={index} style={styles.item}>
                  {index + 1}. {term}
                </Text>
              ))
            ) : (
              <Text style={styles.item}>Tidak ada syarat dan ketentuan</Text>
            )}

            <View style={styles.voucherBox}>
              <View style={{ flex: 1 }}>
                <Text style={styles.voucherLabel}>Voucher code</Text>
                <Text style={styles.voucherCode}>{promo?.voucher_code}</Text>
              </View>

              <Pressable
                style={styles.copyButton}
                onPress={() => promo && handleCopy(promo.voucher_code)}
              >
                <Text style={styles.copyText}>Copy Voucher</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  voucherRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  expiryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    width: "85%",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  item: {
    fontSize: 14,
    marginBottom: 6,
  },
  voucherBox: {
    marginTop: 24,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  voucherLabel: {
    fontSize: 14,
    color: "#6B7280",
  },

  voucherCode: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  copyButton: {
    backgroundColor: "#9B6BCB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },

  copyText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
