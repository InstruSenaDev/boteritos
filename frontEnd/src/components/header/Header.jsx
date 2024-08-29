export const Header = ({ title }) => {
  return (
    <>
      <header className="w-full h-[100px] bg-white flex items-center px-8 font-cocogooseSemiLight text-subTitle text-darkBlue justify-between">
        {title}
        <div className="w-7 h-7 rounded-full bg-darkBlue flex justify-center items-center">
          <i className="fa-solid fa-bell text-white"></i>
        </div>
      </header>
    </>
  );
};
