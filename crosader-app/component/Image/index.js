import React from "react";

const Image = ({ src, className, alt, classString }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className={className}>
      {isLoading && <div className="overlay"></div>}
      <img
        src={src}
        onLoad={() => setIsLoading(false)}
        className={`${isLoading ? "loading" : "loaded"} ${classString}`}
        alt={alt}
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

export default Image;
