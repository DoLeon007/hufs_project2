import React from 'react';
import KakaoLogin from 'react-kakao-login';

const KakaoLoginButton = () => {
  const onSuccess = (response) => {
    console.log(response); // 로그인 성공 시 실행할 코드를 여기에 추가하세요.
  };

  const onFailure = (error) => {
    console.error(error); // 로그인 실패 시 실행할 코드를 여기에 추가하세요.
  };

  return (
    <div>
      <KakaoLogin
        token={a67e161caa24d8d4407b019b18131d65} // 카카오 앱의 클라이언트 ID를 여기에 입력하세요.
        onSuccess={onSuccess}
        onFailure={onFailure}
        getProfile={true} // 프로필 정보를 가져오려면 true로 설정하세요.
        style={{ width: '200px', height: '50px' }} // 버튼 스타일을 원하는 대로 설정하세요.
      >
        카카오 로그인
      </KakaoLogin>
    </div>
  );
};

export default KakaoLoginButton;
