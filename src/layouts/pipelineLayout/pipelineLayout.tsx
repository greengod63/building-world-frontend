import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import "./pipelineLayout.scss";
import NavBar from "../../components/general/navBar/navBar";
import Header from "../../components/general/header/header";
import CompaniesList from "../../modals/companiesList/companiesList";
import CreateCompany from '../../modals/createCompany/createCompany';
import InputField from "../../components/general/inputField/inputField";
import { addPipelineIcon } from "../../assets/pipelineIcons";

const PipelineLayout: FC<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children }) => {

    return (
        <div className="pipeline-layout">
            <div>
                <NavBar />
            </div>

            <div className="pipeline-layout-content">
                <div className="header-with-searchbar">
                    <div className="middle-searcBar">
                        <InputField type="text" name="search-pipeline" placeholder="Search" isSearch={true} />
                        <div className="addIcon">{addPipelineIcon}</div>
                    </div>
                    <Header />
                </div>

                <div className="pipeline-layout-container">
                    {children ?? <></>}
                </div>
            </div>
            <CompaniesList />
            <CreateCompany />
        </div>
    );
};

export default PipelineLayout;
