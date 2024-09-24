import { Link } from "react-router-dom";

const Aaa = () => {
  return (
    <>
      <div>Aaa 페이지 입니다.</div>

      {/* 1. 리액트의 이동방식: 현재페이지에서 JS로 태그만 바꿔치기 => SPA */}
      <Link to="/bbb">Bbb 페이지로 가는 기능</Link>

      {/* 2. 고전HTML 이동방식: html페이지 새로접속함(느림) => MPA */}
      <a href="/bbb">Bbb 페이지 이동</a>
    </>
  );
};

export default Aaa;