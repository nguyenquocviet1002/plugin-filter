import React, { useEffect, useState } from "react";
import Label from "../Label";
import { removeAccented } from "../../utils/setup";
import itemStyled from './Item.module.scss';
import IMAGES from "../../Images/Images";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const Item = ({data, index}) => {
  const [isDropdown, setIsDropdown] = useState(true);
  const [level, setLevel] = useState([]);

  const {bo_luat, muc_do, lan_1, lan_2, lan_3, xu_ly} = data;

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

  useEffect(() => {
    function handleResize() {
      if(getWindowDimensions()['width'] < 768){
        setIsDropdown(false);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  }

  return (
    <div className={itemStyled['item']}>
      <div className={itemStyled['box']}>
        <Label label={bo_luat} value={bo_luat} />
        {isDropdown && (
          <>
            <Label value={level} />
            <Label label='Xử lý' value={xu_ly} />
            <Label value={muc_do} color={removeAccented(muc_do) === 'nghiem trong' ? 'critical' : removeAccented(muc_do) === 'nang' ? 'high' : removeAccented(muc_do)  === 'trung binh' ? 'medium' : 'low' }/>
          </>
        )}
      </div>
      <div className={`${itemStyled['btn']} ${isDropdown ? itemStyled['active'] : ''}`} onClick={handleDropdown}><img src={IMAGES.vectorDown} /></div>
    </div>
  );
};

export default Item;
