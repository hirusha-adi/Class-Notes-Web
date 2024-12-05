import { Layout } from "../../../components/Layout";
import { NewUserForm } from "./components/NewUserForm";

const New = () => {
  return (
    <>
      <Layout
        pageTitle={"New Students"}
        locationBreadcrumbs={["Users", "Students", "New"]}
      >
        <div className="mx-2 mt-3">
          <NewUserForm />
        </div>
      </Layout>
    </>
  );
};

export { New };
