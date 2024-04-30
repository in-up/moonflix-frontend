import React from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import { Cross1Icon, PlayIcon } from "@radix-ui/react-icons";
import { baseUrl } from "../../API/constants";
import Row from "../Row";
import styles from "./MovieModal.css";

const MovieModal = ({
  poster_path,
  movieId,
  title,
  genres,
  url,
  rating_avg,
  rating_count,
  setModalVisibility,
  addRating,
}) => {
  const onRating = (rating) => {
    const rating_with_id = `${movieId}:${rating}`;
    console.log(rating_with_id);
    addRating(rating_with_id);
    setModalVisibility(false);
  };

  return (
    <div className={styles.presentation} role="presentation">
      <div className={styles.wrapperModal}>
        <div className={styles.modal}>
          <span
            onClick={() => setModalVisibility(false)}
            className={styles.modalClose}
          >
            <Cross1Icon />
          </span>
          <div className={styles.modalHeader}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <Image
                  className={styles.modalPosterImg}
                  src={poster_path}
                  alt={title}
                  width={200}
                  height={300}
                  objectFit="cover"
                />
                <div className={styles.modalInfo}>
                  <p className={styles.modalDetails}>
                    <span className={styles.modalUserPerc}>Genre: </span>{" "}
                    {genres.replaceAll("|", " | ")}
                  </p>
                  <h3 className={styles.modalTitle}>{title}</h3>
                  <p className={styles.modalOverview}>
                    Vote Average: {rating_avg.toFixed(2)}
                  </p>
                  <p className={styles.modalOverview}>
                    Vote Count: {rating_count}
                  </p>
                  <div className={styles.modalActions}>
                    <button
                      className={`${styles.bannerButton} ${styles.play}`}
                      onClick={() => {
                        window.open(url);
                      }}
                    >
                      <PlayIcon />
                      Detail
                    </button>
                    <ReactStars
                      count={5}
                      onChange={onRating}
                      size={24}
                      color2={"#ffd700"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row
            title="You may also like..."
            id={movieId}
            fetchUrl={`${baseUrl}/item-based/${movieId}`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
