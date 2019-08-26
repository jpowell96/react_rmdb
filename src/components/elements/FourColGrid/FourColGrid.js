import React from "react";
import PropTypes from "prop-types";
import "./FourColGrid.css";

const FourColGrid = props => {
  const renderElements = () => {
    const gridElements = props.children.map((child, i) => {
      return (
        <div key={i} tabIndex="0" className="rmdb-grid-element">
          {child}
        </div>
      );
    });
    return gridElements;
  };

  return (
    <div>
      <h1>{props.header && !props.loading ? props.header : null}</h1>
      <div className="rmdb-grid-content">{renderElements()}</div>
    </div>
  );
};

FourColGrid.propTypes = {
  header: PropTypes.string,
  loading: PropTypes.bool
};

export default FourColGrid;
