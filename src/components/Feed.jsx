import React, { useState } from 'react';
import Welcome from './Welcome';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  
  if (loading) {
    return (
      <Spinner message={`We are adding ideas to your feed!`} />
    );
  }

  return (
    <div>
       <Welcome />
    </div>
  );
};

export default Feed;
