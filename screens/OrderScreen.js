// SuccessScreen.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Placed Successfully!</Text>
      <Text style={styles.message}>
        Your order has been placed successfully. You will receive a confirmation
        email shortly.
      </Text>
      <Button
        title="View all your orders now"
        onPress={() => navigation.navigate("Profile")} // Adjust the navigation route as per your app's structure
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
});

export default OrderScreen;
