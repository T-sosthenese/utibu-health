import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { UserType } from "../UserContext";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const [currentStep, setCurrentStep] = useState(0);
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
  const [selectedAddress, setSelectedAddress] = useState("");

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          {steps?.map((step, index) => (
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#CCC",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Select a delivery address
          </Text>

          <Pressable>
            <Pressable
              style={{
                borderWidth: 1,
                backgroundColor: "white",
                padding: 10,
                flexDirection: "row",
                gap: 5,
                paddingBottom: 17,
                marginVertical: 7,
                alignItems: "center",
                borderRadius: 6,
              }}
            >
              {selectedAddress ? (
                <FontAwesome5 name="dot-circle" size={24} color="black" />
              ) : (
                <Entypo
                  onPress={() => setSelectedAddress(addresses)}
                  name="circle"
                  size={24}
                  color="black"
                />
              )}

              <View style={{ marginLeft: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
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
                <View>
                  {selectedAddress && (
                    <Pressable
                      onPress={() => setCurrentStep(1)}
                      style={{
                        backgroundColor: "#008397",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Deliver to this address
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </Pressable>
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Choose your delivery options
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Entypo
              onPress={() => setSelectedAddress(addresses)}
              name="circle"
              size={24}
              color="black"
            />
            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Tomorrow by 5pm
              </Text>{" "}
              - FREE delivery with your Prime membership
            </Text>
          </View>

          <Pressable
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
