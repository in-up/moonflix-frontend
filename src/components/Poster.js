import React from "react";
import Image from "next/image";

const Poster = ({ path, alt, width, height }) => {
    
    return(
        <Image
            src={path}
            alt={alt}
            width={width}
            height={height}
            style={{objectFit:"cover"}}
            priority={true}
        />
    );
};

export default Poster;