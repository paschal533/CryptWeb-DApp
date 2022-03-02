import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Faucet, Feed, Receive } from '../components';

const Pins = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/Receive" element={<Receive />} />
        <Route path="/Faucet" element={<Faucet />} />
      </Routes>
    </div>
  );
};

export default Pins;
