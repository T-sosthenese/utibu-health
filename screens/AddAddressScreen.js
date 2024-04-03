import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { customerId, setCustomerId } = useContext(UserType);
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/addresses/${customerId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const addresses = await response.json();
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Refresh the addresses when the component comes to focus
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  console.log("addresses", addresses);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search utibu.org" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10",
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "column",
              gap: 5,
              marginVertical: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {addresses?.firstName} {addresses?.lastName}
              </Text>
              <Entypo name="location-pin" size={24} color="red" />
            </View>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              {addresses?.street}, {addresses?.city} - {addresses?.zipcode}
            </Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              {addresses?.state}
            </Text>
            <Text style={{ fontSize: 15, color: "#181818" }}>
              Phone number: {addresses?.phone}{" "}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#D0D0D0",
                }}
              >
                <Text>Edit</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#D0D0D0",
                }}
              >
                <Text>Remove</Text>
              </Pressable>

              <Pressable
                style={{
                  backgroundColor: "#F5F5F5",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 5,
                  borderWidth: 0.9,
                  borderColor: "#D0D0D0",
                }}
              >
                <Text>Set as default</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
