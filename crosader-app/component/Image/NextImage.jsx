import Image from "next/image";
import { useState } from "react";

const NextImage = ({ src, alt, className, width, height }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={className}>
      {isLoading && <div className="overlay"></div>}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        className={`${
          isLoading ? "loading" : "loaded"
        } rounded cursor-pointer mb-2`}
      />

      <style jsx>{`
        .overlay {
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .loading {
          filter: blur(5px);
        }
        .loaded {
          filter: none;
          transition: filter 0.5s;
        }
      `}</style>
    </div>
  );
};

export default NextImage;
