import { Layout } from "./Layout";

export const ForgotLayout = ({ title, children }) => {
  return (
    <Layout title={title}>
            {children}
    </Layout>
  );
};
