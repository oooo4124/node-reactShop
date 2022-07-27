import React, {useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';


const { Title } = Typography;
const {TextArea} = Input;


const Continents = [
    {key: 1, value:"Africa"},
    {key: 2, value:"Europe"},
    {key: 3, value:"Asia"},
    {key: 4, value:"North America"},
    {key: 5, value:"South America"},
    {key: 6, value:"Australia"},
    {key: 7, value:"Antarctica"}
]

function UploadProductPage(props) {
    
    const navigate = useNavigate();

    const [ProdTitle, setProdTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])
    const user = useSelector((state) => state.user);

    const titleChangeHandler = (event) => {
        setProdTitle(event.currentTarget.value)

    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)

    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)

    }
    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)

    }
    
    //refreshFunction으로 FileUpload에서 데이터 가져오는 부분
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault(); // 확인 눌렀을 때 자동적으로 페이지가 refresh 되지 않음
        //간단한 유효성 체크
        if(!ProdTitle || !Description || !Price || !Continent || Images.length === 0){
            return alert("모든 값을 입력해주세요.")
        }

        //서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID
            writer: user.userData._id,
            title: ProdTitle,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent

        }
        Axios.post("/api/product", body)
        .then(response => {
            if(response.data.success){
                alert('상품 업로드 성공')
                navigate('/')
            }else{
                alert('상품 업로드 실패')
            }
        })


    }

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom: '2rem'}}>
            <Title level={2}>여행 상품 업로드</Title>
        </div>

        <Form onSubmitCapture={submitHandler}>
            {/*DropZone */}
            <FileUpload refreshFunction={updateImages}/>

            <br/>
            <br/>
            <label>이름</label>
            <Input value={ProdTitle} onChange={titleChangeHandler}/>
            <br/>
            <br/>
            <label>설명</label>
            <TextArea value={Description} onChange={descriptionChangeHandler}/>
            <br/>
            <br/>
            <label>가격</label>
            <Input type="number" value={Price} onChange={priceChangeHandler}/>
            <br/>
            <br/>
            <select onChange={continentChangeHandler} value={Continent}>
                {Continents.map(item=>(
                    <option key={item.key} value={item.key}>{item.value}</option>
                ))}
            </select>
            <br/>
            <br/>
            <Button type='primary' htmlType='submit'>확인</Button>
        </Form>

    </div>
  )
}

export default UploadProductPage