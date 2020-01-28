import React, {useState} from 'react';
import { Item } from 'rc-menu';

const EventFilterBtn = (props) => {

  const handleClick = () => {
    const btns = document.getElementsByClassName('EventFilterBtn');
    Array.from(btns).forEach((btn) => {
      btn.className = 'EventFilterBtn';
    })
    setActive(!active)
  }

  const [active, setActive] = useState(false);
  return (
    <a onClick={handleClick} active={active} className={props.active?'EventFilterBtn EFB_active':'EventFilterBtn'}>
      {props.text}
    </a>
  );
}

export default EventFilterBtn;
