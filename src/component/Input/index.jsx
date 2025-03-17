import React, {useRef, useState, useEffect} from "react";
import inputStyled from './Input.module.scss';
import { shuffle } from "../../utils/setup";

const Input = ({...props}) => {
  const [isDropdown, setIsDropdown] = useState(false);
  
  const refDoctor = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (refDoctor.current && !refDoctor.current.contains(event.target)) {
        setIsDropdown(false)
      } else{
        return;
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refDoctor]);

  return (
    <div className={inputStyled['bar']} ref={refDoctor}>
        <input type="text" className={inputStyled['input']} placeholder={props.placeholder} onChange={props.event} onClick={() => setIsDropdown(true)} value={props.value} />
        {isDropdown && (
          <div className={inputStyled['dropdown']}>
           {shuffle(props.dropdown).slice(0, 5).map(item => <div className={inputStyled['item']} key={item} onClick={() => {props.handleDropdown(item); setIsDropdown(false)}}>{item}</div>)}
          </div>
        )}
      </div>
  );
};

export default Input;
