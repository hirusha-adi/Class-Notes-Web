import { Layout } from "../../../components/Layout";
import { CrudTable } from "./components/CrudTable";

const All = () => {
  return (
    <>
      <Layout
        pageTitle={"All Students"}
        locationBreadcrumbs={["Users", "Students", "All"]}
      >
        <div className="mx-2 mt-3">
          {/* stuff */}
          <CrudTable />
        </div>
      </Layout>
    </>
  );
};

export { All };
