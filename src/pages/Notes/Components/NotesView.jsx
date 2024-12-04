import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { user } from "../../../lib/backend";
import { RecursiveMenu } from "./RecursiveMenu";
import jsonData from "../../../assets/sidebars/CIE-OL-CS-TH.json";
import { getNote } from "../../../lib/backend";

const NotesView = ({ postFix }) => {
  const [selectedResource, setSelectedResource] = useState("intro");
  const [pageContent, setPageContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sidebarFile = `${user.record?.sujbect}-${postFix}.json`;

  useEffect(() => {
    // code
  }, [sidebarFile]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const note = await getNote(selectedResource);
        console.log(note.resources);
        setPageContent(note);
      } catch (error) {
        let eMsg;
        if (error.status === 400) {
          eMsg = "Please report this: Authentical Error! (400: Bad Request)";
        } else if (error.status === 404) {
          eMsg = "You do not have permissions to view this note!";
        } else {
          eMsg = `An unexpected error occurred. Please try again later. (Error Code: ${error.status})`;
        }
        setError(eMsg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [selectedResource]);

  const handleItemClick = (resourceName) => {
    setSelectedResource(resourceName);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row mt-2">
        {/* Left (Desktop) / Top (Mobile) */}
        <div className="px-2 mx-2 mb-2 w-full md:w-auto">
          <div className="bg-base-200 rounded-box w-full md:w-64 overflow-y-auto overflow-x-hidden h-[82vh] max-h-[82vh] min-h-[82vh]">
            <ul className="menu">
              <div className="menu-title text-lg text-gray-800">
                {jsonData.title}
              </div>
              <RecursiveMenu
                menu={jsonData.menu}
                onItemClick={handleItemClick}
              />
            </ul>
          </div>
        </div>

        {/* Right (Desktop) / Bottom (Mobile) */}
        <div className="bg-base-100 p-4 rounded-box flex-1 px-5 h-[82vh] max-h-[82vh] min-h-[82vh]">
          {isLoading ? (
            <div className="flex justify-center items-center h-[80vh]">
              <span className="loading loading-spinner text-error"></span>
            </div>
          ) : (
            <>
              {error ? (
                <>
                  <div className="flex items-center justify-center min-w-full w-full h-[70vh]">
                    <p className="text-center text-gray-700">
                      You do not have permissions to view these notes!
                    </p>
                  </div>
                </>
              ) : (
                <div className="prose min-w-full max-w-full w-full h-[80vh] overflow-y-scroll">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {pageContent?.note}
                  </Markdown>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

NotesView.propTypes = {
  postFix: PropTypes.string.isRequired,
};

export { NotesView };
