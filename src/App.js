
import React, { useState, useEffect } from 'react';


import logo from './logo.svg';
import './App.css';


import axios from "axios";






function App() {


  //login and pass for kay 
  const loginData = {
    username: "templatesgold",
    password: "3&pMz#5Zuwod&fCWzS"
  };
  axios.post('http://localhost/mywp/templatesgold/wp-json/jwt-auth/v1/token', loginData)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_nicename', res.data.user_nicename);
      localStorage.setItem('user_email', res.data.user_email);
      localStorage.setItem('user_display_name', res.data.user_display_name);
    })
    .catch((err) => {
      console.log(err);
    });




  //GET all praducts in page
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Замените URL на ваш API
        const response = await axios.get('http://localhost/mywp/templatesgold/wp-json/cpt/v1/getproducts');
        const resultData = response.data['posts'];

        // Используем forEach для обработки каждого элемента
        resultData.forEach(item => {
          // Делаем что-то с каждым элементом, например, выводим в консоль
          console.log(item);
        });

        setData(resultData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);



  //update title value and concnt for create
  const [createtitle, setCreatetitle] = useState('');
  const createTitle = (event) => {
    setCreatetitle(event.target.value);
  };
  const [createcontent, setCreatecontent] = useState('');
  const createContent = (event) => {
    setCreatecontent(event.target.value);
  };

  //Creact praduct
  function clickCreateproduct(e) {
    const formdata = {
      title: e.currentTarget.title,
      content: e.currentTarget.content,
      status: 'publish'
    };

    axios.post('http://localhost/mywp/templatesgold/wp-json/wp/v2/product/', formdata, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      });
  }


  // Edite Update praduct
  function clickUpdate(e) {
    const id = e.currentTarget.id;
    const formdata = {
      title: e.currentTarget.title,
      status: 'publish'
    };
    axios.post('http://localhost/mywp/templatesgold/wp-json/wp/v2/product/' + id, formdata, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //update title value and button for delete
  const [message, setMessage] = useState('');
  const changeTitle = (event) => {
    setMessage(event.target.value);
  };

  //delete praduct
  function clickDelete(e) {
    const id = e.currentTarget.id;

    axios.delete('http://localhost/mywp/templatesgold/wp-json/wp/v2/product/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input
            className="createtitle"
            type="text"
            placeholder='title'
            value={createtitle}
            onChange={createTitle}
          />
          <input
            className="createcontent"
            type="text"
            placeholder='content'
            value={createcontent}
            onChange={createContent}
          />
          <button
            onClick={clickCreateproduct}
            title={createtitle}
            content={createcontent}
          >Creact Product</button>
        </div>
        <ul>
          {data.map(item => (
            <li key={item.id}>
              {item.post_title}
              <div>
                <input
                  tyepe="text"
                  placeholder='Title'
                  id={item.ID}
                  name={item.ID}
                  value={message}
                  onChange={changeTitle}
                />
                <button
                  title={message}
                  id={item.ID}
                  onClick={clickUpdate}
                >Update</button>
              </div>
              <button
                id={item.ID}
                onClick={clickDelete} >Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div >
  );
}

export default App;
