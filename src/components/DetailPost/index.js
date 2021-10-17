import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";
import styled from "styled-components";

import { FaUserCircle } from "react-icons/fa";
import Button from "../Button";

import {
  addComments,
  editComments,
  deleteComments,
} from "../../store/actions/postActions";

const DetailPostContainer = styled.div`
  display: flex;
  height: 100%;
  color: var(--dark);

  .detailPost {
    &__author {
      text-align: center;
      flex: 0.6;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 20px;
      justify-content: center;
      .image .icon {
        font-size: 80px;
      }

      .credential {
        margin: 10px 0 16px 0;
        p:nth-child(1) {
          font-size: 26px;
          font-weight: bold;
          text-transform: capitalize;
          margin-bottom: 4px;
        }
        p:last-child {
          font-size: 16px;
          color: gray;
        }
      }

      .post {
        width: 100%;
        margin-top: 10px;
      }
      .card-post {
        max-height: 180px;
        border: 1px solid black;
        overflow-y: auto;
        padding: 16px 10px;
        margin-top: 10px;
        margin-bottom: 16px;
        white-space: pre-wrap;
        text-align: left;

        p:nth-child(1) {
          font-size: 16px;
          font-weight: bold;
          text-transform: capitalize;
          margin-bottom: 10px;
        }
        p:last-child {
          font-size: 14px;
        }
      }
    }
    &__comments {
      flex: 1;
      padding: 16px 20px;

      .card {
        height: 100%;
        display: grid;
        grid-template-rows: 0.2fr 1fr;

        .header {
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .comment {
          overflow-y: auto;
          padding: 16px 10px;

          .section {
            display: flex;
            margin-bottom: 20px;
            .icon {
              font-size: 35px;
              margin-right: 16px;
            }

            .main {
              .user {
                p:nth-child(1) {
                  font-size: 18px;
                  font-weight: bold;
                }
                p:last-child {
                  color: gray;
                }
              }

              .body {
                margin-top: 10px;
              }

              .action {
                margin-top: 6px;
                span {
                  margin-right: 10px;
                  color: gray;
                  text-decoration: underline;
                  cursor: pointer;
                  font-weight: 300;
                }
              }
            }
          }
        }

        .actions {
          border-top: 1px solid black;
          padding: 16px 0 10px 0;
          width: 100%;
          display: flex;
          input {
            width: 90%;
            margin-right: auto;
            padding: 8px;
          }
          button {
            flex: 1;
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

const DetailPost = ({ singlePost, comments, author, userProps }) => {
  const [inputComment, setInputComment] = useState("");
  const [highlightId, setHighlightId] = useState(null);
  const [singleComment, setSingleComment] = useState(null);
  const dispatch = useDispatch();

  const { name, email } = userProps.user;

  const handleSubmitComment = () => {
    const data = {
      postId: singlePost.id,
      id: 100 + Math.round(Math.random() * 100000),
      name,
      email,
      body: inputComment,
    };

    if (highlightId === null) {
      dispatch(addComments(data));
      setInputComment("");
    } else {
      dispatch(
        editComments({
          ...data,
          id: highlightId,
          name: singleComment.name,
          email: singleComment.email,
        })
      );
      setHighlightId(null);
      setSingleComment(null);
      setInputComment("");
    }
  };
  return (
    <DetailPostContainer>
      <div className="detailPost__author">
        <div className="image">
          <FaUserCircle className="icon" />
        </div>
        <div className="credential">
          <p>
            {author.name} ({author.username})
          </p>
          <p>{author.email}</p>
        </div>
        <div className="divider">
          <u>Author Post</u>
        </div>
        <div className="post">
          <div className="card-post">
            <p>{singlePost.title}</p>
            <p>{singlePost.body}</p>
          </div>
        </div>
      </div>
      <div className="detailPost__comments">
        <div className="card">
          <div className="header">
            <p>Comments.</p>
          </div>
          <div className="comment">
            {comments.length === 0 ? (
              <p>Not Comment Yet</p>
            ) : (
              comments.map(comment => {
                return (
                  <div className="section" key={comment.id}>
                    <div className="icon">
                      <FaUserCircle />
                    </div>
                    <div className="main">
                      <div className="user">
                        <p>{comment.name}</p>
                        <p>{comment.email}</p>
                      </div>
                      <div className="body">{comment.body}</div>
                      <div className="action">
                        <span
                          onClick={() => {
                            setInputComment(comment.body);
                            setHighlightId(comment.id);
                            setSingleComment(comment);
                            if (highlightId === comment.id) {
                              setHighlightId(null);
                              setInputComment("");
                              setSingleComment(null);
                            }
                          }}
                          style={{
                            fontWeight:
                              highlightId === comment.id ? "bold" : "300",
                          }}
                        >
                          {highlightId === comment.id ? "Cancel" : "Edit"}
                        </span>
                        <span
                          onClick={() => {
                            const confirm = window.confirm(
                              "are you sure, delete this comment?"
                            );
                            if (confirm) dispatch(deleteComments(comment.id));
                          }}
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="actions">
            <input
              placeholder="comment here..."
              onChange={e => setInputComment(e.target.value)}
              value={inputComment}
            />
            <Button
              value="submit"
              disabled={inputComment.trim() === "" ? true : false}
              onClick={handleSubmitComment}
            />
          </div>
        </div>
      </div>
    </DetailPostContainer>
  );
};

const mapStateToProps = state => ({
  userProps: state.users,
});

export default connect(mapStateToProps)(DetailPost);
