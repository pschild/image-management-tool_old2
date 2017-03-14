import { ElectronAngularTestPage } from './app.po';

describe('electron-angular-test App', () => {
  let page: ElectronAngularTestPage;

  beforeEach(() => {
    page = new ElectronAngularTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
