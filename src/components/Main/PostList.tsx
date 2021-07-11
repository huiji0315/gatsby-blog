import React, { FunctionComponent, useMemo } from 'react';
import styled from '@emotion/styled';
import PostItem from 'components/Main/PostItem';
import { FluidObject } from 'gatsby-image';

export type PostType = {
  node: {
    id: string;
    frontmatter: {
      title: string;
      summary: string;
      date: string;
      categories: string[];
      thumbnail: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
};

interface PostListProps {
  selectedCategory: string;
  posts: PostType[];
}

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`;

const PostList: FunctionComponent<PostListProps> = function ({
  selectedCategory,
  posts,
}) {
  const postListData = useMemo(
    () =>
      posts.filter(({ node: { frontmatter: { categories } } }: PostType) =>
        selectedCategory !== 'All'
          ? categories.includes(selectedCategory)
          : true,
      ),
    [selectedCategory],
  );
  // 만약 선택된 카테고리가 존재하면서 All이 아닌 경우에는 해당 카테고리 값을 가진 포스트 아이템만 필터링하도록 했고, 그렇지 않은 경우에는 모든 포스트 아이템을 보여주도록 구현
  return (
    <PostListWrapper>
      {postListData.map(({ node: { id, frontmatter } }: PostType) => (
        <PostItem {...frontmatter} link="https://www.google.co.kr/" key={id} />
      ))}
    </PostListWrapper>
  );
};

export default PostList;