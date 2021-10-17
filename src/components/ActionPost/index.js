import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";

const ActionPostContainer = styled.div`
  display: flex;
  height: 100%;
  .addPoster {
    &__header {
      flex: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      p:nth-child(1) {
        font-size: 32px;
        font-weight: bold;
        text-transform: capitalize;
      }
      p:last-child {
        font-size: 24px;
        color: gray;
      }
    }

    &__inputs {
      flex: 1;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .input {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.4rem;
        width: 100%;

        label {
          font-size: 18px;
          font-weight: bold;
        }

        input,
        textarea {
          margin-top: 10px;
          padding: 10px 8px;
        }
      }

      .actions {
        width: 100%;
        button {
          width: 100%;
        }
      }
    }
  }
`;

const ActionPost = ({
  userId,
  dispatch,
  handleAddPost,
  handleUpdatePost,
  closeModal,
  type = "add",
  updateData,
}) => {
  const [title, setTitle] = useState(type === "add" ? "" : updateData.title);
  const [body, setBody] = useState(type === "add" ? "" : updateData.body);

  const handleClickSubmit = () => {
    const data = {
      userId,
      title,
      body,
    };
    if (type === "add") {
      dispatch(handleAddPost(data));
    } else {
      dispatch(handleUpdatePost({ ...data, id: updateData.id }));
    }
    closeModal();
  };

  const isEmpty = () => {
    if (title.trim() === "" || body.trim() === "") {
      return true;
    }
    return false;
  };

  return (
    <ActionPostContainer>
      <div className="addPoster__header">
        <p>{type === "add" ? "Add" : "Update"} Post</p>
        {type === "add" ? <p>Create a New Post</p> : <p />}
      </div>
      <div className="addPoster__inputs">
        <div className="input">
          <label>Title</label>
          <input
            placeholder="Input title here..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="input">
          <label>Body</label>
          <textarea
            rows={10}
            placeholder="Input body here..."
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>
        <div className="actions">
          <Button
            value="Submit"
            onClick={handleClickSubmit}
            disabled={isEmpty() ? true : false}
          />
        </div>
      </div>
    </ActionPostContainer>
  );
};

export default ActionPost;
