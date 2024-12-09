import { useEffect } from "react";
import { isUserLoggedIn } from "../../lib/backend";
import { Link } from "react-router-dom";
import { BoxArrowUpRight } from "react-bootstrap-icons";

const Home = () => {
  useEffect(() => {
    document.title = `Class Notes`;
  });

  return (
    <div className="hero min-h-screen pb-[20vh]">
      <div className="hero-content">
        <div>
          <div className="text-center mb-20">
            {isUserLoggedIn ? (
              <div>
                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-lg mb-6 text-gray-500">
                  Glad to see you again.
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Class Notes / Resources.
                </h1>
                <p className="text-lg mb-6 text-gray-500 mt-8">
                  You can use this site to access and browse the notes easily.
                  You will get access to the notes after the lesson has been
                  taught in class. For any other requests or assistance, please
                  contact me at +94777662700.
                  <br />
                  Below are the steps of what should be done. Please follow
                  them, and use the email address and the password that I sent
                  you.
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
  );
};

export { Home };
