import React from 'react';
import '../../assets/statics/components/common/AvatarList.css';


const AvatarList = ({avatars}) => {

  return(
    <div className="AvatarList__wrapper">
      <ul className="AvatarList__list">
        {avatars.map((element) => <li className="AvatarList_avatar">{element}</li>)}
      </ul>
    </div>
  );
}

export default AvatarList;