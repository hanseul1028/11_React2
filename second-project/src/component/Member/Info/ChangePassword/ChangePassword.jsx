import { Input, Button } from "../../../styles/Styles";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Common/context/AuthContext";

const ChangePassword = () => {
  const { auth } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleUpdatePassword = () => {
    axios
      .put(
        "http://localhost/members",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
      .then(() => {
        alert("비밀번호 변경에 성공했습니다.");
        window.location.href = "/";
      })
      .catch((error) => {
        setError(
          error.response.data["error-message"] || "비밀번호 변경 중 오류 발생"
        );
      });
  };

  return (
    <>
      <Input
        type="password"
        placeholder="현재 비밀번호를 입력해주세요."
        required
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="변경할 비밀번호를 입력해주세요."
        required
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label style={{ color: "crimson", padding: "7px" }}>{error}</label>
      <Button
        type="button"
        style={{ backgroundColor: "skyblue" }}
        onClick={handleUpdatePassword}
      >
        비밀번호 변경하기
      </Button>
    </>
  );
};
export default ChangePassword;