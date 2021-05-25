import puppeteer from 'puppeteer';
import { textChangeRangeIsUnchanged } from 'typescript';

export class SearchPage {
    page: puppeteer.Page;

    searchTitleInput = "input[name='search']";
    sectionTitleInput = "//div[contains(text(), 'Усі розділи')]";
    sectionTitle = (text: string) => `//div[contains(@class, 'dropdown-menu show')]//a//span[contains(text(), "${text}")]`;
    formCheck = (text: string) => `//div[contains(@class, 'form-check display-inline')]//label[contains(text(), "${text}")]`;
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

    async selectTopic(topic: string) {
        await (await (this.page.waitForXPath(this.sectionTitle(topic)))).click();
    }

    async selectFormTitle(form: string) {
        await (await (this.page.waitForXPath(this.formCheck(form)))).click();
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