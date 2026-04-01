import { Spacing } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Hymn, Language } from "../../data/types";
import { Pressable } from "react-native";
import { router } from "expo-router";

interface Props {
  hymn: Hymn;
  lang: Language;
}

export function HymnCard({ hymn, lang }: Props) {
  const data = hymn[lang];

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/hymn/${hymn.id}?lang=${lang}`)}
    >
      <View style={styles.header}>
        <Text style={styles.number}>{hymn.id}</Text>
        <View>
          <Text style={styles.title} numberOfLines={2}>
            {data.title}
          </Text>
          <Text style={styles.category}>{hymn.category}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: Spacing.three,
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 5,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  number: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a33d3d",
    width: 28,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    flexShrink: 1,
    flex: 1,
  },
  category: {
    marginTop: Spacing.one,
    fontSize: 12,
    color: "#a33d3d",
  },
});
