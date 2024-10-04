"use client";

import { useParams, useRouter } from "next/navigation";

// import styles from "../boards/styles.module.css";
// css를 어떻게 적용시켜줄지 모르겠음.

import Image from "next/image";
// import { Link } from "react-router-dom";
import Link from "next/link";

import React, { ChangeEvent, useState } from "react";

import { useMutation, gql } from "@apollo/client";

const CREATE_BOARD = gql`
  # 타입적는곳
  mutation createBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
  ) {
    #전달할 변수 적는곳
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
      }
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

const UPDATE_BOARD = gql`
  # 타입적는곳
  mutation updateBoard(
    $title: String
    $contents: String
    $password: String
    $boardId: ID!
  ) {
    # 전달할 변수 적는곳
    updateBoard(
      updateBoardInput: { title: $title, contents: $contents }
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardsWrite(props) {
  const router = useRouter();
  const params = useParams();

  // 작성자인풋, 작성자인풋에러
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  // 비번인풋, 비번인풋에러
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  // 제목인풋, 제목인풋에러
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  // 내용인풋, 내용인풋에러
  const [content, setContent] = React.useState("");
  const [contentError, setContentError] = React.useState("");

  // 상황에 따른 버튼 활성화 or 비활성화
  const [isActive, setIsActive] = useState(false);

  // 인풋값이 바뀐다면 저장하는 곳
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

    if (
      event.target.value !== "" &&
      password !== "" &&
      title !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (
      name !== "" &&
      event.target.value !== "" &&
      title !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (
      name !== "" &&
      password !== "" &&
      event.target.value !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    if (
      name !== "" &&
      password !== "" &&
      title !== "" &&
      event.target.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const [나의함수] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  //
  //
  //
  //
  //

  const onCLickUpdate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let isValid = true;

    // 작성자 확인
    if (name === "") {
      setNameError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setNameError("");
    }

    // 비밀번호 확인
    if (password === "") {
      setPasswordError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 제목 확인
    if (title === "") {
      setTitleError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setTitleError("");
    }

    // 내용 확인
    if (content === "") {
      setContentError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setContentError("");
    }

    try {
      if (isValid) {
        const result = await updateBoard({
          variables: {
            title: title, // 수정할 제목
            contents: content, // 수정할 내용
            password: password, // 비밀번호
            boardId: params.boardId, // 수정할 게시물의 ID
          },
        });
        console.log(result);
        alert("게시물 수정 완료됨");
        router.push(`/boards/${result.data.updateBoard._id}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  //
  //
  //
  //
  //

  const onClickSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("작성자 이름은:", name);
    console.log("작성자 비번은:", password);
    console.log("게시물 제목은:", title);
    console.log("게시물 내용은:", content);

    // 유효성을 우선 true로 박아두고 문제가 1개라도 생긴다면 즉시 false로 바뀌므로
    // 마지막에 alert로 알리는 것을 못함.

    let isValid = true;

    // 작성자 확인
    if (name === "") {
      setNameError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setNameError("");
    }

    // 비밀번호 확인
    if (password === "") {
      setPasswordError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 제목 확인
    if (title === "") {
      setTitleError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setTitleError("");
    }

    // 내용 확인
    if (content === "") {
      setContentError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setContentError("");
    }

    // 제출 전 모든 부분이 만족해서 true인지 확인하고 alert을 띄울지 정하는 곳

    try {
      if (isValid) {
        alert("게시물 등록 완료됨");

        const result = await 나의함수({
          variables: {
            writer: name,
            password: password,
            title: title,
            contents: content,
          },
        });
        console.log(result);
        router.push(`/boards/${result.data.createBoard._id}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <main className={props.styles.게시물등록섹션}>
        <Link href="/boards/detail">상세 페이지 이동</Link>
        {/* <button onClick={onClickSubmit}>그래프큐엘요청하는버튼</button> */}
        <section className={props.styles.게시물등록}>
          <h1>게시물 {props.isEdit ? "수정" : "등록"}</h1>
        </section>

        <form>
          <fieldset className={props.styles.이름과비번입력하는곳}>
            <legend>사용자 정보</legend>

            <div className={props.styles.반쪽인풋섹션}>
              <label className={props.styles.인풋이름}>
                작성자 <span className={props.styles.빨간별}>*</span>
              </label>
              <input
                className={props.styles.반쪽인풋}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                onChange={onChangeName}
              />
              <span id="작성자경고" className={props.styles.경고글}>
                {nameError}
              </span>
            </div>

            <div className={props.styles.반쪽인풋섹션}>
              <label className={props.styles.인풋이름}>
                비밀번호 <span className={props.styles.빨간별}>*</span>
              </label>
              <input
                className={props.styles.반쪽인풋}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={onChangePassword}
              />
              <span id="비밀번호경고" className={props.styles.경고글}>
                {passwordError}
              </span>
            </div>
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.제목입력하는곳}>
            <legend>게시물 제목</legend>
            <label className={props.styles.인풋이름}>
              제목 <span className={props.styles.빨간별}>*</span>
            </label>
            <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={onChangeTitle}
            />
            <span id="제목경고" className={props.styles.경고글}>
              {titleError}
            </span>
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.내용입력하는곳}>
            <legend>게시물 내용</legend>
            <label className={props.styles.인풋이름}>
              내용 <span className={props.styles.빨간별}>*</span>
            </label>
            <textarea
              className={props.styles.많이큰인풋}
              placeholder="내용을 입력해 주세요."
              onChange={onChangeContent}
            />
            <span id="내용경고" className={props.styles.경고글}>
              {contentError}
            </span>
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.주소입력하는곳}>
            <legend>주소 정보</legend>
            <label className={props.styles.인풋이름}>주소</label>
            <div className={props.styles.우편번호입력하는곳}>
              <input
                className={props.styles.우편번호인풋}
                type="text"
                placeholder="01234"
              />
              <button className={props.styles.우편버튼}>우편번호 검색</button>
            </div>

            <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="주소를 입력해 주세요."
            />
            <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="상세주소"
            />
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.링크입력하는곳}>
            <legend>유튜브 링크</legend>
            <label className={props.styles.인풋이름}>유튜브 링크</label>
            <input
              className={props.styles.풀인풋}
              type="text"
              placeholder="링크를 입력해 주세요."
            />
          </fieldset>

          <hr className={props.styles.실선} />

          <fieldset className={props.styles.사진첨부하는곳}>
            <legend>사진 첨부</legend>
            <div className={props.styles.업로드박스그룹}>
              <div className={props.styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={props.styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className={props.styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={props.styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className={props.styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={props.styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
            </div>
          </fieldset>

          <div className={props.styles.버튼있는곳}>
            <button className={props.styles.취소버튼}>취소</button>
            <button
              className={`${props.styles.등록하기버튼} ${
                isActive ? props.styles.active : ""
              }`}
              onClick={props.isEdit ? onCLickUpdate : onClickSignup}
            >
              {props.isEdit ? "수정" : "등록"}하기
            </button>
          </div>
        </form>
      </main>
    </>
  );
}