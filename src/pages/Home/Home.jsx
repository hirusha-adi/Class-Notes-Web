import { useEffect } from "react";
import { RecursiveMenu } from "./RecursiveMenu";
import jsonData from "../../assets/sidebars/CIE-OL-CS-TH.json";

const Home = () => {
  useEffect(() => {
    document.title = `Class Notes`;
  });

  return <>Class Notes</>;
};

export { Home };
