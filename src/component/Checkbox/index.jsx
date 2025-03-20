import React from "react";
import checkboxStyled from './Checkbox.module.scss';

const Checkbox = ({...props}) => {

  return (
    <div className={checkboxStyled['selected']}>
      <select className={checkboxStyled['select']} value={props.value} onChange={props.event}>
          {props.placeholder !== 'Nhóm lỗi' ? <option value="" disabled>{props.placeholder}</option> : <option value="">Xem tất cả</option>}
          {props.option.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
      </select>
    </div>
  );
};

export default Checkbox;
