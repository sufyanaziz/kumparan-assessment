import React, { useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";

const DetailAlbumContainer = styled.div`
  display: flex;
  height: 100%;
  color: var(--dark);

  .detailAlbum {
    position: relative;

    &__header {
      flex: 0.4;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 16px 20px;
      text-align: center;

      p:nth-child(1) {
        font-size: 40px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      p:last-child {
        height: 100px;
        font-size: 18px;
      }
    }

    &__photos {
      ::-webkit-scrollbar {
        width: 12px;
      }
      ::-webkit-scrollbar-track {
        background: var(--softDark);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--mainColor);
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      padding: 16px 20px;
      flex: 1;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px 14px;
      cursor: pointer;

      .container {
        margin-bottom: 10px;
      }

      .photo-container {
        width: 100%;
        height: 200px;
        display: block;
        overflow: hidden;
        border: 1px solid black;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .title {
        margin-top: 6px;
      }
    }

    // Single Photo --------------------------------------
    &__iconBack {
      position: absolute;
      left: 20px;
      top: 20px;
      font-size: 34px;
      cursor: pointer;
    }

    &__headerSinglePhoto {
      flex: 0.4;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 16px;
      text-align: left;
      p:nth-child(1) {
        font-size: 28px;
        margin-bottom: 10px;
        font-weight: bold;
        text-decoration: underline;
      }
    }

    &__singlePhoto {
      flex: 1;
      width: 100%;
      height: 100%;

      .photo-container {
        width: 100%;
        height: 100%;
        position: relative;
        margin: 0px;
        display: block;
        overflow: hidden;
        align-items: center;
        background: var(--mainColor);

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;

const DetailAlbum = ({ photos, singleAlbum }) => {
  const [singlePhoto, setSinglePhoto] = useState(null);
  if (singlePhoto !== null)
    return (
      <DetailAlbumContainer singlePhotoBackground={singlePhoto.url}>
        <div
          className="detailAlbum__iconBack"
          onClick={() => setSinglePhoto(null)}
        >
          <IoMdArrowRoundBack />
        </div>
        <div className="detailAlbum__headerSinglePhoto">
          <p>{singlePhoto.title}</p>
        </div>
        <div className="detailAlbum__singlePhoto">
          <div className="photo-container">
            <img src={singlePhoto.url} alt="gambar" />
          </div>
        </div>
      </DetailAlbumContainer>
    );

  return (
    <DetailAlbumContainer>
      <div className="detailAlbum__header">
        <p>Albums.</p>
        <p>"{singleAlbum.title}"</p>
      </div>
      <div className="detailAlbum__photos">
        {photos.map(photo => {
          return (
            <div
              className="container"
              key={photo.id}
              onClick={() => setSinglePhoto(photo)}
            >
              <div className="photo-container">
                <img src={photo.url} alt="gambar" />
              </div>
              <div className="title">
                <p>{photo.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </DetailAlbumContainer>
  );
};

export default DetailAlbum;
