import { ScrumPokerFrontendPage } from './app.po';

describe('scrum-poker-frontend App', () => {
  let page: ScrumPokerFrontendPage;

  beforeEach(() => {
    page = new ScrumPokerFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
