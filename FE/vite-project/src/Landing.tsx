import { Main } from "./components/MainLanding.tsx";
import { SideBar } from "./components/SidebarLanding.tsx";

export const Landing = () => {
  return (
    <div className="flex">
      <SideBar />
      <Main />
    </div>
  );
};


