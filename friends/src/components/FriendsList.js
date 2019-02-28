import React from 'react';

const FriendsList = props => {
  return (
    <div>
    {props.friends.map( friend => 
      <div key={friend.id} > 
      <p>{friend.name}</p>
      <p>{friend.age}</p>
      <p>{friend.email}</p>
      <button onClick={ e => props.delete(e, friend.id)}> X </button>
      <button onClick={ e => props.setUpdate(e, friend)}> Update </button>
      </div>
    )}
    </div>
  );
}

export default FriendsList;