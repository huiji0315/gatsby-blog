import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

// 자신이 원하는 프로필 이미지 링크로 설정해주세요.
const PROFILE_IMAGE_LINK =
  'https://avatars.githubusercontent.com/u/41608951?v=4';

  const ProfileImageWrapper = styled.img`
    width: 120px;
    height: 120px;
    margin-bottom: 30px;
    border-radius: 50%;
  
    @media (max-width: 768px) {
      width: 80px;
      height: 80px;
    }
  `; // 반응형 디자인 -> 브라우저 가로 사이즈가 태블릿 기준 너비인 768px 이하인 경우에는 80px로 크기 줄여주기

const ProfileImage: FunctionComponent = function () {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />;
};

export default ProfileImage;
