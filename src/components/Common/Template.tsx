import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from 'components/Common/GlobalStyle';
import Footer from 'components/Common/Footer';

interface TemplateProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Template: FunctionComponent<TemplateProps> = function ({ children }) {
  return (
    <Container>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};
// 메인 페이지 컴포넌트 내에서 사용되는 컴포넌트들 중, 게시글 페이지 컴포넌트에도 동일하게 들어가는 것 = Container, GlobalStyle, Footer 컴포넌트
export default Template;
