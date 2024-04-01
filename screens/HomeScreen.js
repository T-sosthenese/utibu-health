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
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import { useNavigation } from "@react-navigation/native";

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
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXEo_8-OYXBtwjvJnSjy8RyFogc6syhCJqaZXsNWwCg&s",
    "https://plantationpsychiatrist.com/wp-content/uploads/2022/07/Psychiatry-Depression-Medication-Image-pdf.jpg",
    "https://missouripoisoncenter.org/wp-content/uploads/2020/07/bigstock-Bottle-Of-Insulin-Injection-Wi-372110866-1-e1594229913193.jpg",
  ];

  const deals = [
    {
      id: "1",
      ProductName: "Lisinopril: A hypertensive medication",
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
      ProductName:
        "Amlodipine: An antihypertensive medication that has been proven to be effective",
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
      ProductName:
        "Metformin: A widely prescribed medication used to manage type 2 diabetes",
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
      ProductName:
        "Lamivudine: A nucleoside reverse transcriptase inhibitor (NRTI) commonly used in the treatment of HIV/AIDS.",
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
      ProductName: "Lisinopril: A hypertensive medication",
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
      ProductName:
        "Amlodipine: An antihypertensive medication that has been proven to be effective",
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
      ProductName:
        "Metformin: A widely prescribed medication used to manage type 2 diabetes",
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
      ProductName:
        "Lamivudine: A nucleoside reverse transcriptase inhibitor (NRTI) commonly used in the treatment of HIV/AIDS.",
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
  return (
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
            backgroundColor: "#AFEEEE",
          }}
        >
          <EvilIcons name="location" size={24} color="black" />
          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              Deliver to Sosthene - Nairobi, 00100
            </Text>
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
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
            <View
              key={index}
              style={{ width: "48%", marginVertical: 10, alignItems: "center" }}
            >
              <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
                {item?.ProductName}
              </Text>
              <Image
                style={{ width: "100%", height: 170, resizeMode: "contain" }}
                source={{ uri: item?.image }}
              />
              <View
                style={{
                  backgroundColor: "#E31837",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
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
                    width: 112,
                  }}
                >
                  ${item?.listPrice}
                </Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: "#FFC72C",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                  marginTop: 5,
                  width: 130,
                  borderRadius: 20,
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
                  Add to Cart
                </Text>
              </Pressable>
            </View>
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
                  ProductName: item.ProductName,
                  listPrice: item?.listPrice,
                  carouselImages: item.carouselImages,
                  categoryId: item.categoryId,
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
                {item?.ProductName}
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
              <Pressable
                style={{
                  backgroundColor: "#FFC72C",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                  marginTop: 5,
                  width: 130,
                  borderRadius: 20,
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
                  Add to Cart
                </Text>
              </Pressable>
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
