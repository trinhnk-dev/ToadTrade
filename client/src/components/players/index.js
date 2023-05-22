import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../common/Navbar';

import { useNavigate } from 'react-router-dom';
import { StoreContext, actions } from '../../store';
import { deletePlayerByID, getPlayers } from '../../api';

function Players() {
  const [state, dispatch] = useContext(StoreContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getPlayers();
      dispatch(actions.setPlayer(response));
      sessionStorage.setItem('players', JSON.stringify(response));
    }
    fetchMyAPI();
  }, []);

  const handleDelete = async (id, token) => {
    const confirm = window.confirm('Are you sure you want to delete ?');
    if (confirm) {
      await dispatch(deletePlayerByID({ id, token }));
    }
    return;
  };

  const handleNavigate = (id) => {
    return navigate(`/players/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='mt-3 p-2 d-flex justify-content-center'>
          {state.profile.isAdmin ? (
            <div className='position-absolute w-100 h-100'>
              <div className='float-end bottom-0 d-flex h-100 '>
                <button
                  className='btn btn-outline-danger float-end align-items-center d-flex justify-content-center'
                  style={{
                    borderRadius: '100%',
                    width: 45,
                    height: 45,
                    marginRight: 100,
                    bottom: 20,
                  }}
                  onClick={(e) => navigate('/players/add')}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='45'
                    height='45'
                    fontWeight='700'
                    fill='currentColor'
                    className='bi bi-plus-lg'
                    style={{ fontWeight: '700px', fontSize: '' }}
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : null}
          <div className='flex-nowrap input-group w-50 row'>
            <label
              htmlFor='searchInput'
              className='col-sm-2 col-form-label text-end'
            >
              Search:
            </label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                id='searchInput'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          {state.players.map((data, index) => (
            <div key={index} className='col-lg-3 col-md-6 col-sm-12 border-0'>
              <div
                onClick={(e) => handleNavigate(data._id)}
                key={index}
                className='profile-card text-center'
              >
                {data.image ? (
                  <img src={data.image} className='img card-img' alt='' />
                ) : (
                  <img
                    src='https://ae01.alicdn.com/kf/UT8PyDTXsFXXXagOFbXy/12-15CM-Football-Players-Reflective-Car-Decorative-Stickers-Decals-Classic-Car-Body-Cover-Scratches-Accessories-C4.jpg_Q90.jpg_.webp'
                    className='img card-img'
                    alt=''
                  />
                )}
                {state.profile.isAdmin ? (
                  <div className='profile-actions'>
                    <button
                      className='btn btn-danger'
                      type='button'
                      onClick={(e) => handleDelete(data._id, state.accessToken)}
                    >
                      <i class='bi bi-trash3-fill'></i>
                    </button>
                  </div>
                ) : null}
                <div className='profile-name'>{data.name}</div>
                <div className='profile-overview'>
                  <div className='profile-overview'>
                    <div className='row text-center'>
                      <div className='col-sm-4 align-items-center d-flex flex-column'>
                        <h6>{data.club}</h6>
                        <p>Club</p>
                      </div>
                      <div className='col-sm-4 align-items-center d-flex flex-column'>
                        <h6>{data.position}</h6>
                        <p>Position</p>
                      </div>
                      <div className='col-sm-4 align-items-center d-flex flex-column'>
                        <h6>{data.goals}</h6>
                        <p>Goals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Players;
