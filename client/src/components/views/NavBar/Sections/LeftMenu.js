import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
 
  const items = [
    { label: <a href='/'>Home</a>, key: 'home' }, // remember to pass the key prop which is required
    // {
    //   label: 'Blogs',
    //   key: 'submenu',
    //   children: [
    //     {
    //       type:'group',
    //       label:'Item 1',
    //       children:[
    //         {
    //           label:'Option1',
    //           key:'setting:1'
    //         },
    //         {
    //           label:'Option2',
    //           key:'setting:2'
    //         }
    //       ]
    //     },
    //     {
    //       type:'group',
    //       label:'Item 2',
    //       children:[
    //         {
    //           label:'Option3',
    //           key:'setting:3'
    //         },
    //         {
    //           label:'Option4',
    //           key:'setting:4'
    //         }
    //       ]
    //     }
    //   ]
    // },
  ]
  return (
   <Menu mode={props.mode} items={items}/>
  )
}

export default LeftMenu;