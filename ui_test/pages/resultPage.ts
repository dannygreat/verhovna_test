import puppeteer from 'puppeteer';

export class ResultPage {
    page: puppeteer.Page;

    searchResult = "//div[contains(text(), 'Результати')]";
    titleText = "//div[@id='header']//h1/a[contains(text(), 'Верховна Рада України')]";
    searchWord = "//div[contains(text(), 'Президент')]";
    videoResult = "span.btn-video";

    constructor(page: puppeteer.Page) {
        this.page = page;
    }

    async getResult() {
        await this.page.waitForXPath(this.searchResult);
        const num = await this.page.$x(this.searchResult);
        const value = await this.page.evaluate(el => el.innerText, num[0]);
        const res = value.replace(/\D/g, '')
        return res;
    }

    async getText() {
        await this.page.waitForXPath(this.titleText);
        const text = await this.page.$x(this.titleText);
        return await this.page.evaluate(el => el.innerText, text[0]);
    }

    async getWord() {
        await this.page.waitForXPath(this.searchWord);
        const word = await this.page.$x(this.searchWord);
        return await this.page.evaluate(wrd => wrd.innerText, word[0]);
    }

    async getVideoLabel() {
        await this.page.waitForSelector(this.videoResult);
        return (await this.page.$$(this.videoResult)).length;
    }
}
