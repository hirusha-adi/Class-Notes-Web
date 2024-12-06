import { Layout } from "../../components/Layout";
import { AccessControl } from "./components/AccessControl";

const Access = () => {
  return (
    <>
      <Layout
        pageTitle={"Access Control"}
        locationBreadcrumbs={["Notes", "Access Control"]}
      >
        <div className="mx-2 mt-3">
          {/* stuff */}
          <AccessControl />
        </div>
      </Layout>
    </>
  );
};

export { Access };
