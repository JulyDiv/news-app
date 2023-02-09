import styled from "styled-components/native";

const PostView = styled.View`
  flex-direction: row;
  //margin-top: 20px;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

const PostImage = styled.Image`
  margin-right: 12px;
  width: 100px;
  height: 100px;
  border-radius: 12px;
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

const editTitle = (str) => {
  if (str.length >= 50) {
    return str.substring(0, 50) + '...';
  }

  return str;
}

export const Post = ({ title, date, img }) => {
    return (
      <PostView>
        <PostImage source={{ uri: img }} />
        <PostDetails>
          <PostTitle>{editTitle(title)}</PostTitle>
          <PostDate>{new Date(date).toLocaleDateString()}</PostDate>
        </PostDetails>
      </PostView>
    );
}