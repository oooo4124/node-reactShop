/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import {USER_SERVER} from '../../../Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const menuHandler = (MenuItem) =>{
    if(MenuItem.key === 'logout'){
      logoutHandler();
    }else{
    navigate(MenuItem.key)
    }
  }

  const menuItems = [
    {
      key:'/login',
      label:'Signin'
    },
    {
      key:'/register',
      label:'Signup',
    }
  ];
  const loginMenuItems = [
    {
      key:'/product/upload',
      label:'Upload',
    },
    {
      key:'logout',
      label:'Logout',
    },
    
  ];
  if (user.userData && !user.userData.isAuth) {
    return (
      
      <Menu mode={props.mode} items={menuItems} onClick={menuHandler}>
        {/* <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item> */}
        
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode} items={loginMenuItems} onClick={menuHandler}>
        {/* <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item> */}
      </Menu>
    )
  }
}

export default RightMenu;