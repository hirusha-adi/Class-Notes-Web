import { Layout } from "../../../components/Layout";

const All = () => {
  return (
    <>
      <Layout
        pageTitle={"All Students"}
        locationBreadcrumbs={["Users", "Students", "All"]}
      >
        <div className="m-12">Stuff</div>
      </Layout>
    </>
  );
};

export { All };
