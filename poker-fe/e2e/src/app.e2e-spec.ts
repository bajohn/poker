import { AppPage } from './app.po';
import { browser, logging, by, element, ElementFinder } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.waitForAngularEnabled(false); // fixes websocket trash
  });

  it('should create players', async () => {
    // Remember to start the node backend!
    await page.navigateTo();

    await element(by.buttonText('Create Game')).click();

    await element(by.buttonText('Add Player')).click();
    await element(by.buttonText('Add Player')).click();
    await element(by.buttonText('Add Player')).click();

    const playersArr = await element.all(by.css('.player-gen-container')) as ElementFinder[];
    console.log('players!', playersArr.length);
    expect(playersArr.length).toEqual(3);
    //const playerJoin = await playersArr[0].all(by.buttonText('Join'))[0] as ElementFinder;
    const resp = await element.all(by.css('.player-gen-container')).all(by.buttonText('Join'));
    console.log('RESPP', resp.length);
    resp[0].click();
    //playerJoin.click();
    // element(by.css('app-root .content span')).getText()

  });

  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('poker-fe app is running!');
  // });

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
