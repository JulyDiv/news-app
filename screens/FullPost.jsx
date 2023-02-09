import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";

const PostView = styled.View`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostImage = styled.Image`
  margin-bottom: 20px;
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const PostDate = styled.Text`
  margin-top: 2px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

export const FullPost = ({ route, navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { id, title } = route.params;

  const fetchPosts = () => {
    setIsLoading(true);
    navigation.setOptions({
      title,
    })
    axios
      .get(`https://63e3933fc919fe386c09ab87.mockapi.io/posts/` + id)
      .then(({ data }) => {
        setData(data);
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

  console.log(data);

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
          <PostView>
            <PostImage
              source={{
                uri: data.imageUrl
              }}
            />
            <PostTitle>{data.title}</PostTitle>
            <PostDate>{data.createdAt}</PostDate>
            <PostText>{data.text}</PostText>
          </PostView>
        </View>
      )}
    </>
  );
};
