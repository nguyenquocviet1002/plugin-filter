import React, { useEffect, useState } from "react";
import Item from "../Item";
import listStyled from "./List.module.scss";

const List = (props) => {
  const { data, cate, show, index } = props;
  const [isDropdown, setIsDropdown] = useState(false);

  useEffect(() => {
    (show || index === 0) ? setIsDropdown(true) : setIsDropdown(false);
  }, [show])

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const indexCate = index;

  return (
    <div className={listStyled['list']}>
      {data.length > 0  && (
        <>
          <div className={`${listStyled['label']} ${isDropdown ? listStyled['active'] : ''}`} onClick={handleDropdown}><span className={listStyled['title']}>{cate}</span> {!isDropdown && <span  className={listStyled['more']}>Xem đầy đủ</span>}</div>
          {isDropdown && (
            <div className={listStyled['head']}>
              <div className={`${listStyled['col']} ${listStyled['col__1']}`}>Hành vi</div>
              <div className={`${listStyled['col']} ${listStyled['col__2']}`}>Mức độ xử lý</div>
              <div className={`${listStyled['col']} ${listStyled['col__3']}`}>Ghi chú</div>
              <div className={`${listStyled['col']} ${listStyled['col__4']}`}>Mức độ</div>
            </div>
          )}
          {isDropdown && data.map((item, index) => {
            return <Item data={item} key={item.stt} index={index} cate={indexCate} />;
          })}
        </>
      )}
    </div>
  );
};

export default List;
