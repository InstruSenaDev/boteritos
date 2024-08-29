import { Layout } from "./Layout";

export const ForgotLayout = ({title, titulo}) => {
  return (
    <Layout title={title}>
      <main className="w-full h-screen flex justify-center items-center p-4 text-black">
        <form
          action=""
          className="bg-white md:p-20 p-7 flex gap-20 rounded-xl shadow-[0_0_20px_0px_rgba(94,175,232,0.5)]"
        >
          <div className="max-h-96 max-w-[520px] w-full md:block hidden">
            <slot name="imagen" />
          </div>

          <div className="flex flex-col gap-7 max-w-[400px] w-full order-3">
            <h1 className="text-title font-cocogooseRegular tracking-normal text-darkBlue">
              {titulo}
            </h1>
            <slot name="text" />
            <slot name="inputs" />
            <slot name="footer" />
            <slot name="boton" />
            <div className="flex justify-center ">
              <slot name="return" />
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
};
