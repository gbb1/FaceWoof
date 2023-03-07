/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaDog } from 'react-icons/fa';
import axios from 'axios';

import CardStack from '../components/Discover/CardStack';

export default function Discover() {
  return (
    <div>
      <CardStack />
    </div>
  );
}
