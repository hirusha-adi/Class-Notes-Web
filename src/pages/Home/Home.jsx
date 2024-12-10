import { useEffect } from "react";
import { isUserLoggedIn, user } from "../../lib/backend";
import { Link } from "react-router-dom";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import SiteLogo from "../../assets/logo.svg"

const Home = () => {
  useEffect(() => {
    document.title = `Class Notes`;
  });

  return (
    <>
    {/* 
      background gradient magic
      -------------------------
      This block of css stolen from a template provided by tailwind
      break things up in this page
      maybe its because its not put inside a .relative div
      idk shit - maybe ill fix this later  
    */}
    {/* <div
        className="absolute inset-0 blur-3xl h-full"
        style={{
          background:
            "linear-gradient(145deg, rgba(255, 0, 0, 0) 20.79%, rgba(255, 69, 58, 0.26) 40.92%, rgba(255, 0, 0, 0) 70.35%)",
        }}
      ></div> */}
    <div className="hero min-h-screen pb-[20vh]">
      <div className="hero-content">
        <div>
          <div className="text-center mb-20">
            <div className="flex justify-center items-center w-52 mx-auto mt-12 mb-5">
              <img src={SiteLogo} alt="Logo" />
            </div>
            {isUserLoggedIn ? (
              <div>
                <div className="text-5xl font-bold">
                  Welcome back {user?.record?.name.split(" ")[0]}!
                </div>
                <div className="mb-6 italic text-gray-400">
                  ( You are logged in as {user?.record?.email} )
                </div>
                <p className="text-lg mb-6">
                  Click on the resources below to start reading.
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Class Notes / Resources.
                </h1>
                <p className="text-lg mb-6 text-gray-500 mt-8 md:w-[76%] md:mx-auto">
                  You can use this site to access and browse the notes easily.
                  You will get access to the notes after the lesson has been
                  taught in class. For any other requests or assistance, please
                  contact me at +94777662700. Below are the steps of what should
                  be done. Please follow them, and use the email address and the
                  password that I sent you.
                </p>
                <Link to={"/login"} className="btn">
                  Click here to Login
                </Link>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-1 ">
              <div className="text-2xl font-extrabold">Theory notes</div>
              <div className="mt-6">
                This material provides an in-depth understanding of the syllabus
                with detailed explanations, numerous examples, and coverage of
                all textbook content and past exam questions.
              </div>
              <div className="mt-6">
                <Link to={"/theory"} className="btn">
                  Theory notes <BoxArrowUpRight className="text-m" />{" "}
                </Link>
              </div>
            </div>
            <div className="col-span-1 ">
              <div className="text-2xl font-extrabold">Revision notes</div>
              <div className="mt-6">
                These focused summaries, also derived from past paper questions,
                are concise yet comprehensive, covering everything essential in
                a short and straightforward manner, perfect for quick review.
              </div>
              <div className="mt-6">
                <Link to={"/revision"} className="btn">
                  Revision notes <BoxArrowUpRight className="text-m" />{" "}
                </Link>
              </div>
            </div>
            <div className="col-span-1">
              <div className="text-2xl font-extrabold">Past papers</div>
              <div className="mt-6">
                Past papers include both normal and topical past papers, with
                answered and unanswered versions; this part is still under
                construction. Contact me at +94777662700 for further
                information.
              </div>
              <div className="mt-6">
                <div className="btn btn-ghost">Coming soon...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export { Home };
