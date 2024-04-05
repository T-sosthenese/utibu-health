import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { customerId, setCustomerId } = useContext(UserType);
  const [customer, setCustomer] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{ uri: "" }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/addresses/${customerId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const customerData = await response.json();
        setCustomer(customerData);
      } catch (error) {
        console.log("Error fetching customer data:", error);
      }
    };
    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
      console.log("Auth token cleared");
      navigation.replace("Login");
    } catch (error) {
      console.log("Error clearing auth token:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/orders/${customerId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const ordersData = await response.json();
        setOrders(ordersData.orders);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [customerId]);

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Welcome {customer.firstName} {customer.lastName}
        </Text>
        <Pressable
          style={[styles.button, { backgroundColor: "#E0E0E0" }]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 20 }}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length === 0 ? (
          <Text>No orders found</Text>
        ) : (
          orders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
              <Text style={styles.orderText}>Order ID: {order.orderId}</Text>
              <Text style={styles.orderText}>Product: {order.productName}</Text>
              <Text style={styles.orderText}>Quantity: {order.quantity}</Text>
              <Text style={styles.orderText}>Total: ${order.total}</Text>
            </View>
          ))
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      ></View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  orderContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});
