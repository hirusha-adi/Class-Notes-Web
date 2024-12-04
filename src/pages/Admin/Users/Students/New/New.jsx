import { Layout } from "../../../components/Layout";

const New = () => {
  return (
    <>
      <Layout
        pageTitle={"New Students"}
        locationBreadcrumbs={["Users", "Students", "New"]}
      >
        <div className="m-12">Stuff</div>
      </Layout>
    </>
  );
};

export { New };
