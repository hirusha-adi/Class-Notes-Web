import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { RecursiveMenu } from "./RecursiveMenu";
import jsonData from "../../../assets/sidebars/CIE-OL-CS-TH.json";
import { getNote } from "../../../lib/backend";

const NotesView = ({ fileName, postFix }) => {
  const [selectedResource, setSelectedResource] = useState("intro");
  const [pageContent, setPageContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const noteUrl = `${fileName}-${postFix}.md`;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const note = await getNote(noteUrl);
      } catch {
        let errorMessage;
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [selectedResource]);

  getNote("cie_ol_cs_th_1_hardware_devices_1_introduction");

  const handleItemClick = (resourceName) => {
    setSelectedResource(resourceName);
    console.log("Selected Resource:", resourceName);
  };

  console.log(noteUrl);

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
          {/* {isLoading ? (
            <div className="flex justify-center items-center h-80">
              <span className="loading loading-spinner text-error"></span>
            </div>
          ) : (
            <>
              {error ? (
                `An error occured. Please try refreshing the page! ${error}`
              ) : (
                <div className="prose min-w-full max-w-full w-full">
                  <Markdown remarkPlugins={[remarkGfm]}>{rawContent}</Markdown>
                </div>
              )}
            </>
          )} */}
          <div className="prose min-w-full max-w-full w-full">
            {selectedResource && <p>Selected Resource: {selectedResource}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

NotesView.propTypes = {
  fileName: PropTypes.string.isRequired,
  postFix: PropTypes.string.isRequired,
};

export { NotesView };
