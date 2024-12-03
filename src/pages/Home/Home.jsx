import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = `Class Notes`;
  });

  return <>Class Notes</>;
};

export { Home };
