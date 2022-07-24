import React from "react";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";

export default function DetailsDiv({
  title,
  details,
  dueDate,
  setOpenDetails,
  todoProject,
}) {
  return ReactDOM.createPortal(
    <div className="dark-overlay">
      <div className="details-div">
        <p>
          <span>
            <b>Title:</b>
          </span>{" "}
          {title}
          <CgClose
            className="exit"
            type="button"
            onClick={() => setOpenDetails(false)}
          >
            close
          </CgClose>
        </p>
        <p>
          <span>
            <b>Due Date:</b>
          </span>{" "}
          {dueDate}
        </p>
        <p>
          <span>
            <b>Project:</b>
          </span>{" "}
          {todoProject}
        </p>
        <p className="details-p">
          <span>
            <b>Details:</b>
          </span>
          {details}
        </p>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
