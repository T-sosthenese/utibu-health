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
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const height = (width * 100) / 100;
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
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
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>

        <Feather name="mic" size={24} color="black" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.productName}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          ${route?.params?.listPrice}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          alignItems: "center",
          gap: 5,
        }}
      >
        <Ionicons name="location" size={24} color="black" />

        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          Free delivery within Nairobi CBD.
        </Text>
      </View>
      <Text style={{ color: "#008B8B", marginLeft: 10 }}>
        FREE delivery Tomorrow by 3 PM.
      </Text>
      <Text
        style={{ color: "#1E90FF", marginHorizontal: 10, fontWeight: "500" }}
      >
        IN Stock
      </Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
