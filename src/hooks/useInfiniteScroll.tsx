import { MutableRefObject, useState, useEffect, useRef, useMemo } from 'react';
import { PostType } from 'components/Main/PostList';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  postList: PostType[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = function (
  selectedCategory: string,
  posts: PostType[],
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(
    null,
  );
  // 인피니티 스크롤 방식은 특정 요소가 화면에 보일 경우, 다음 데이터를 로드하는 방식
  // -> 따라서 화면에 보이는지 체크하기 위한 특정 요소를 선택하기 위해, 상위 요소인 PostListWrapper를 연결해야한다.
  // Div 요소인 PostListWrapper 컴포넌트를 연결하기 위해 useRef Hook에 HTMLDivElement라는 타입을 제네릭으로 정의

  const [count, setCount] = useState<number>(1);
  // 포스트 목록 단위 변수 정의

  const postListByCategory = useMemo<PostType[]>(
    () =>
      posts.filter(({ node: { frontmatter: { categories } } }: PostType) =>
        selectedCategory !== 'All'
          ? categories.includes(selectedCategory)
          : true,
      ),
    [selectedCategory],
  );

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) return;

      setCount(value => value + 1);
      observer.disconnect();
    },
  );
  // 단 하나의 요소만 관측할 것이기 때문에, 관측 요소 배열 파라미터에 해당하는 entries 인자에는 하나의 데이터만 존재
  // 배열 내의 데이터에는 isIntersecting이라는 프로퍼티를 통해 화면에 노출되었는지를 확인할 수 있다.
  // -> 해당 프로퍼티를 통해 화면에 노출된 경우에는 count 값에 1을 더해주어 10개의 데이터가 추가적으로 출력되도록 할 것이고, 그 즉시 해당 요소의 관측을 중단하도록 구현

  useEffect(() => setCount(1), [selectedCategory]);
  // 선택된 카테고리가 변경된 경우에는 count 값을 1로 변경

  useEffect(() => {
    if (
      NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
      containerRef.current === null ||
      containerRef.current.children.length === 0
    )
      return;

    observer.observe(
      containerRef.current.children[containerRef.current.children.length - 1],
    );
  }, [count, selectedCategory]);
  // count 값과 선택된 카테고리가 값이 변경될 때마다 관측 요소를 변경
  // ref로 요소에 제대로 연결되어있는지와 더 불러올 데이터가 있는지 확인한 후, 조건을 충족하면 선택한 요소의 맨 마지막 자식 노드를 관측

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
// 카테고리 별로 아이템을 필터링해줌과 동시에 인피니티 스크롤 기능까지 제공하는 useInfiniteScroll 커스텀 훅을 구현
