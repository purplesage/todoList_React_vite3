import React from "react";
import ReactDOM from "react-dom";

export default function DetailsDiv({
  title,
  details,
  dueDate,
  setOpenDetails,
}) {
  return ReactDOM.createPortal(
    <div className="details-div">
      <p>
        Title:
        {title}
      </p>
      <p>
        Details:
        {details}
      </p>
      <p>
        Due Date:
        {dueDate}
      </p>
      <button type="button" onClick={() => setOpenDetails(false)}>
        close
      </button>
    </div>,
    document.getElementById("portal")
  );
}
