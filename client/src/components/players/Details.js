import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import { positions } from './AddPlayer';
import { StoreContext } from '../../store';
import { editPlayer, getNations, getPlayerByID } from '../../api';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

function Details({ id, disabled }) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(StoreContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [values, setValues] = useState({
    name: '',
    image: '',
    yoB: '',
    position: '',
    club: '',
    nation: '',
    jerseyNumber: '',
    goals: '',
  });
  const [nationsList, setNationsList] = useState([]);

  useEffect(() => {
    async function fetchMyAPI(id) {
      const response = await getPlayerByID(id);
      const list = await getNations();
      setValues(response);
      setNationsList(list);
    }
    fetchMyAPI(id);
  }, [id]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (token, id) => {
    const result = await editPlayer({ values, id, token });
    console.log(result);
    if (result.status === 200) {
      info('success', result.message);
    } else {
      info('error', result.message);
    }
  };

  const info = (status, msg) => {
    messageApi.open({
      type: status,
      content: msg,
    });
  };

  return (
    <>
      {contextHolder}
      <Navbar />
      <div className='container rounded bg-white mt-5 mb-5'>
        <form
          className='row'
          onSubmit={() => handleSubmit(state.accessToken, id)}
        >
          <div className='col-md-1'></div>
          <div className='col-md-4'>
            <div className='d-flex flex-column align-items-center text-center p-3 py-5'>
              {values.image ? (
                <img src={values.image} className='img card-img' alt='' />
              ) : (
                <img
                  src='https://ae01.alicdn.com/kf/UT8PyDTXsFXXXagOFbXy/12-15CM-Football-Players-Reflective-Car-Decorative-Stickers-Decals-Classic-Car-Body-Cover-Scratches-Accessories-C4.jpg_Q90.jpg_.webp'
                  className='img card-img'
                  alt=''
                />
              )}
            </div>
          </div>
          <div className='col-md-5 border my-3'>
            <div className='p-3 py-5'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4 className='text-right'>Profile Player</h4>
              </div>
              <div className='row my-3'>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter player name'
                    required
                    name='name'
                    onChange={handleChange}
                    value={values.name}
                    disabled={disabled}
                  />
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Nation</label>
                  <select
                    className='form-select'
                    name='nation'
                    onChange={handleChange}
                    required
                    disabled={disabled}
                  >
                    {nationsList.map((item, index) => (
                      <option
                        key={index}
                        value={item._id}
                        selected={item._id === values.nation ? true : false}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter URL image'
                    name='image'
                    onChange={handleChange}
                    value={values.image}
                    disabled={disabled}
                  />
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Birth of player</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Enter birth'
                    name='yoB'
                    min='1970'
                    max='2015'
                    required
                    onChange={handleChange}
                    value={values.yoB}
                    disabled={disabled}
                  />
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Position</label>
                  <select
                    className='form-select'
                    name='position'
                    onChange={handleChange}
                    required
                    disabled={disabled}
                  >
                    {positions.map((item) => (
                      <option
                        key={item.id}
                        value={item.position}
                        selected={
                          item.position === values.position ? true : false
                        }
                      >
                        {item.position}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Club</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter club name'
                    required
                    name='club'
                    onChange={handleChange}
                    value={values.club}
                    disabled={disabled}
                  />
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Jersey Number</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Number of jersey'
                    min='0'
                    max='100'
                    required
                    name='jerseyNumber'
                    onChange={handleChange}
                    value={values.jerseyNumber}
                    disabled={disabled}
                  />
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Goals</label>
                  <input
                    type='number'
                    className='form-control'
                    placeholder='Number of goals'
                    min='0'
                    max='1000'
                    required
                    name='goals'
                    onChange={handleChange}
                    value={values.goals}
                    disabled={disabled}
                  />
                </div>
              </div>
              {!disabled ? (
                <div className='mt-5 text-center'>
                  <button
                    className='btn btn-primary profile-button'
                    type='submit'
                  >
                    Save Profile
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className='col-md-2'></div>
        </form>
      </div>
    </>
  );
}

export default Details;
