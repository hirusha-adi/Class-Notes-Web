import { useEffect, useState } from "react";

const Home = () => {
  useEffect(() => {
    document.title = `Class Notes`;
  });

  const [selectedCommand, setSelectedCommand] = useState("move");

  return (
    <>
      <div className="flex flex-col md:flex-row mt-2">
        {/* Left (Desktop) / Top (Mobile) */}
        <div className="px-2 mx-2 mb-2 w-full md:w-auto">
          <div className="bg-base-200 rounded-box w-full md:w-64 overflow-y-auto overflow-x-hidden h-[82vh] max-h-[82vh] min-h-[82vh]">
            <ul className="menu">
              <div className="menu-title text-lg text-gray-800">Notes List</div>
              <li>
                <details>
                  <summary>CIE O/L</summary>
                  <ul>
                    <li>
                      <a onClick={() => setSelectedCommand("move")}>/move</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>Crypto</summary>
                  <ul>
                    <li>
                      <a onClick={() => setSelectedCommand("btc")}>/btc</a>
                    </li>
                    <li>
                      <a onClick={() => setSelectedCommand("eth")}>/eth</a>
                    </li>
                  </ul>
                </details>
              </li>
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
          <div className="prose min-w-full max-w-full w-full">Hello</div>
        </div>
      </div>
    </>
  );
};

export { Home };
