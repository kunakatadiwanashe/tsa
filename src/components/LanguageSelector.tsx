import React, { useRef } from "react";
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    GestureResponderEvent,
    TouchableOpacity,
    View,
} from "react-native";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "sn", label: "Shona" },
  { code: "nd", label: "Ndebele" },
];

const getFlag = (code: string) => {
  switch (code) {
    case "en":
      return require("../../assets/images/zi.png");
    case "sn":
      return require("../../assets/images/zi.png");
    case "nd":
      return require("../../assets/images/zi.png");
    default:
      return require("../../assets/images/zi.png");
  }
};

interface LanguageSelectorProps {
  lang: string;
  setLang: (lang: any) => void;
}

export default function LanguageSelector({ lang, setLang }: LanguageSelectorProps) {
  return (
    <View style={styles.container}>
      {LANGUAGES.map((item) => (
        <LanguageItem
          key={item.code}
          item={item}
          selected={lang === item.code}
          onPress={() => setLang(item.code)}
        />
      ))}
    </View>
  );
}

interface LanguageItemProps {
  item: { code: string; label: string };
  selected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

function LanguageItem({ item, selected, onPress }: LanguageItemProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.item, selected && styles.selectedItem]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Image source={getFlag(item.code)} style={styles.flag} />

        <Text style={[styles.label, selected && styles.selectedLabel]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 14,
    backgroundColor: "#f5f5f5",
  },

  selectedItem: {
    backgroundColor: "#cb2929",
  },

  flag: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },

  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },

  selectedLabel: {
    color: "#fff",
    fontWeight: "600",
  },
});