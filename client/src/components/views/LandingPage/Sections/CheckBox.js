import React,{useState} from 'react'
import { Collapse, Checkbox } from 'antd'

const {Panel} = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        //선택한 것의 index를 구하고
        const currentIndex = Checked.indexOf(value)

        //전체 Checked된 State에서 현재 누른 Checkbox가 이미 있다면 빼주고 있다면 State에 넣어준다.
        const newChecked = [...Checked]

        //state 넣어주는 부분
        if(currentIndex === -1){
            newChecked.push(value)
        //빼는 부분
        }else{
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id)} 
                    checked={Checked.indexOf(value._id) === -1 ? false : true}/>
                <span>{value.name}</span>
        </React.Fragment>
    ))

  return (
    <div>
        <div>
          <Collapse defaultActiveKey={["0"]} >
            <Panel header="Continents" key="1">
                {renderCheckboxLists()}
                
            </Panel>
            
          </Collapse>
        </div>
    </div>
  )
}

export default CheckBox