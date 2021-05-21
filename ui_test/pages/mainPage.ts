import puppeteer from 'puppeteer';

export class MainPage {
    page: puppeteer.Page;

    searchButton = "input[type='submit']";

    constructor(page: puppeteer.Page) {
        this.page = page;
    }

    async goToMainPage(url: string) {
        await this.page.goto(url, {
            timeout: 0,
            waitUntil: ["load", "networkidle0"],
        });
    }

    async goSearchPage() {
        await this.page.waitForSelector(this.searchButton, { visible: true });

        await Promise.all([
            this.page.waitForNavigation({
                waitUntil: ["load", "networkidle0"],
            }),
            this.page.click(this.searchButton)
        ]);
    }
}