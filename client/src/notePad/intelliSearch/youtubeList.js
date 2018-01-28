import React from 'react';
import YouTubeListEntry from './youtubeListEntry';

export default props => (
  <div className="video-list">
    {
      props.videos.map(video => (
        <YouTubeListEntry
          key={video.id.videoId}
          video={video}
          handleCurrentVideoChange={props.handleCurrentVideoChange}
        />
      ))
    }
  </div>
);
