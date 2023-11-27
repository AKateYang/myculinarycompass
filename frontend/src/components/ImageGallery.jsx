import React, { useEffect, useState } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/images");
      const imageUrls = await response.json();
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.map((url) => (
        <img key={url} src={url} alt="Gallery" />
      ))}
    </div>
  );
};

export default ImageGallery;
