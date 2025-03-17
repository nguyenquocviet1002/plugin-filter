import React from "react";
import tabsStyled from './Tabs.module.scss';

const Tabs = ({data, event, value}) => {
  return (
    <div className={tabsStyled['tabs']}>
        {data.map(item => <div className={`${tabsStyled['tab']} ${value === item ? tabsStyled['active'] : ''}`} key={item} onClick={event}>{item}</div>)}
    </div>
  )
};

export default Tabs;
