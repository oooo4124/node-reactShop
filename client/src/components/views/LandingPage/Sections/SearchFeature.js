import React, {useState} from 'react'
import { Input } from 'antd';

const { Search } = Input;



function SearchFeature(props) {
    

    const [SearchKeyword, setSearchKeyword] = useState("")

    const searchHandler = (event) => {
        setSearchKeyword(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

  return (
    <div>
      <Search
        placeholder="Search"
        allowClear
        onChange={searchHandler}
        style={{width: 200}}
        value={SearchKeyword}
      />
    </div>
  );
}

export default SearchFeature