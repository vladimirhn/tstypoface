
export default class Paths {

    static userPrefix = "/u";

    static consumables = Paths.userPrefix + "/consumables";
    static consumableItems = Paths.userPrefix + "/consumable_items";
    static consumableTypes = Paths.userPrefix + "/consumable_types";
    static consumableProperties = Paths.userPrefix + "/consumable_properties";
    static consumablePropertyValues = Paths.userPrefix + "/consumable_property_values";

    static purchasingConsumables = Paths.userPrefix + "/purchasing_consumables";

    static stockBalance = Paths.userPrefix + "/stock_balance";

    static orderSubjectsTypes = Paths.userPrefix + "/order_subjects_types";
    static orderSubjects = Paths.userPrefix + "/order_subjects";
    static orders = Paths.userPrefix + "/orders";
    static orders2 = Paths.userPrefix + "/orders2";

    static orderConsumables = Paths.userPrefix + "/order_consumable";

    static legalEntities = Paths.userPrefix + "/legal_entities";
    static enterprises = Paths.userPrefix + "/enterprises";
    static moneyMovements = Paths.userPrefix + "/money_movements";
    static financialTransactions = Paths.userPrefix + "/financial_transactions";
}