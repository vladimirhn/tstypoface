import Page from "../../library/pages/Page";


import CreditsPage from "../pages/CreditsPage";
import StartPage from "../pages/StartPage";
const Pages: Page[] = [

    Page.title("Старт")
        .withSubPage(Page.title("Главная").withWidget(<StartPage/>))
        .withSubPage(Page.title("О программе").withWidget(<CreditsPage/>)),
]

export default Pages;