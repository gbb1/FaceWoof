import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ProfileCard from '../components/Discover/ProfileCard';

function Discover() {
  return (
    <div>
      <h1>Discover</h1>
      <ProfileCard />
    </div>
  );
}

export default Discover;
