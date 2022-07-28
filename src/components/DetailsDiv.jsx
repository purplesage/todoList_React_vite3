import React from "react";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";
import styles from "../styles/modules/detailsDiv.module.css";

export default function DetailsDiv({
  title,
  details,
  dueDate,
  setOpenDetails,
  todoProject,
}) {
  return ReactDOM.createPortal(
    <div className="dark-overlay">
      <div className={styles.detailsDiv}>
        <p>
          <span>
            <b>Title:</b>
          </span>{" "}
          {title}
          <CgClose
            className={styles.exit}
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
        <p className={styles.detailsP}>
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
