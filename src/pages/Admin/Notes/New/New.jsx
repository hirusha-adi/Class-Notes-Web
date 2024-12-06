import { Layout } from "../../components/Layout";
import { NotesEditor } from "./components/NotesEditor";

const New = () => {
  return (
    <>
      <Layout pageTitle={"Edit Notes"} locationBreadcrumbs={["Notes", "New"]}>
        <div className="mx-2 mt-3">
          {/* stuff */}
          <NotesEditor />
        </div>
      </Layout>
    </>
  );
};

export { New };
