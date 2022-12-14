/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Badge } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const menuHandler = (MenuItem) => {
    if (MenuItem.key === "logout") {
      logoutHandler();
    } else {
      navigate(MenuItem.key);
    }
  };

  if (user.userData && !user.userData.isAuth) {
    const menuItems = [
      {
        key: "/login",
        label: "Signin",
      },
      {
        key: "/register",
        label: "Signup",
      },
    ];
    return <Menu mode={props.mode} items={menuItems} onClick={menuHandler} />;
  } else {
    let loginMenuItems = [];
    {
      user.userData && user.userData.role === 1
        ? (loginMenuItems = [
            {
              key: "/product/upload",
              label: "Upload",
            },
            {
              key: "logout",
              label: "Logout",
            },
          ])
        : (loginMenuItems = [
            
            {
              key: "/history",
              label: "History",
            },
            {
              key: "/user/cart",
              label: (
                <Badge count={user.userData && user.userData.cart.length}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "25px", marginBottom: "3px" }}
                    
                  />
                </Badge>
              ),
            },
            {
              key: "logout",
              label: "Logout",
            },
          ]);
    }
    return (
      <Menu mode={props.mode} items={loginMenuItems} onClick={menuHandler} />
    );
  }
}

export default RightMenu;
