import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

interface RatingProps {
    rating: number;
    size: number;
}

const RatingImage = styled(Image)`
    overflow: hidden;
`;

const Rating: React.FC<RatingProps> = ({ rating, size }) => {
    const renderRatingImage = () => {
        const baseUrl = '/rating/';
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
            ratingImage = 'm4.png';
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