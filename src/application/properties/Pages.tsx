import Page from "../../library/pages/Page";


import CreditsPage from "../pages/CreditsPage";
import StartPage from "../pages/StartPage";
import {EnterprisesPage} from "../pages/enterprises/EnterprisesPage";
import {MoneyMovementPage} from "../pages/enterprises/MoneyMovementPage";
import {ManageConsumablesPage} from "../pages/consumables/ManageConsumablesPage";
import {PurchaseConsumablesPage} from "../pages/purchasing/consumables/PurchaseConsumablesPage";
import {OrdersPage} from "../pages/orders/OrdersPage";
const Pages: Page[] = [

    Page.title("Старт")
        .withSubPage(Page.title("Главная").withWidget(<StartPage/>))
        .withSubPage(Page.title("О программе").withWidget(<CreditsPage/>)),

    Page.title("Предприятие")
        .withSubPage(Page.title("Моя типография").withWidget(<EnterprisesPage/>))
        .withSubPage(Page.title("Внос/снятие средств").withWidget(<MoneyMovementPage/>)),

    Page.title("Номенклатура")
        .withSubPage(Page.title("Расходные материалы").withWidget(<ManageConsumablesPage/>)),

    Page.title("Закупки")
        .withSubPage(Page.title("Закупка расходных материалов").withWidget(<PurchaseConsumablesPage/>)),

    Page.title("Заказы")
        .withSubPage(Page.title("Заказы").withWidget(<OrdersPage/>)),
]

export default Pages;