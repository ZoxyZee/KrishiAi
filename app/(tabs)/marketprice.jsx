import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Bell,
  User,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react-native";

const AgriMarketInterface = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("seeds");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const marketData = {
    seeds: [
      { name: "Wheat Seeds", price: 45, unit: "kg", trend: "up", change: 2.5 },
      { name: "Rice Seeds", price: 38, unit: "kg", trend: "down", change: -1.8 },
      { name: "Corn Seeds", price: 52, unit: "kg", trend: "up", change: 3.2 },
      { name: "Barley Seeds", price: 42, unit: "kg", trend: "stable", change: 0 },
    ],
    fertilizers: [
      { name: "NPK Fertilizer", price: 28, unit: "bag", trend: "up", change: 1.9 },
      { name: "Urea", price: 22, unit: "bag", trend: "down", change: -0.8 },
    ],
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp size={16} color="green" />;
      case "down":
        return <TrendingDown size={16} color="red" />;
      default:
        return <Minus size={16} color="gray" />;
    }
  };

  const formatPrice = (price) => {
    return price >= 1000 ? `₹${(price / 1000).toFixed(1)}k` : `₹${price}`;
  };

  const categories = [
    { id: "seeds", name: "Seeds", icon: "🌱" },
    { id: "fertilizers", name: "Fertilizers", icon: "🧪" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>AgriMarket</Text>
          <Text style={styles.headerSubtitle}>Live market prices for farmers</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Bell size={24} color="white" />
          <User size={24} color="white" />
        </View>
      </View>

      {/* Location and Time */}
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <MapPin size={16} color="black" />
          <Text style={styles.infoText}>Delhi Mandi</Text>
        </View>
        <View style={styles.infoRow}>
          <Calendar size={16} color="black" />
          <Text style={styles.infoText}>
            {currentTime.toLocaleDateString()} |{" "}
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryBtn,
              selectedCategory === cat.id && styles.categoryBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat.id && { color: "white" },
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Price List */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{selectedCategory} Prices</Text>
        {marketData[selectedCategory].map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                {formatPrice(item.price)} / {item.unit}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {getTrendIcon(item.trend)}
              <Text style={styles.itemChange}>
                {item.change > 0 ? "+" : ""}
                {item.change}%
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionBtn}>
          <DollarSign size={24} color="green" />
          <Text>Price Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Calendar size={24} color="blue" />
          <Text>Price History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AgriMarketInterface;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0fdf4", padding: 16 },
  header: {
    marginTop: 30,
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "white" },
  headerSubtitle: { fontSize: 12, color: "white" },
  infoBox: {
    backgroundColor: "white",
    marginTop: 25,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  infoText: { marginLeft: 6, fontSize: 14, color: "black" },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginRight: 8,
    borderRadius: 20,
  },
  categoryBtnActive: {
    backgroundColor: "#22c55e",
  },
  categoryIcon: { fontSize: 18 },
  categoryText: { marginLeft: 6, color: "black", fontWeight: "500" },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 14, color: "gray" },
  itemChange: { marginLeft: 6, fontSize: 14, fontWeight: "500" },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionBtn: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
  },
});
