import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { RecursiveMenu } from "./components/RecursiveMenu";

const Home = () => {
  const [selectedCommand, setSelectedCommand] = useState("none");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = `Class Notes`;
  });

  useEffect(() => {
    const currentNote = searchParams.get("note");
    if (currentNote) {
      setSelectedCommand(currentNote);
    }
  }, [searchParams]);

  const handleItemClick = (resourceName) => {
    setSelectedCommand(resourceName);
    setSearchParams({ note: resourceName });
  };

  const jsonData = {
    title: "CIE O/L - Computer Science (Theory Notes)",
    menu: [
      {
        title: "Paper 1",
        type: "dir",
        children: [
          {
            title: "1. Hardware Devices",
            type: "dir",
            children: [
              {
                title: "Introduction",
                type: "doc",
                resource_name: "cie_ol_cs_th_1_hardware_devices_1_introduction",
              },
              {
                title: "Input Devices",
                type: "doc",
                resource_name:
                  "cie_ol_cs_th_1_hardware_devices_2_input_devices",
              },
            ],
          },
        ],
      },
    ],
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
            {selectedCommand && <p>Selected Command: {selectedCommand}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export { Home };
