import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface RatingProps {
    rating: number;
    size: number; // 문자열 대신 숫자 값으로 변경
}

const RatingImage = styled(Image)`
    
    overflow: hidden;
`;

const Rating: React.FC<RatingProps> = ({ rating, size }) => {
    const renderRatingImage = () => {
        const baseUrl = '/images/rating/';
        let ratingImage = '';
        let result = '';

        if (rating > 8.0) {
            ratingImage = 'm5.png';
        } else if (rating > 7.0) {
            ratingImage = 'm4.png';
        } else if (rating > 6.0) {
            ratingImage = 'm3.png';
        } else if (rating > 4.0) {
            ratingImage = 'm2.png';
        } else if (rating > 2.0) {
            ratingImage = 'm1.png';
        }else {
            ratingImage = 'star_0.png'; // 기본적으로 no_rating 이미지를 반환하도록 설정
        }

        result = baseUrl+ratingImage;
        return result;
    };

    return (
        <RatingImage
            src={renderRatingImage()} 
            alt={`Rating: ${rating}`}
            style={{ objectFit: "cover" }} 
            width={size} 
            height={size}
        />
    );
};

export default Rating;