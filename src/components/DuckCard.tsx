import React, { useState } from 'react';

interface DuckCardProps {
  name: string;
  imageUrl: string;
  onClick: () => void;
}

const DuckCard: React.FC<DuckCardProps> = ({ name, imageUrl, onClick }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const fallbackImage = 'https://images.unsplash.com/photo-1470114756574-94833c070c7b?auto=format&fit=crop&q=80&w=800';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-duck-tan cursor-pointer active:scale-95 transition-transform"
    >
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgSrc(fallbackImage)}
          loading="lazy"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="font-bold text-sm text-duck-green truncate">{name}</h3>
      </div>
    </div>
  );
};

export default DuckCard;
