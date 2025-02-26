import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import "./chatBaseLayout.scss";
import NavBar from "../../components/general/navBar/navBar";
import CompaniesList from "../../modals/companiesList/companiesList";
import CreateCompany from "../../modals/createCompany/createCompany";

const ChatBaseLayout: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children }) => {

  return (
    <div className="base-layout">
      <div>
        <NavBar />
      </div>
      <div className="base-layout-content">
        <div className="base-layout-container">
          {children ?? <></>}
        </div>
      </div>

      <CompaniesList />
      <CreateCompany />
    </div>
  );
};

export default ChatBaseLayout;
