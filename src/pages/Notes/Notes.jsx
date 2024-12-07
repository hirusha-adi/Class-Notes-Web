import PropTypes from "prop-types";
import { useEffect } from "react";

import { NotesView } from "./Components/NotesView";

const Notes = ({ noteType }) => {
  useEffect(() => {
    document.title = noteType === "theory" ? `Theory Notes` : `Revision Notes`;
  });

  return (
    <>
      <NotesView
        fileName={noteType}
        postFix={noteType === "theory" ? "th" : "re"}
      />
    </>
  );
};

Notes.propTypes = {
  noteType: PropTypes.string.isRequired,
};

export { Notes };
