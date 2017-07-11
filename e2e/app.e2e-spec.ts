import { TutorialPage } from './app.po';

describe('tutorial App', () => {
  let page: TutorialPage;

  beforeEach(() => {
    page = new TutorialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
