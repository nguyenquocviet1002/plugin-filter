import React, { useEffect, useState } from "react";
import Label from "../Label";
import { removeAccented } from "../../utils/setup";
import itemStyled from './Item.module.scss';

const Item = ({data, index}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [level, setLevel] = useState([]);

  const {bo_luat, doi_tuong, muc_do, nhom_loi, lan_1, lan_2, lan_3, xu_ly} = data;

  useEffect(() => {
    if(lan_1){
      setLevel(prev => ([...prev, lan_1]));
    }
    if(lan_2){
      setLevel(prev => ([...prev, lan_2]));
    }
    if(lan_3){
      setLevel(prev => ([...prev, lan_3]));
    }
  }, [lan_1, lan_2, lan_3]);

  

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  }

  return (
    <div className={itemStyled['item']}>
      <div>
        <Label label="Nội dung" value={bo_luat} />
        {isDropdown && (
          <>
            <Label label="Đối tượng áp dụng" value={doi_tuong} />
            <Label label="Mức độ" value={muc_do} color={removeAccented(muc_do) === 'nghiem trong' ? 'critical' : removeAccented(muc_do) === 'nang' ? 'high' : removeAccented(muc_do)  === 'trung binh' ? 'medium' : 'low' }/>
            <Label label="Nhóm lỗi" value={nhom_loi} />
            <Label label="Mức phạt" value={level} />
            <Label label="Xử lý vi phạm nhiều lần/ Tình tiết tăng nặng" value={xu_ly} />
          </>
        )}
      </div>
      <div className={itemStyled['btn']} onClick={handleDropdown}>{isDropdown ? 'Thu gọn' : 'Chi tiết'}<span>&#10150;</span></div>
    </div>
  );
};

export default Item;
