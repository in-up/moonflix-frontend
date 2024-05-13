import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styled from "styled-components";
import Human from '../layout/Human';

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
`;

const Credits: React.FC<CreditsProps> = ({ tmdbId }) => {
    const base_url = "https://image.tmdb.org/t/p/original";
    const no_image = '/images/no_image_icon.png';

    const [actor, setActor] = useState<Actor[]>([]);
    const [crew, setCrew] = useState<Crew[]>([]);
    const [actorSlidesPerView, setActorSlidesPerView] = useState(4);
    const [crewSlidesPerView, setCrewSlidesPerView] = useState(4);
    const [imgWidth, setImgWidth] = useState(200);
    const [imgHeight, setImgHeight] = useState(300);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${process.env.TMDB_API_KEY}`);
                const data = response.data;
                const filteredActors = data.cast.filter((actor: Actor) => actor.known_for_department === "Acting");
                const sortedActors = filteredActors.sort((a: Actor, b: Actor) => b.popularity - a.popularity);
                setActor(sortedActors);

                const filteredCrew = data.crew.filter((crew: Crew) => crew.known_for_department === "Directing");
                const sortedCrew = filteredCrew.sort((a: Crew, b: Crew) => b.popularity - a.popularity);
                setCrew(sortedCrew);
            } catch (error) {
                console.error('Error fetching credits:', error);
            }
        };

        fetchCredits();
    }, [tmdbId]);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                const newImgWidth = window.innerWidth * 0.6 <= 768 ? 150 : 200;
                const newImgHeight = window.innerWidth * 0.6 <= 768 ? 225 : 300;
                setImgWidth(newImgWidth);
                setImgHeight(newImgHeight);
                const slideWidth = newImgWidth;
                const spaceBetween = 30;
                const screenWidth = window.innerWidth;
                const ActorSlidesPerView = Math.floor(screenWidth * 0.6 / (slideWidth + spaceBetween));
                const CrewSlidesPerView = Math.floor(screenWidth * 0.6 / (slideWidth + spaceBetween));

                if (actor.length < 6 && window.innerWidth * 0.6 > 1080) {
                    setActorSlidesPerView(5);
                } else {
                    setActorSlidesPerView(ActorSlidesPerView);
                }


                if (crew.length < 6 && window.innerWidth * 0.6 > 1080) {
                    setCrewSlidesPerView(5);
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
    }, []);


    return (
        <>
            <div>
                <CreditTitle>배우</CreditTitle>
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
                        {actor.map(actors => (
                            <SwiperSlide key={actors.id}>
                                <div>
                                    {actors.profile_path ? (
                                        <RowHuman>
                                            <Human
                                                id={actors.id}
                                                path={`${base_url}${actors.profile_path}`}
                                                alt={actors.name}
                                                width={imgWidth}
                                                height={imgHeight}
                                            />
                                        </RowHuman>
                                    ) : (
                                        <RowHuman>
                                            <Human
                                                id={actors.id}
                                                path={`${no_image}`}
                                                alt={actors.name}
                                                width={imgWidth}
                                                height={imgHeight}
                                            />
                                        </RowHuman>
                                    )}
                                    <p>{actors.name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                        {Array.from({ length: Math.max(0, actorSlidesPerView - actor.length) }).map((_, index) => (
                            <SwiperSlide key={`empty-${index}`} />
                        ))}
                    </Swiper>
                </Slider>
            </div>
            <div>
                <CreditTitle>감독</CreditTitle>
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
                        {crew.map(director => (
                            <SwiperSlide key={director.id}>
                                <div>
                                    {director.profile_path ? (
                                        <RowHuman>
                                            <Human
                                                id={director.id}
                                                path={`${base_url}${director.profile_path}`}
                                                alt={director.name}
                                                width={imgWidth}
                                                height={imgHeight}
                                            />
                                        </RowHuman>
                                    ) : (
                                        <RowHuman>
                                            <Human
                                                id={director.id}
                                                path={`${no_image}`}
                                                alt={director.name}
                                                width={imgWidth}
                                                height={imgHeight}
                                            />
                                        </RowHuman>
                                    )}
                                    <p>{director.name}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                        {Array.from({ length: Math.max(0, crewSlidesPerView - crew.length) }).map((_, index) => (
                            <SwiperSlide key={`empty-${index}`} />
                        ))}
                    </Swiper>
                </Slider>
            </div>
        </>
    );
};

export default Credits;
