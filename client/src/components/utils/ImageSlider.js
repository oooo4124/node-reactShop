import { Carousel } from 'antd';
import React from 'react'

function ImageSlider(props) {

  return (
    <div>
        <Carousel autoplay>

        {props.images.map((image, index) =>(
            <div key={index}>
                <img style={{width:'100%', maxHeight:'150px', color:'#364d79'}}
                    src={`http://localhost:5000/${image}`}
                />
            </div>
        ))}
           
        </Carousel>

    </div>
  )
}

export default ImageSlider