import React from "react";
import { CgClose } from "react-icons/cg";

function FileEmbed({
  isEmbedOpen,
  setIsEmbedOpen,
  fetchFileUrl,
  embedClass,
  fileTitle,
  embedGridClass,
}) {
  return (
    <>
      {isEmbedOpen && (
        <div className={embedGridClass}>
          <iframe className={embedClass} src={fetchFileUrl}>
            link test{" "}
          </iframe>
          <h1>
            "{fileTitle}"{" "}
            <button type="button" onClick={() => setIsEmbedOpen(false)}>
              <CgClose />
            </button>
          </h1>
        </div>
      )}
    </>
  );
}

export default FileEmbed;
