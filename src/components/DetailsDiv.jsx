import React from "react";

export default function DetailsDiv({
  title,
  details,
  dueDate,
  setOpenDetails,
}) {
  return (
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
    </div>
  );
}
