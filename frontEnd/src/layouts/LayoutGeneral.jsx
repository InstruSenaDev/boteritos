import { Sidebar } from "../components/sidebar/Sidebar";
import { Layout } from "./Layout";
import { Header } from "../components/header/Header";


export const LayoutGeneral = ({titleHeader, children }) => {
  return (
    <>
      <Layout>
        <Sidebar/>
        <div className="w-full">
          <Header titulo={titleHeader} />
          <div className="px-5 sm:px-10 py-5 min-w-screen">
            {children}
          </div>
        </div>
      </Layout>
    </>
  );
};
