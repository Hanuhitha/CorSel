import React from "react";
import "./Cards.css";

export const Card = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  link,
  height,
  width,
}) => {
  return ( 
    <div className="card-container" style={{height:height, width:width }}>
      {imgSrc && imgAlt && (
        <img className="card-image" src={imgSrc} alt={imgAlt}  />
      )}
      {title && <h3 className="card-title">{title}</h3>}

      {description && 
      <p className="card-description">{description}</p>
      //  list of courses
      
      }


      {buttonText && link && (
        <a href={link} className="card-btn">
          {buttonText}
        </a>
      )}
    </div>

  
  );
};