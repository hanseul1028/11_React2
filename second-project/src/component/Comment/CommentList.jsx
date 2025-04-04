import {
    CommentAuthor,
    CommentContainer,
    CommentContent,
    CommentDate,
    CommentItem,
    Container,
} from "../styles/Styles";
import { useState, useEffect } from "react";
import axios from "axios";


  const CommentList = ({boardNo}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost/comments?boardNo=${boardNo}`)
             .then((response) => {
                setComments([...response.data]);
             });
    }, [success]);
    return (
      <CommentContainer>
          {comments.length === 0 ? (
            <>
            <CommentItem>
            <CommentAuthor>대신</CommentAuthor>
            <CommentContent>댓글</CommentContent>
            <CommentDate>을...</CommentDate>
            </CommentItem>
            </>
        )  : (
          comments.map(comment => {
            return(
                <>
                <CommentItem>
                <CommentAuthor>{comment.commentWriter}</CommentAuthor>
                <CommentContent>{comment.CommentContent}</CommentContent>
                <CommentDate>{comment.createDate}</CommentDate>
                </CommentItem>
                </>
          };
        )};
        )};
      </CommentContainer>
    );
  };
  export default CommentList;  