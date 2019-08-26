import React from "react";
import { IMAGE_BASE_URL } from "../../../config";

import "./Actor.css";

const Actor = props => {
  const ACTOR_POSTER_SIZE = "w154";
  return (
    <div className="rmdb-actor">
      <img
        src={
          props.actor.profile_path
            ? `${IMAGE_BASE_URL}${ACTOR_POSTER_SIZE}${props.actor.profile_path}`
            : "./images/no_image.jpg"
        }
        alt={`Profile pic of ${props.actor.name}`}
      />
      <span className="rmdb-actor-character">{props.actor.character}</span>
      <span className="rmdb-actor-name">{props.actor.name}</span>
    </div>
  );
};

export default Actor;
