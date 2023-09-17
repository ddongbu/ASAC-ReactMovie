import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";
import "./Login.css";

const Auth = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState("");
  // 회원가입과 로그인을 하나의 form으로 관리
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event; // 비구조화 할당
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault(); // submit 기본 동작(새로고침) 방지
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        console.log("createUserWithEmailAndPassword성공!");
      } else {
        console.log("signInWithEmailAndPassword성공!");
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message); // 에러 메시지 출력
      console.log(createUserWithEmailAndPassword);
    }
  };
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then((data) => {
        setUserData(data.user);
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGithubSignIn() {
    const provider = new GithubAuthProvider();
    signInWithPopup(authService, provider)
      .then((data) => {
        setUserData(data.user);
        navigate("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className="about__container">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={handleGoogleLogin}>구글 로그인</button>
        <button onClick={handleGithubSignIn}>깃허브 로그인</button>
        {userData ? userData.displayName : null}
      </div>
    </div>
  );
};

export default Auth;
