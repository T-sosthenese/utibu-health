import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons"; // Import FontAwesome icons

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Center items vertically
    justifyContent: "center", // Center items horizontally
    paddingTop: 35, // Add some space from the top
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10, // Add some spacing between icon and text
  },
});

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    // Check if any of the required fields are empty
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !street ||
      !zipcode ||
      !password
    ) {
      Alert.alert("Please fill in all required fields");
      return; // Prevent further execution if any required field is empty
    }
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      city: city,
      state: state,
      street: street,
      zipcode: zipcode,
      password: password,
    };

    fetch("http://10.0.2.2:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Alert.alert("You have registered successfully");
        // Reset form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCity("");
        setState("");
        setStreet("");
        setZipcode("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert("Registration error");
        console.log("Registration failed!", error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <View style={styles.logoContainer}>
        <FontAwesome name="heartbeat" size={50} color="red" />
        <Text style={styles.logoText}>Utibu Health</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 20,
              color: "#041E42",
            }}
          >
            Register your Account
          </Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="gray"
              />
              <TextInput
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                style={{
                  color: "gray",
                  marginVertical: 5,
                  width: 150,
                  fontSize: 18,
                }}
                placeholder="First name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="gray"
              />
              <TextInput
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                style={{
                  color: "gray",
                  marginVertical: 5,
                  width: 150,
                  fontSize: 18,
                }}
                placeholder="Last name"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 5,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
              placeholder="Email"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="phone"
              size={24}
              color="gray"
            />
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              style={{
                color: "gray",
                marginVertical: 5,
                width: 300,
                fontSize: phone ? 18 : 18,
              }}
              placeholder="Phone number"
            />
          </View>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="place"
                size={24}
                color="gray"
              />
              <TextInput
                value={city}
                onChangeText={(text) => setCity(text)}
                style={{
                  color: "gray",
                  marginVertical: 5,
                  width: 150,
                  fontSize: 18,
                }}
                placeholder="City"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="place"
                size={24}
                color="gray"
              />
              <TextInput
                value={state}
                onChangeText={(text) => setState(text)}
                style={{
                  color: "gray",
                  marginVertical: 5,
                  width: 150,
                  fontSize: 18,
                }}
                placeholder="State"
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="place"
                size={24}
                color="gray"
              />
              <TextInput
                value={street}
                onChangeText={(text) => setStreet(text)}
                style={{
                  color: "gray",
                  marginVertical: 5,
                  width: 150,
                  fontSize: 18,
                }}
                placeholder="Street"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="place"
                size={24}
                color="gray"
              />
              <TextInput
                value={zipcode}
                onChangeText={(text) => setZipcode(text)}
                style={{
                  color: "gray",
                  marginVertical: 5,
                  width: 150,
                  fontSize: 18,
                }}
                placeholder="Zipcode"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock1"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 5,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Password"
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></View>

        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            marginTop: 3,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
