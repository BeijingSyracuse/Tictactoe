import React from "react";

const Square = (props) => {
  return (
    <button className="square" value={props.value}>
      {props.player}
    </button>
  );
};

export default Square;
