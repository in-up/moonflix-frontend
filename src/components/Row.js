import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import MovieModal from "./MovieModal";
import styles from "./Row.css";

const Row = ({ title, fetchUrl, id, addRating }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [movieSelected, setMovieSelection] = useState({});

  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${fetchUrl}`);
      // const res = await fetch(`/api${fetchUrl}`);
      const data = await res.json();
      setMovies(data.result);
    }

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setModalVisibility(true);
    setMovieSelection(movie);
  };

  const handleScroll = (direction) => {
    const scrollDistance = rowRef.current.offsetWidth - 80;
    if (direction === "left") {
      rowRef.current.scrollLeft -= scrollDistance;
    } else if (direction === "right") {
      rowRef.current.scrollLeft += scrollDistance;
    }
  };

  return (
    <section className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.slider}>
        <div className={styles.slider__arrowLeft} onClick={() => handleScroll("left")}>
          <span className={styles.arrow}>
            <ArrowLeftIcon />
          </span>
        </div>
        <div ref={rowRef} id={id} className={styles.row__posters}>
          {movies.map((movie, idx) => (
            <div key={idx} className={styles.row__poster} onClick={() => handleClick(movie)}>
              <Image
                src={`${base_url}${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                objectFit="cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className={styles.slider__arrowRight} onClick={() => handleScroll("right")}>
          <span className={styles.arrow}>
            <ArrowRightIcon />
          </span>
        </div>
      </div>
      {modalVisibility && (
        <MovieModal
          {...movieSelected}
          setModalVisibility={setModalVisibility}
          addRating={addRating}
        />
      )}
    </section>
  );
};

export default Row;
