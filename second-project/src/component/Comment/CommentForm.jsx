import { Container, Form, Title, Input, Button } from "../styles/Styles";
import CommentList from "../Comment/CommentList";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Common/context/AuthContext";
import axios from "axios";

const CommentForm = ({boardNo}) => {

    // 사용자가 입력한 댓글 내용 + 회원 번호 + 게시글 번호
  const {auth} = useState(AuthContext);
  const[commentContent, setCommentContent] = useState("");
  const [success, onSuccess] = useState(true);


  const handleInsertComment = (e) => {
    e.preventDefault();

    if(commentContent.trim() === ''){
        alert("내용 꼭 작성");
        return;
    }
    if(!auth.isAuthenticated){
        alert("로그인 먼저 진행");
        return;
    }
    axios.post(`http://localhost/comments`,
    {
        refBoardNo : boardNo,
        commentWriter : auth.memberNo,
        commentContent : commentContent,
    },
    {
        headers : {
            Authorization : `Bearer ${auth.AccessToken}`,
        },
    }
    ).then((response) => {
    if(response.status === 201){
        alert("성공");
        setCommentContent("");
        onSuccess((success) => !success);
      }
    })
    .catch((error) => {
        console.error(error);
    });
  };

  return (
    <Container>
      <Form onSubmit={handleInsertComment}>
        <Title>댓글도 써보장</Title>
        <Input type="text"
                value={commentContent}
        placeholder="댓글을 입력하세요" 
        onChange={ e => setCommentContent(e.target.value)}
        />
        <Button>댓글 작성하기</Button>
      </Form>
      <CommentList boardNo={boardNo} success ={success}/>
    </Container>
  );
};

export default CommentForm;