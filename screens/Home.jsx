import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Alert, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { Post } from "../components/Post";

export const HomeScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get("https://63e3933fc919fe386c09ab87.mockapi.io/posts")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", "Не удалось получить статьи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" style={{ marginBottom: 10 }} />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={{ paddingBottom: 80, height: "100%" }}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
            }
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
                <Post
                  title={item.title}
                  date={item.createdAt}
                  img={item.imageUrl}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </>
    // TouchableOpacity - видимый клик-тач
    // StatusBar - "челка" телефона
    // FlatList - скролл приложения (data - объект из массива, renderItem - рендер деструктурированного объекта из массива)
    // View -div
    // Text -p, h, span
    // ActivityIndicator - индикатор
    // RefreshControl - перезагрузка по свайпу (refreshing - что происходит при перезагрузке, onRefresh - что происходит после загрузки )
  )};