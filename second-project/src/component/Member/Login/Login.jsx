import { Button, Container, Form, Input, Title } from "../../styles/Styles";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Common/context/AuthContext";


const Login = () => {
  
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [msg, setMsg] = useState("");
    const {auth, login} = useContext(AuthContext);

    const handleLogin = (e) => {

        e.preventDefault();
      
        const regexp = /^[a-zA-Z0-9]{5,15}$/;

        if(!regexp.test(memberId)){
            setMsg("아이디값 유효하지 않음");
            return;

        }else{
            setMsg(""); // 에러메시지 없에줌
        }
        axios.post("http://localhost/auth/login", {
            memberId : memberId,
            memberPw : memberPw,
        }).then(result => {
            // console.log(result.data);
            const {memberId, memberName, memberNo, accessToken, refreshToken} = 
              result.data;
            login(memberNo, memberId, memberName, accessToken, refreshToken);

            /*
            localStorage.setItem("memberId", memberId); // 브라우저 꺼도 유지
            localStorage.setItem("memberName", memberName);
            localStorage.setItem("memberNo", memberNo);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            */
            // sessionStorage.setItem(); 브라우저 끄면 날아감

            alert("로그인 성공");
            window.location.href= "/";
        })
        .catch((error) => {
            console.log(error);
            alert(error.response.data['error-message']);
        });
    };
  return (
    <>
      <Container height="300px">
        <Form onSubmit={handleLogin}>
          <Title>로그인</Title>
          <Input type="text" placeholder="아이디를 입력해주세요." required
          onChange= {(e) => setMemberId(e.target.value)} />
          <label style={{fontSize: "13px" , color:"orange", padding:"4px"}}>{msg}</label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange= {(e) => setMemberPw(e.target.value)}
            required
          />
          <Button type="submit">즐거운 로그인하기</Button>
        </Form>
      </Container>
    </>
  );
};
export default Login;