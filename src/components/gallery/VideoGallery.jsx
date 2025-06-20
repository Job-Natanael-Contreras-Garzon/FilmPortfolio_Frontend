import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import YouTubeCard from './YouTubeCard';
import ModalYouTube from './ModalYouTube';
import './VideoGallery.css';

const VideoGallery = () => {
  const { t } = useTranslation();

  const videosData = [
    {
      id: 1,
      title: t('videoGallery.videos.video1_title'),
      description: t('videoGallery.videos.video1_description'),
      thumbnail: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
      youtubeId: 'LXb3EKWsInQ',
      category: 'event'
    },
    {
      id: 2,
      title: t('videoGallery.videos.video2_title'),
      description: t('videoGallery.videos.video2_description'),
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
      youtubeId: 'LXb3EKWsInQ',
      category: 'commercial'
    },
    {
      id: 3,
      title: t('videoGallery.videos.video3_title'),
      description: t('videoGallery.videos.video3_description'),
      thumbnail: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
      youtubeId: 'LXb3EKWsInQ',
      category: 'documentary'
    },
    {
      id: 4,
      title: t('videoGallery.videos.video4_title'),
      description: t('videoGallery.videos.video4_description'),
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
      youtubeId: 'LXb3EKWsInQ',
      category: 'shortfilm'
    },
    {
      id: 5,
      title: t('videoGallery.videos.video5_title'),
      description: t('videoGallery.videos.video5_description'),
      thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
      youtubeId: 'LXb3EKWsInQ',
      category: 'event'
    },
    {
      id: 6,
      title: t('videoGallery.videos.video6_title'),
      description: t('videoGallery.videos.video6_description'),
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
      youtubeId: 'LXb3EKWsInQ',
      category: 'musicvideo'
    }
  ];

  const categories = [
    { id: 'all', name: t('videoGallery.categories.all') },
    { id: 'highlight', name: t('videoGallery.categories.highlight') },
    { id: 'commercial', name: t('videoGallery.categories.commercial') },
    { id: 'documentary', name: t('videoGallery.categories.documentary') },
    { id: 'shortfilm', name: t('videoGallery.categories.shortfilm') },
    { id: 'event', name: t('videoGallery.categories.event') },
    { id: 'musicvideo', name: t('videoGallery.categories.musicvideo') }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const galleryRef = useRef(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      setGalleryVisible(true);
      setIsAnimatingOut(false);
    } else {
      setGalleryVisible(false);
    }
  }, [inView]);

  useEffect(() => {
    setIsAnimatingOut(true);
    const timer = setTimeout(() => {
      setIsAnimatingOut(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredVideos = selectedCategory === 'all'
    ? videosData
    : videosData.filter(video => video.category === selectedCategory);

  const openModal = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div ref={ref}>
      <div className="flex flex-wrap justify-center mb-10 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div
        ref={galleryRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000 video-gallery-grid ${galleryVisible ? 'gallery-visible' : 'gallery-hidden'}`}
      >
        {filteredVideos.map((video, index) => (
          <div
            key={`${selectedCategory}-${video.id}`}
            className={`video-card-item preserve-3d will-change-transform ${isAnimatingOut ? 'card-exiting' : (galleryVisible ? 'card-visible' : 'card-hidden')}`}
            style={{ transitionDelay: galleryVisible && !isAnimatingOut ? `${index * 0.1}s` : '0s' }}
          >
            <YouTubeCard
              video={video}
              onClick={() => openModal(video)}
            />
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">{t('videoGallery.noVideosFound')}</p>
        </div>
      )}

      <ModalYouTube
        isOpen={modalOpen}
        onRequestClose={closeModal}
        video={selectedVideo}
      />
    </div>
  );
};

export default VideoGallery;
