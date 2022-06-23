
export default class CookiesData {
    login: string | undefined;
    expiration: number | undefined;

    constructor(login: string | undefined, expiration: number | undefined) {
        this.login = login;
        this.expiration = expiration;
    }
}