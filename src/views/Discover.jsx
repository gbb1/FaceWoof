/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ProfileCard from '../components/Discover/ProfileCard';
import './discover.css';

function Discover() {
  return (
    <div>
      <h1>Discover</h1>
      <div className="discover-cardview-parent">
        <button type="button" className="btn btn-active btn-accent">Pass</button>
        <ProfileCard />
        <button type="button" className="btn btn-active btn-primary">Digg &apos;em</button>
      </div>
    </div>
  );
}

export default Discover;
