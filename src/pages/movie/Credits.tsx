// components/Credits.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styled from "styled-components";
import Human from '../layout/Human';

interface Actor {
    id: number;
    name: string;
    profile_path: string | null;
    known_for_department: string;
}

interface Crew {
    id: number;
    name: string;
    profile_path: string | null;
    known_for_department: string;
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
    //Actor and Director array
    const [actor, setActor] = useState<Actor[]>([]);
    const [crew, setCrew] = useState<Crew[]>([]);

    const [slidesPerView, setSlidesPerView] = useState(4);
    const [imgWidth, setImgWidth] = useState(200); // Default width
    const [imgHeight, setImgHeight] = useState(300); // Default height

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${process.env.TMDB_API_KEY}`);
                const data = response.data;
                setActor(data.cast);
                setCrew(data.crew);
            } catch (error) {
                console.error('Error fetching credits:', error);
            }
        };

        fetchCredits();
    }, [tmdbId]);





    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") { // Check if window object is available
                const newImgWidth = window.innerWidth <= 768 ? 150 : 200;
                const newImgHeight = window.innerWidth <= 768 ? 225 : 300;
                setImgWidth(newImgWidth);
                setImgHeight(newImgHeight);

                const slideWidth = newImgWidth;
                const spaceBetween = 30;
                const screenWidth = window.innerWidth;
                const slidesPerView = Math.floor(screenWidth * 0.6 / (slideWidth + spaceBetween));
                setSlidesPerView(slidesPerView);
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
                        slidesPerView={slidesPerView}
                        autoplay={true}
                        loop={true}
                        navigation={true}
                    >
                        {actor.filter(actors => actors.known_for_department === "Acting").map(actors => (
                            <SwiperSlide>
                                <div key={actors.id}>
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
                    </Swiper>
                </Slider>
            </div>
            <div>
                <CreditTitle>감독</CreditTitle>
                <Slider></Slider>
                <Swiper
                    style={{ padding: "1rem 2rem" }}
                    direction="horizontal"
                    spaceBetween={30}
                    slidesPerView={slidesPerView}
                    autoplay={true}
                    loop={true}
                    navigation={true}
                >
                    {crew.filter(crews => crews.known_for_department === "Directing").map(director => (
                        <SwiperSlide>
                            <div key={director.id}>
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
                </Swiper>
            </div>
        </>
    );
};

export default Credits;
