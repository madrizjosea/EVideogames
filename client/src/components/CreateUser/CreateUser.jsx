import React from 'react';
import './CreateUser';
import { useState } from 'react';
import axiosInstance from '../../axios';
import { Image } from 'cloudinary-react';
import Style from './CreateUser.module.css';

export default function CreateUser() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    image: '',
  });
  const [result, setResult] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState({});

  let handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  let handleClick = e => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password) return;
    else {
      (async () => {
        await axiosInstance({
          method: 'post',
          url: '/users',
          data: input,
        }).then(response => setResult(response.status));
      })();
    }
  };

  const uploadImage = files => {
    files.preventDefault();
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'uk5jmzhu');
    axiosInstance
      .post('https://api.cloudinary.com/v1_1/dnf3cz1f3/image/upload', formData)
      .then(response =>
        setInput({
          ...input,
          image: `https://res.cloudinary.com/dnf3cz1f3/image/upload/v1664485387/${response.data.public_id}.png`,
        })
      );
  };

  return (
    <form>
      <div className={Style.cointainer}>
        <h1 className={Style.textoUser}>Register</h1>
        <br />

        <div>
          <label className={Style.textoNombre}>Name:</label>
          <br />
          <input
            className={(error.name && 'danger') || Style.name}
            type="text"
            name="name"
            onChange={handleChange}
            value={input.name}
            autoComplete="off"
          />
          {error.name && <p className="danger">{error.name}</p>}
        </div>

        <br />
        <div>
          <label className={Style.textoEmail}>Email:</label>
          <br />
          <input
            className={(error.email && 'danger') || Style.email}
            type="text"
            name="email"
            onChange={handleChange}
            value={input.email}
            autoComplete="off"
          />
          {error.email && <p className="danger">{error.email}</p>}
        </div>
        <br />
        <div>
          <label className={Style.textoPassword}>Password:</label>
          <br />
          <input
            className={(error.password && 'danger') || Style.password}
            type="password"
            name="password"
            onChange={handleChange}
            value={input.password}
            autoComplete="off"
          />
          {error.password && <p className="danger">{error.password}</p>}
        </div>
        <br />

        <div className={Style.browse}>
          <input
            className="texto"
            type="file"
            onChange={event => {
              event.preventDefault();
              setImage(event.target.files[0]);
            }}
            autoComplete="off"
          />
          <button className={Style.ImgLoad} onClick={uploadImage}>
            Upload Image
          </button>
        </div>

        <div className={Style.udCon}>
          <Image
            className={Style.uploaded}
            cloudName="dnf3cz1f3"
            publicId={input.image}
          />
        </div>

        <div>
          <button className={Style.register} onClick={handleClick}>
            Register
          </button>
        </div>
        {result === 201 && (
          <p className="danger">
            The email is already associated with an account
          </p>
        )}
        {result === 200 && <p className="texto">User created successfully</p>}
        <br />


      </div>
    </form>
  );
}

const validate = input => {
  let error = {};
  if (!input.name) {
    error.name = 'data needed';
  } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
    error.name = 'The data entered is not valid';
  }
  if (!input.email) {
    error.email = 'data needed';
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      input.email
    )
  ) {
    error.email = 'The data entered is not valid';
  }
  if (!input.password) {
    error.password = 'data needed';
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.password)) {
    error.password = 'The data entered is not valid';
  }
  return error;
};
