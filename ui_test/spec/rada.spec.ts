import puppeteer from 'puppeteer';
import puppeteerConfig from '../../puppeteer.config.json';
import { MainPage } from '../pages/mainPage';
import { SearchPage } from '../pages/searchPage';
import { ResultPage } from '../pages/resultPage';


describe('Rada test suits', () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    let mainPage: MainPage;
    let searchPage: SearchPage;
    let resultPage: ResultPage;

    beforeEach(async () => {
        browser = await puppeteer.launch(puppeteerConfig);
        page = await browser.newPage();

        mainPage = new MainPage(page);
        searchPage = new SearchPage(page);
        resultPage = new ResultPage(page);

        await mainPage.goToMainPage('https://rada.gov.ua/');
    })

    afterAll(async () => {
        await browser.close(); //after running all specifications
    });

    test('Search information by rada', async () => {
        const searchInput = 'Президент';
        const formCheck = 'Раніше ніж';
        const topic = 'Новини';
        const titleText = 'Верховна Рада України';

        await mainPage.goSearchPage();
        await searchPage.fillSearchTitle(searchInput);
        await searchPage.openSectionInput();
        await searchPage.selectTopic(topic);
        await searchPage.selectFormTitle(formCheck);
        await searchPage.clickSearch();

        console.log('Результатов поиска:', await resultPage.getResult());
        console.log('Результат лейбла видео:', await resultPage.getVideoLabel());
        expect(await resultPage.getText()).toEqual(titleText);
        expect(await resultPage.getWord()).toContain(searchInput);
    });
})