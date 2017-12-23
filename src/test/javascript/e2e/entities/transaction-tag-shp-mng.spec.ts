import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TransactionTag e2e test', () => {

    let navBarPage: NavBarPage;
    let transactionTagDialogPage: TransactionTagDialogPage;
    let transactionTagComponentsPage: TransactionTagComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TransactionTags', () => {
        navBarPage.goToEntity('transaction-tag-shp-mng');
        transactionTagComponentsPage = new TransactionTagComponentsPage();
        expect(transactionTagComponentsPage.getTitle()).toMatch(/shopManagerApp.transactionTag.home.title/);

    });

    it('should load create TransactionTag dialog', () => {
        transactionTagComponentsPage.clickOnCreateButton();
        transactionTagDialogPage = new TransactionTagDialogPage();
        expect(transactionTagDialogPage.getModalTitle()).toMatch(/shopManagerApp.transactionTag.home.createOrEditLabel/);
        transactionTagDialogPage.close();
    });

    it('should create and save TransactionTags', () => {
        transactionTagComponentsPage.clickOnCreateButton();
        transactionTagDialogPage.setValueInput('value');
        expect(transactionTagDialogPage.getValueInput()).toMatch('value');
        transactionTagDialogPage.setModifiedInput(12310020012301);
        expect(transactionTagDialogPage.getModifiedInput()).toMatch('2001-12-31T02:30');
        transactionTagDialogPage.transactionSelectLastOption();
        transactionTagDialogPage.save();
        expect(transactionTagDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TransactionTagComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-transaction-tag-shp-mng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TransactionTagDialogPage {
    modalTitle = element(by.css('h4#myTransactionTagLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    valueInput = element(by.css('input#field_value'));
    modifiedInput = element(by.css('input#field_modified'));
    transactionSelect = element(by.css('select#field_transaction'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setValueInput = function(value) {
        this.valueInput.sendKeys(value);
    }

    getValueInput = function() {
        return this.valueInput.getAttribute('value');
    }

    setModifiedInput = function(modified) {
        this.modifiedInput.sendKeys(modified);
    }

    getModifiedInput = function() {
        return this.modifiedInput.getAttribute('value');
    }

    transactionSelectLastOption = function() {
        this.transactionSelect.all(by.tagName('option')).last().click();
    }

    transactionSelectOption = function(option) {
        this.transactionSelect.sendKeys(option);
    }

    getTransactionSelect = function() {
        return this.transactionSelect;
    }

    getTransactionSelectedOption = function() {
        return this.transactionSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
