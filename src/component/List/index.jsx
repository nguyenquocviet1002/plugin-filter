import React, { useEffect, useState } from "react";
import Item from "../Item";
import listStyled from "./List.module.scss";

const List = (props) => {
  const { data, cate, show, index, search } = props;
  const [isDropdown, setIsDropdown] = useState(false);

  useEffect(() => {
    (show || index === 0) ? setIsDropdown(true) : setIsDropdown(false);
  }, [show])

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className={listStyled['list']}>
      {data.length > 0  && (
        <>
          <div className={`${listStyled['label']} ${isDropdown ? listStyled['active'] : ''}`} onClick={handleDropdown}><span className={listStyled['title']}>{cate}</span> {<span  className={listStyled['more']}>{!isDropdown ? 'Xem đầy đủ' : 'Thu gọn'}</span>}</div>
          {isDropdown && (
            <div className={listStyled['head']}>
              <div className={`${listStyled['col']} ${listStyled['col__1']}`}>Hành vi</div>
              <div className={`${listStyled['col']} ${listStyled['col__2']}`}>Mức độ xử lý</div>
              <div className={`${listStyled['col']} ${listStyled['col__3']}`}>Ghi chú</div>
              <div className={`${listStyled['col']} ${listStyled['col__4']}`}>Mức độ</div>
            </div>
          )}
          {isDropdown && data.map((item) => {
            return <Item data={item} key={item.stt} search={search} />;
          })}
        </>
      )}
    </div>
  );
};

export default List;
