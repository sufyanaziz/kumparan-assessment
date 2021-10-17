import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import styled from "styled-components";

import { FaUserCircle, FaPhoneAlt } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";

import Layout from "../components/Layout";
import Card from "../components/Card";
import { getUser } from "../store/actions/userActions";
import {
  getPostByUserId,
  getCommentByPostId,
  clearComments,
  addPost,
  updatePost,
  deletePost,
} from "../store/actions/postActions";
import {
  getAlbumsByUserId,
  getPhotoByAlbumId,
  clearPhotos,
} from "../store/actions/albumActions";

import Modal from "../components/Modal";
import DetailPost from "../components/DetailPost";
import DetailAlbum from "../components/DetailAlbum";
import Button from "../components/Button";
import ActionPost from "../components/ActionPost";

const UserPageContainer = styled.div`
  .user {
    color: var(--dark);
    &__header {
      display: grid;
      grid-template-columns: 250px 1fr 0.5fr;
      grid-gap: 0 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 20px;

      .image {
        display: flex;
        justify-content: center;
      }
      .image .icon {
        font-size: 120px;
        color: var(--dark);
      }

      .credential {
        .top {
          margin-bottom: 20px;
          p:nth-child(1) {
            font-size: 32px;
            font-weight: bold;
            text-transform: capitalize;
          }
          p:last-child {
            font-size: 24px;
          }
        }

        .bottom {
          display: flex;
          align-items: center;

          .info {
            display: flex;
            align-items: center;
            margin-right: 20px;

            span {
              margin-left: 6px;
            }
          }
          .info:last-child {
            margin-right: 0;
          }
        }
      }

      .actions {
        display: flex;
        align-items: flex-end;
        margin-left: auto;
      }
    }

    &__divider {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;

      span {
        cursor: pointer;
      }
    }

    &__content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;

      .card {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 12px 20px;

        p:nth-child(1) {
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 18px;
          text-transform: capitalize;
          height: 45px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .body {
          overflow: hidden;
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          height: 135px;
          margin-bottom: 20px;
        }

        .action {
          button {
            margin-right: 4px;
          }
          button:last-child {
            margin-right: 0;
          }
        }
      }

      .card.albums {
        cursor: pointer;
        p:nth-child(1) {
          height: auto;
        }
      }
    }
  }
`;

