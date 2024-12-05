import { Layout } from "../../components/Layout";
import { CrudTable } from "./components/CrudTable";

const All = () => {
  return (
    <>
      <Layout pageTitle={"All Notes"} locationBreadcrumbs={["Notes", "All"]}>
        <div className="mx-2 mt-3">
          {/* stuff */}
          <CrudTable />
        </div>
      </Layout>
    </>
  );
};

export { All };
