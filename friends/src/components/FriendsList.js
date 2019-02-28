import React from 'react';

const FriendsList = props => {
  return (
    <div>
    {props.friends.map( friend => 
      <div key={friend.id} > 
      <p>{friend.name}</p>
      <p>{friend.age}</p>
      <p>{friend.email}</p>
      </div>
    )}
    </div>
  );
}

export default FriendsList;