const UserPage = props => {
  const userId = props.match.params.id;
  const dispatch = useDispatch();

  const [isPost, setIsPost] = useState(true);
  const [isAlbum, setIsAlbum] = useState(false);

  const [singlePost, setSinglePost] = useState(null);
  const [singleAlbum, setSingleAlbum] = useState(null);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openAlbumModal, setOpenAlbumModal] = useState(false);
  const [openModalAddPost, setOpenModalAddPost] = useState(false);
  const [openModalUpdatePost, setOpenModalUpdatePost] = useState(false);

  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getPostByUserId(userId));
    dispatch(getAlbumsByUserId(userId));
  }, [dispatch, userId]);

  const { userProps, postProps, albumProps } = props;

  useEffect(() => {
    if (userProps.user === null) return;
    document.title = `User Page - ${userProps.user.name} (sufyan-kumparan-assessment)`;
  }, [userProps]);

  if (userProps.loading && postProps.loading && albumProps.loading)
    return <PageLoading />;

  if (userProps.user === null)
    return (
      <Layout>
        <UserPageContainer>
          <p>User doesn't exist</p>
        </UserPageContainer>
      </Layout>
    );

  const { name, username, email, phone, website } = userProps.user;

  return (
    <Layout>
      <UserPageContainer>
        {/* modal detail post */}
        <Modal
          open={openPostModal}
          onCloseModal={() => {
            setOpenPostModal(false);
            dispatch(clearComments());
          }}
        >
          {postProps.comments === null ? (
            <div style={{ padding: "20px" }}>
              <p>Loading...</p>
            </div>
          ) : (
            <DetailPost
              singlePost={singlePost}
              comments={postProps.comments}
              author={userProps.user}
            />
          )}
        </Modal>
        {/* Modal Album */}
        <Modal
          open={openAlbumModal}
          onCloseModal={() => {
            setOpenAlbumModal(false);
            dispatch(clearPhotos());
          }}
        >
          {albumProps.photos === null ? (
            <div style={{ padding: "20px" }}>
              <p>Loading...</p>
            </div>
          ) : (
            <DetailAlbum singleAlbum={singleAlbum} photos={albumProps.photos} />
          )}
        </Modal>
        {/* Modal Add Post */}
        <Modal
          open={openModalAddPost}
          onCloseModal={() => {
            setOpenModalAddPost(false);
          }}
        >
          <ActionPost
            userId={userProps.user.id}
            dispatch={dispatch}
            handleAddPost={addPost}
            closeModal={() => setOpenModalAddPost(false)}
          />
        </Modal>
        {/* Modal Update Post */}
        <Modal
          open={openModalUpdatePost}
          onCloseModal={() => {
            setOpenModalUpdatePost(false);
          }}
        >
          <ActionPost
            userId={userProps.user.id}
            dispatch={dispatch}
            handleUpdatePost={updatePost}
            closeModal={() => setOpenModalUpdatePost(false)}
            updateData={singlePost}
            type="update"
          />
        </Modal>

        {/* non modal or main page */}
        <div className="user__header">
          <div className="image">
            <FaUserCircle className="icon" />
          </div>
          <div className="credential">
            <div className="top">
              <p>{name}</p>
              <p>{username}</p>
            </div>
            <div className="bottom">
              <div className="info">
                <BsGlobe />
                <span>{website}</span>
              </div>
              <div className="info">
                <IoMdMail />
                <span>{email}</span>
              </div>
              <div className="info">
                <FaPhoneAlt />
                <span>{phone}</span>
              </div>
            </div>
          </div>
          <div className="actions">
            <Button
              value="Add Post"
              onClick={() => setOpenModalAddPost(true)}
            />
          </div>
        </div>
        <div className="user__divider">
          <span
            onClick={() => {
              setIsAlbum(false);
              setIsPost(true);
            }}
            style={{
              padding: 10,
              textDecoration: isPost ? "underline" : "none",
              fontWeight: isPost ? "bold" : "200",
            }}
          >
            Posts
          </span>
          <span
            onClick={() => {
              setIsPost(false);
              setIsAlbum(true);
            }}
            style={{
              textDecoration: isAlbum ? "underline" : "none",
              fontWeight: isAlbum ? "bold" : "200",
              padding: 10,
            }}
          >
            Albums
          </span>
        </div>
        <div className="user__content">
          {isPost
            ? postProps.post.map((post, idx) => {
                return (
                  <Card key={idx} className="card">
                    <div className="body">
                      <p>{post.title}</p>
                      <p>{post.body}</p>
                    </div>
                    <div className="action">
                      <Button
                        onClick={() => {
                          setOpenPostModal(true);
                          setSinglePost(post);
                          dispatch(getCommentByPostId(post.id));
                        }}
                        value="view"
                        type="primary"
                      />
                      <Button
                        onClick={() => {
                          setOpenModalUpdatePost(true);
                          setSinglePost(post);
                        }}
                        type="secondary"
                        value="update"
                      />
                      <Button
                        value="delete"
                        type="danger"
                        onClick={() => {
                          const confirm = window.confirm(
                            "are you sure remove this post?"
                          );
                          if (confirm) dispatch(deletePost(post.id));
                        }}
                      />
                    </div>
                  </Card>
                );
              })
            : albumProps.albums.map((album, idx) => {
                return (
                  <Card
                    key={idx}
                    className="card albums"
                    onClick={() => {
                      setOpenAlbumModal(true);
                      dispatch(getPhotoByAlbumId(album.id));
                      setSingleAlbum(album);
                    }}
                  >
                    <p>{album.title}</p>
                  </Card>
                );
              })}
        </div>
      </UserPageContainer>
    </Layout>
  );
};

const PageLoading = () => (
  <Layout>
    <UserPageContainer>
      <div className="user__header">
        <div className="image">
          <FaUserCircle className="icon" />
        </div>
        <div className="credential">
          <div className="top">
            <p>...</p>
            <p>...</p>
          </div>
          <div className="bottom">
            <div className="info">
              <BsGlobe />
              <span></span>
            </div>
            <div className="info">
              <IoMdMail />
              <span></span>
            </div>
            <div className="info">
              <FaPhoneAlt />
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div className="user__content">
        <p>...</p>
      </div>
    </UserPageContainer>
  </Layout>
);

const mapStateToProps = state => ({
  userProps: state.users,
  postProps: state.posts,
  albumProps: state.albums,
});

export default connect(mapStateToProps)(UserPage);
