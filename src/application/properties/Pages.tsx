import Page from "../../library/pages/Page";


import CreditsPage from "../pages/CreditsPage";
import StartPage from "../pages/StartPage";
import {EnterprisesPage} from "../pages/enterprises/EnterprisesPage";
const Pages: Page[] = [

    Page.title("Старт")
        .withSubPage(Page.title("Главная").withWidget(<StartPage/>))
        .withSubPage(Page.title("О программе").withWidget(<CreditsPage/>)),

    Page.title("Предприятие")
        .withSubPage(Page.title("Моя типография").withWidget(<EnterprisesPage/>))
        // .withSubPage(Page.title("Внос/снятие средств").withWidget(<MoneyMovementPage/>)),
]

export default Pages;