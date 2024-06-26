import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import FigureItem from "../layout/FigureItem";
import { slate } from "@radix-ui/colors";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

interface Crew {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

interface CreditsProps {
  tmdbId: number;
}

const CreditTitle = styled.h2`
  font-size: 1.75rem;
  padding-left: 3rem;
  color: white;
`;

const RowHuman = styled.div`
  flex-shrink: 0;
  width: 200px;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 4px;
  text-align: center;

  &:hover {
    transform: scale(1.08);
  }

  @media screen and (min-width: 1200px) {
    max-height: 360px;
  }

  @media screen and (max-width: 768px) {
    max-height: 280px;
  }
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  .swiper-button-prev,
  .swiper-button-next {
    padding: 15px 5px;
    border-radius: 20px;
    color: ${slate.slate1} !important;
    opacity: 0.7;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 1.5rem !important;
    font-weight: 600 !important;
  }
`;

const Credits: React.FC<CreditsProps> = ({ tmdbId }) => {
  const base_url = "https://image.tmdb.org/t/p/original";
  const no_image = "/placeholder.png";

  const [actor, setActor] = useState<Actor[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);
  const [actorSlidesPerView, setActorSlidesPerView] = useState(4);
  const [crewSlidesPerView, setCrewSlidesPerView] = useState(4);
  const [imgWidth, setImgWidth] = useState(200);
  const [imgHeight, setImgHeight] = useState(300);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`
        );
        const data = response.data;
        //배우 정보 선별
        const filteredActors = data.cast.filter(
          (actor: Actor) => actor.known_for_department === "Acting"
        );
        //인기도순 정렬
        const sortedActors = filteredActors.sort(
          (a: Actor, b: Actor) => b.popularity - a.popularity
        );
        //중복 데이터 제거
        const uniqueActorsMap = new Map<number, Actor>();

        sortedActors.forEach((actor: Actor) => {
          uniqueActorsMap.set(actor.id, actor);
        });

        const uniqueActors = Array.from(uniqueActorsMap.values());
        setActor(uniqueActors);

        //감독 정보 선별
        const filteredCrew = data.crew.filter(
          (crew: Crew) => crew.known_for_department === "Directing"
        );
        //인기도순 정렬
        const sortedCrew = filteredCrew.sort(
          (a: Crew, b: Crew) => b.popularity - a.popularity
        );
        //중복 데이터 제거
        const uniqueCrewsMap = new Map<number, Actor>();

        sortedCrew.forEach((crew: Crew) => {
          uniqueCrewsMap.set(crew.id, crew);
        });

        const uniqueCrews = Array.from(uniqueCrewsMap.values());
        setCrew(uniqueCrews);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    fetchCredits();
  }, [tmdbId]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const newImgWidth = window.innerWidth * 0.6 <= 768 ? 120 : 150;
        const newImgHeight = window.innerWidth * 0.6 <= 768 ? 180 : 200;
        setImgWidth(newImgWidth);
        setImgHeight(newImgHeight);
        const slideWidth = newImgWidth;
        const spaceBetween = 30;
        const screenWidth = window.innerWidth;
        const ActorSlidesPerView = Math.floor(
          (screenWidth * 0.6) / (slideWidth + spaceBetween)
        );
        const CrewSlidesPerView = Math.floor(
          (screenWidth * 0.6) / (slideWidth + spaceBetween)
        );

        if (actor.length < 6 && window.innerWidth * 0.6 > 1080) {
          setActorSlidesPerView(6);
        } else {
          setActorSlidesPerView(ActorSlidesPerView);
        }

        if (crew.length < 6 && window.innerWidth * 0.6 > 1080) {
          setCrewSlidesPerView(6);
        } else {
          setCrewSlidesPerView(CrewSlidesPerView);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [actor.length, crew.length]);

  return (
    <>
      <div>
        <CreditTitle>주연/조연</CreditTitle>
        <Slider>
          <Swiper
            style={{ padding: "1rem 2rem" }}
            direction="horizontal"
            spaceBetween={30}
            slidesPerView={actorSlidesPerView}
            autoplay={true}
            loop={false}
            navigation={true}
          >
            {actor.map((actors) => (
              <SwiperSlide key={actors.id}>
                <div>
                  {actors.profile_path ? (
                    <RowHuman>
                      <FigureItem
                        id={actors.id}
                        path={`${base_url}${actors.profile_path}`}
                        alt={actors.name}
                        width={imgWidth}
                        height={imgHeight}
                      />
                      <div className="human-title">{actors.name}</div>
                    </RowHuman>
                  ) : (
                    <RowHuman>
                      <FigureItem
                        id={actors.id}
                        path={`${no_image}`}
                        alt={actors.name}
                        width={imgWidth}
                        height={imgHeight}
                      />
                      <div className="human-title">{actors.name}</div>
                    </RowHuman>
                  )}
                </div>
              </SwiperSlide>
            ))}
            {Array.from({
              length: Math.max(0, actorSlidesPerView - actor.length),
            }).map((_, index) => (
              <SwiperSlide key={`empty-${index}`} />
            ))}
          </Swiper>
        </Slider>
      </div>
      <div>
        <CreditTitle>연출</CreditTitle>
        <Slider>
          <Swiper
            style={{ padding: "1rem 2rem" }}
            direction="horizontal"
            spaceBetween={30}
            slidesPerView={crewSlidesPerView}
            autoplay={true}
            loop={false}
            navigation={true}
          >
            {crew.map((director) => (
              <SwiperSlide key={director.id}>
                <div>
                  {director.profile_path ? (
                    <RowHuman>
                      <FigureItem
                        id={director.id}
                        path={`${base_url}${director.profile_path}`}
                        alt={director.name}
                        width={imgWidth}
                        height={imgHeight}
                      />
                      <div className="human-title">{director.name}</div>
                    </RowHuman>
                  ) : (
                    <RowHuman>
                      <FigureItem
                        id={director.id}
                        path={`${no_image}`}
                        alt={director.name}
                        width={imgWidth}
                        height={imgHeight}
                      />
                      <div className="human-title">{director.name}</div>
                    </RowHuman>
                  )}
                </div>
              </SwiperSlide>
            ))}
            {Array.from({
              length: Math.max(0, crewSlidesPerView - crew.length),
            }).map((_, index) => (
              <SwiperSlide key={`empty-${index}`} />
            ))}
          </Swiper>
        </Slider>
      </div>
    </>
  );
};

export default Credits;
