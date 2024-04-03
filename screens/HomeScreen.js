import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import { decode as base64decode } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnjJ9x5jMHp2sbmeIYuttCY7fwYO24gMgIYA&s",
      name: "Painkillers",
    },
    {
      id: "1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aAwNUrJky_0cEfflGA9XQAAF2jk2uq2J_g&s",
      name: "Antibiotics",
    },
    {
      id: "3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPprNAUENf3YZv-o5U3M7WpXvsXxcfQsdEQ&s",
      name: "Antidepressants",
    },
    {
      id: "4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZlZU6Agle35nB5uXKPHiLWoNn3Lgi6phrw&s",
      name: "Antihypertensives",
    },
    {
      id: "5",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXcotm2djhvRT2l8J5Oj4hRckaxoykPFtiQ&s",
      name: "ARVs",
    },
    {
      id: "6",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7mhWU9eFatlupQHbcRHhf8cOLuk3NcaQgUQ&s",
      name: "Diabetes",
    },
  ];

  const images = [
    "https://missouripoisoncenter.org/wp-content/uploads/2020/07/bigstock-Bottle-Of-Insulin-Injection-Wi-372110866-1-e1594229913193.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXEo_8-OYXBtwjvJnSjy8RyFogc6syhCJqaZXsNWwCg&s",
    "https://plantationpsychiatrist.com/wp-content/uploads/2022/07/Psychiatry-Depression-Medication-Image-pdf.jpg",
  ];

  const deals = [
    {
      id: "1",
      productName: "Lisinopril",
      listPrice: 25.13,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9LiKwF_mFL1yZ01p9E2pzDymtLioDqKhh5A&s",
      carouselImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkzCCE6yQYXIMsXzBkgf01kG1-zwhHhocFjQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_77pTztbcFMY5lWTi4aTVA8acATJqBHG1Ng&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw77uYKOeEyEk9-eiapIIcvqwmF6fJjQ-xNA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-7aJm5MVV4IPUHFQKljIlORJlknQDrZwtQ&s",
      ],
      categoryId: 1,
    },
    {
      id: "2",
      productName: "Amlodipine",
      listPrice: 65.12,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTaNSKl0xxq40k7VLrB0bSv06PhwsXgeo3uQ&s",
      carouselImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYeBtj0-GyVGyC3l2srX-nIR3cNKUUOj8ugg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCXZFyJB8zl-aae1wu3roW_D_xfho8b0O5bg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCESeUj3ShSb_m5edqI1SEU5QjVKZBP209hg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbusz1IkAu82fQ-2FQ6VklponIx-dltWvaUQ&s",
      ],
      categoryId: 2,
    },
    {
      id: "3",
      productName: "Metformin",
      listPrice: 74.03,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7CK3GLiBtQnqS49KtBosV5KMQeKsHWJnaQg&s",
      carouselImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHlBsUt23hwrbsabiYsmIk54jRfKOCyNNug&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7CK3GLiBtQnqS49KtBosV5KMQeKsHWJnaQg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvQhyQUrYyhKTn9xmuKuGqSsLfOUpzMWG-Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKI7-ECmS4ICjzarigPtr4qmcBFMvPANT9kw&s",
      ],
      categoryId: 3,
    },
    {
      id: "4",
      productName: "Lamivudine",
      listPrice: 44.01,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxvTWwk2TmzaD78cu3aqRtVnjaJ0MFyAfx6w&s",
      carouselImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs9bbORKWNjRNx0yRdVFLkay9ldgpR__2nw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtCNuVOBTb8Y-sRJDr_0y4tT-JjvYV-esizQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVNfCTSuuRq0_qL47z0JK4qff1cT-proc5w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3NfY90hrvF-Vo2roZJQYsnu-rKNQglt_fQw&s",
      ],
      categoryId: 4,
    },
  ];

  const offers = [
    {
      id: "1",
      productName: "Lisinopril",
      listPrice: 25.13,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw77uYKOeEyEk9-eiapIIcvqwmF6fJjQ-xNA&s",
      carouselImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkzCCE6yQYXIMsXzBkgf01kG1-zwhHhocFjQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_77pTztbcFMY5lWTi4aTVA8acATJqBHG1Ng&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw77uYKOeEyEk9-eiapIIcvqwmF6fJjQ-xNA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-7aJm5MVV4IPUHFQKljIlORJlknQDrZwtQ&s",
      ],
      categoryId: 1,
    },
    {
      id: "2",
      productName: "Amlodipine",
      listPrice: 65.12,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCESeUj3ShSb_m5edqI1SEU5QjVKZBP209hg&s",
      carouselImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYeBtj0-GyVGyC3l2srX-nIR3cNKUUOj8ugg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCXZFyJB8zl-aae1wu3roW_D_xfho8b0O5bg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCESeUj3ShSb_m5edqI1SEU5QjVKZBP209hg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbusz1IkAu82fQ-2FQ6VklponIx-dltWvaUQ&s",
      ],
      categoryId: 2,
    },
    {
      id: "3",
      productName: "Metformin",
      listPrice: 74.03,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvQhyQUrYyhKTn9xmuKuGqSsLfOUpzMWG-Q&s",
      carouselImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWHlBsUt23hwrbsabiYsmIk54jRfKOCyNNug&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7CK3GLiBtQnqS49KtBosV5KMQeKsHWJnaQg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvQhyQUrYyhKTn9xmuKuGqSsLfOUpzMWG-Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKI7-ECmS4ICjzarigPtr4qmcBFMvPANT9kw&s",
      ],
      categoryId: 3,
    },
    {
      id: "4",
      productName: "Lamivudine",
      listPrice: 44.01,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVNfCTSuuRq0_qL47z0JK4qff1cT-proc5w&s",
      carouselImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs9bbORKWNjRNx0yRdVFLkay9ldgpR__2nw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtCNuVOBTb8Y-sRJDr_0y4tT-JjvYV-esizQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsVNfCTSuuRq0_qL47z0JK4qff1cT-proc5w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3NfY90hrvF-Vo2roZJQYsnu-rKNQglt_fQw&s",
      ],
      categoryId: 4,
    },
  ];
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { customerId, setCustomerId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState("");
  console.log(selectedAddress);
  useEffect(() => {
    if (customerId) {
      fetchAddresses();
    }
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

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>
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
              <TextInput placeholder="Search medications" />
            </Pressable>
            <Feather name="mic" size={24} color="black" />
          </View>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Pressable
              onPress={() => setModalVisible(!modalVisible)} // Handle press on the entire section
              style={{ flex: 1 }} // Ensure the text takes up the remaining space
            >
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.firstName}{" "}
                  {selectedAddress?.lastName} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add an Address
                </Text>
              )}
            </Pressable>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{ margin: 10, justifyContent: "center" }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={"#12372F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending deals of the week
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 13,
              paddingVertical: 5,
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    productName: item.productName,
                    listPrice: item?.listPrice,
                    carouselImages: item.carouselImages,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ position: "relative" }}>
                  <Image
                    style={{ width: 180, height: 180, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      top: 10,
                      left: 10,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: 5,
                    }}
                  >
                    {item?.productName}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    productName: item.productName,
                    listPrice: item?.listPrice,
                    carouselImages: item.carouselImages,
                    categoryId: item.categoryId,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
                  {item?.productName}
                </Text>
                <Image
                  style={{ width: 150, height: 150, marginLeft: 10 }}
                  source={{ uri: item?.image }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
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
                    ${item?.listPrice}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackDropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery option to see product availability and delivery
              options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Already added addresses */}
            <Pressable
              onPress={() => setSelectedAddress(addresses)}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                marginRight: 15,
                marginTop: 10,
                backgroundColor:
                  selectedAddress === addresses ? "#FBCEB1" : "white",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {addresses?.firstName} {addresses?.lastName}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text
                numberOfLines={1}
                style={{ width: 130, fontSize: 13, textAlign: "left" }}
              >
                {addresses?.street}, {addresses?.city}
              </Text>
              <Text
                numberOfLines={1}
                style={{ width: 130, fontSize: 13, textAlign: "left" }}
              >
                {addresses?.state}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066B2",
                  fontWeight: "500",
                }}
              >
                Add an address or pickup point
              </Text>
            </Pressable>
          </ScrollView>
          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066B2" />
              <Text style={{ color: "#0066B2", fontWeight: "400" }}>
                Enter a Kenyan zipcode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066B2" />
              <Text style={{ color: "#0066B2", fontWeight: "400" }}>
                Use my current location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066B2" />
              <Text style={{ color: "#0066B2", fontWeight: "400" }}>
                EDeliver outside Kenya
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
