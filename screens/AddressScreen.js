import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import { decode as base64decode } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const { customerId, setCustomerId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) {
        // Split the token into header, payload, and signature
        const [, payload] = token.split(".");
        // Decode the Base64 payload
        const decodedPayload = JSON.parse(base64decode(payload));
        // Extract the customerId
        const customerId = decodedPayload.customerId;
        setCustomerId(customerId);
      }
    };
    fetchUser();
  }, []);

  console.log(customerId);

  const handleAddAddress = () => {
    const address = {
      firstName,
      lastName,
      phone,
      state,
      city,
      street,
      zipcode,
    };
    fetch("http://10.0.2.2:8000/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: customerId,
        address: address,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Address added successfully");
        setFirstName("");
        setLastName("");
        setPhone("");
        setState("");
        setCity("");
        setStreet("");
        setZipcode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Failed to add address");
        console.log("Error", error);
      });
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#00CED1" }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new address
        </Text>

        <TextInput
          placeholderTextColor={"black"}
          placeholder="Kenya"
          style={{
            padding: 10,
            backgroundColor: "white",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginVertical: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>First name</Text>

          <TextInput
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Enter your first name"
          />
        </View>

        <View style={{ marginVertical: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Last name</Text>

          <TextInput
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Enter your last name"
          />
        </View>

        <View style={{ marginVertical: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone number</Text>

          <TextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Enter your phone number"
          />
        </View>

        <View style={{ marginVertical: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>State</Text>

          <TextInput
            value={state}
            onChangeText={(text) => setState(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Enter your state"
          />
        </View>

        <View style={{ marginVertical: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>City</Text>

          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="City"
          />
        </View>

        <View style={{ marginVertical: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Street</Text>

          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Street"
          />
        </View>

        <View style={{ marginVertical: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Zipcode</Text>

          <TextInput
            value={zipcode}
            onChangeText={(text) => setZipcode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              backgroundColor: "white",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Zipcode"
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
            width: "100%",
            height: 40,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
