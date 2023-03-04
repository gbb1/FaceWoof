/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import './profileCard.css';

export default function ProfileCard() {
  const imgStyle = {
    scale: 0.5,
  };

  const user = {
    photos: [
      'https://i.ibb.co/VCX4GWs/KOA-Nassau-2697x1517.jpg',
      'https://i.ibb.co/k4rMVRK/dog-puppy-on-garden-royalty-free-image-1586966191.jpg',
    ],
    username: 'Buster',
    age: '6 months',
    breed: 'Golden Retriever',
    vaccinated: true,
    interests: [
      'squirrels',
      'bones',
      'long walks',
    ],
    bio: 'If a dog chews shoes whose shoes does he choose?',

  };

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl profileCard">
        <div className="card-header">
          <div className="card-header-title">
            <div className="avatar">
              <div className="w-24 rounded-contain profile-image">
                <img src="https://i.ibb.co/VCX4GWs/KOA-Nassau-2697x1517.jpg" />
              </div>
            </div>

            <div className="profile-details">
              <div className="card-body-top">
                <h2 className="card-title-text">
                  Buster
                </h2>
                <p className="profile-card-details">6 months • Golden Retriever • 5 miles</p>
                <div className="badge badge-secondary">&#10004; Vaccinated</div>
              </div>
            </div>

          </div>
          <div className="card-actions justify-start">
            <div className="badge badge-outline">Squirrels</div>
            <div className="badge badge-outline">Bones</div>
          </div>
        </div>
        <div className="carousel-container">
          <figure>
            {/* <img src="https://i.ibb.co/VCX4GWs/KOA-Nassau-2697x1517.jpg" alt="Shoes" /> */}
            <div className="carousel w-full">
              <div id="item1" className="carousel-item w-full">
                <img className="w-full" src="https://i.ibb.co/VCX4GWs/KOA-Nassau-2697x1517.jpg" alt="Burger" />
              </div>
              <div id="item2" className="carousel-item w-full">
                <img className="w-full" src="https://i.ibb.co/k4rMVRK/dog-puppy-on-garden-royalty-free-image-1586966191.jpg" alt="Burger" />
              </div>
              <div id="item3" className="carousel-item w-full">
                <img className="w-full" src="https://i.ibb.co/VCX4GWs/KOA-Nassau-2697x1517.jpg" alt="Burger" />
              </div>
              <div id="item4" className="carousel-item w-full">
                <img className="w-full" src="https://i.ibb.co/VCX4GWs/KOA-Nassau-2697x1517.jpg" alt="Burger" />
              </div>
            </div>

          </figure>
          <div className="flex justify-center w-full py-2 gap-2 carousel-buttons">
            <a href="#item1" className="btn btn-xs">1</a>
            <a href="#item2" className="btn btn-xs">2</a>
            <a href="#item3" className="btn btn-xs">3</a>
            <a href="#item4" className="btn btn-xs">4</a>
          </div>
        </div>
        <div className="card-body card-bottom">
          {/* <h2 className="card-title">
            About Buster:
            <div className="badge badge-secondary">NEW</div>
          </h2> */}
          <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
      </div>
    </div>
  );
}
