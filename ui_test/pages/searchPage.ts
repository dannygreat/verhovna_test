import puppeteer from 'puppeteer';

export class SearchPage {
    page: puppeteer.Page;

    searchTitleInput = "input[name='search']";
    sectionTitleInput = "//div[contains(text(), 'Усі розділи')]";
    sectionTitle = "//div[contains(@class, 'dropdown-menu show')]//div/ul/li[4]";
    formTitle = "//div[contains(@class, 'form-check display-inline')][2]";
    searchButton = "a.sendcomm";

    constructor(page: puppeteer.Page) {
        this.page = page;
    }

    async fillSearchTitle(message: string) {
        await this.page.type(this.searchTitleInput, message);
    }

    async fillSearchFields(searchTitle: string) {
        await (await this.page.waitForXPath(this.searchTitleInput)).click();
        await this.fillSearchTitle(searchTitle);
    }

    async openSectionInput() {
        await (await (this.page.waitForXPath(this.sectionTitleInput))).click();
    }

    async selectSectionInput() {
        await (await (this.page.waitForXPath(this.sectionTitle))).click();
    }

    async selectFormTitle() {
        await (await (this.page.waitForXPath(this.formTitle))).click();
    }

    async clickSearch() {
        const searchButton = await this.page.waitForSelector(this.searchButton);
        await Promise.all([
            this.page.waitForNavigation({
                waitUntil: ["load", "networkidle0"],
            }),
            searchButton.click()
        ]);
    }

}