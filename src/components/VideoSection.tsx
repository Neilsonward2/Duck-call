import React from 'react';

interface Video {
  id: string;
  title: string;
  description: string;
  videoId: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Basic Quack & Rhythm',
    description: 'Learn the foundational sound of duck calling and the core rhythm.',
    videoId: '9oV-EbeXf-8', // Duck Calling Basics
  },
  {
    id: '2',
    title: 'The Greeting Call',
    description: 'Master the 5-7 note sequence used to attract ducks from a distance.',
    videoId: 'qC8e7XU-PjU',
  },
  {
    id: '3',
    title: 'The Feed Chuckle',
    description: 'Mimic the sound of ducks feeding to build confidence in your spread.',
    videoId: 'YVOfP8M-Syc',
  },
  {
    id: '4',
    title: 'Advanced Comeback Call',
    description: 'Bring them back when they are moving away with this high-energy call.',
    videoId: 'P0hIOf9e1eM',
  }
];

const VideoSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-duck-tan">
        <h2 className="text-xl font-bold mb-2">Master the Call</h2>
        <p className="text-sm text-gray-600">Watch these expert tutorials to learn the essential sounds and strategies for successful duck hunting.</p>
      </div>

      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-duck-tan">
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg">{video.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoSection;
