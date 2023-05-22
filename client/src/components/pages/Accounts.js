import React, { useEffect, useState } from 'react';
import Navbar from '../common/Navbar';
import { editProfile, getUserProfile } from '../../api';
import { message } from 'antd';

function Accounts({ id }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [disabled, setDisabled] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [values, setValues] = useState({
    username: '',
    yoB: '',
    name: '',
  });

  useEffect(() => {
    async function fetchMyAPI(id) {
      const response = await getUserProfile({ id });
      setValues(response);
    }
    fetchMyAPI(id);
  }, [refresh]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    setRefresh(true);
    const result = await editProfile({ values, id });
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
      <div className='container d-flex justify-content-center'>
        <div className='card my-5'>
          <div className='p-3 py-5'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <h4 className='text-right'>My Infomation</h4>
            </div>
            <form onSubmit={(e) => handleSubmit(e, id)}>
              <div className='row my-3'>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Usename</label>
                  <input
                    type='text'
                    className='form-control'
                    value={values.username}
                    name='username'
                    disabled
                  />
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter new name'
                    required
                    name='name'
                    onChange={handleChange}
                    value={values.name}
                  />
                </div>
                <div className='col-md-12 my-1'>
                  <label className='labels'>Year Of Birth</label>
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
                  />
                </div>
              </div>
              <div className='mt-5 text-center'>
                <button
                  className='btn btn-primary profile-button'
                  type='submit'
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Accounts;
