import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

type CategoryItemProps = {
  active: boolean;
};

type GatsbyLinkProps = {
  children: ReactNode;
  className?: string;
  to: string;
} & CategoryItemProps;
// 원래는 GatsbyLinkProps에 active 속성도 존재하지만 중복되는 문제도 있고, CategoryItem 컴포넌트에서는 그 외의 Props는 사용하지 않기 때문에 분리하였다.
// -> & 연산자를 통해 Intersection 타입을 정의하여 두 타입을 하나로 합쳐주었다.

export interface CategoryListProps {
  selectedCategory: string;
  categoryList: {
    // 프로퍼티 이름은 문자열, 프로퍼티 값은 숫자임을 나타내는 타입 표기 방법
    [key: string]: number;
  };
}
const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 100px auto 0;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;
  }
`; // 양 옆 20px씩 여백을 남겨두고 꽉 채우도록 반응형 디자인 구현

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryItem = styled(({ active, to, ...props }: GatsbyLinkProps) => (
  <Link to={to} {...props} />
))<CategoryItemProps>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? '800' : '400')};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const CategoryList: FunctionComponent<CategoryListProps> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          #{name}({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
