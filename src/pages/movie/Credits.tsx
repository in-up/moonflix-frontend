// components/Credits.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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


const Credits: React.FC<CreditsProps> = ({ tmdbId }) => {
    const [actor, setActor] = useState<Actor[]>([]);
    const [crew, setCrew] = useState<Crew[]>([]);

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

    return (
        <div>
            <h2>Actors</h2>
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                loop={true}
            >
                {actor.filter(actors => actors.known_for_department === "Acting").map(actors => (
                    <SwiperSlide>
                        <div key={actors.id}>
                        {actors.profile_path ? (
                            <img src={`https://image.tmdb.org/t/p/w185${actors.profile_path}`} alt={actors.name} />
                        ) : (
                            <div>No Image Available</div>
                        )}
                        <p>{actors.name}</p>
                        </div>
                    </SwiperSlide>
                    
                ))}
            </Swiper>

            <h2>Directors</h2>
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                loop={true}
            >
                {crew.filter(crews => crews.known_for_department === "Directing").map(director => (
                    <SwiperSlide>
                        <div key={director.id}>
                        {director.profile_path ? (
                            <img src={`https://image.tmdb.org/t/p/w185${director.profile_path}`} alt={director.name} />
                        ) : (
                            <div>No Image Available</div>
                        )}
                        <p>{director.name}</p>
                        </div>
                    </SwiperSlide>
                    
                ))}
            </Swiper>

        </div>
    );
};

export default Credits;
