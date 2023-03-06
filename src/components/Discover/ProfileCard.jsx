/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import './profileCard.css';

export default function ProfileCard() {
  const user = {
    profile_photo: 'https://i.ibb.co/VCX4GWs/KOA-Nassau-2697x1517.jpg',
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

  const distance = 5;

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl profileCard">
        <div className="card-header">
          <div className="card-header-title">
            <div className="avatar">
              <div className="w-24 rounded-contain profile-image">
                <img src={user.profile_photo} />
              </div>
            </div>

            <div className="profile-details">
              <div className="card-body-top">
                <h2 className="card-title-text">
                  {user.username}
                </h2>
                <p className="profile-card-details">
                  {user.age}
                  {' '}
                  •
                  {' '}
                  {user.breed}
                  {' '}
                  •
                  {' '}
                  {distance}
                  {' '}
                  miles
                </p>
                {
                  user.vaccinated
                    ? <div className="badge badge-secondary">&#10004; Vaccinated</div>
                    : null
                }
              </div>
            </div>

          </div>
          <div className="card-actions justify-start">
            {
              user.interests.map((interest) => (
                <div className="badge badge-outline">{interest}</div>
              ))
            }
          </div>
        </div>
        <div className="carousel-container">
          <figure>
            <div className="carousel w-full">
              {
                user.photos.map((url, index) => (
                  <div id={`item${index}`} className="carousel-item w-full">
                    <img className="w-full" src={url} alt="Doggy" />
                  </div>
                ))
              }
            </div>
          </figure>
          <div className="flex justify-center w-full py-2 gap-2 carousel-buttons">
            {
                user.photos.map((url, index) => (
                  <a href={`#item${index}`} className="btn btn-xs">{index}</a>
                ))
            }
          </div>
        </div>
        <div className="card-body card-bottom">
          {/* <h2 className="card-title">
            About Buster:
            <div className="badge badge-secondary">NEW</div>
          </h2> */}
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
}
