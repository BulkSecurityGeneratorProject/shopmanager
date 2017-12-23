import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Transaction e2e test', () => {

    let navBarPage: NavBarPage;
    let transactionDialogPage: TransactionDialogPage;
    let transactionComponentsPage: TransactionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Transactions', () => {
        navBarPage.goToEntity('transaction-shp-mng');
        transactionComponentsPage = new TransactionComponentsPage();
        expect(transactionComponentsPage.getTitle()).toMatch(/shopManagerApp.transaction.home.title/);

    });

    it('should load create Transaction dialog', () => {
        transactionComponentsPage.clickOnCreateButton();
        transactionDialogPage = new TransactionDialogPage();
        expect(transactionDialogPage.getModalTitle()).toMatch(/shopManagerApp.transaction.home.createOrEditLabel/);
        transactionDialogPage.close();
    });

    it('should create and save Transactions', () => {
        transactionComponentsPage.clickOnCreateButton();
        transactionDialogPage.typeSelectLastOption();
        transactionDialogPage.setAmountInput('5');
        expect(transactionDialogPage.getAmountInput()).toMatch('5');
        transactionDialogPage.setModifiedInput(12310020012301);
        expect(transactionDialogPage.getModifiedInput()).toMatch('2001-12-31T02:30');
        transactionDialogPage.productSelectLastOption();
        transactionDialogPage.save();
        expect(transactionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TransactionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-transaction-shp-mng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TransactionDialogPage {
    modalTitle = element(by.css('h4#myTransactionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    typeSelect = element(by.css('select#field_type'));
    amountInput = element(by.css('input#field_amount'));
    modifiedInput = element(by.css('input#field_modified'));
    productSelect = element(by.css('select#field_product'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    }

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    }
    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    }

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    }

    setModifiedInput = function(modified) {
        this.modifiedInput.sendKeys(modified);
    }

    getModifiedInput = function() {
        return this.modifiedInput.getAttribute('value');
    }

    productSelectLastOption = function() {
        this.productSelect.all(by.tagName('option')).last().click();
    }

    productSelectOption = function(option) {
        this.productSelect.sendKeys(option);
    }

    getProductSelect = function() {
        return this.productSelect;
    }

    getProductSelectedOption = function() {
        return this.productSelect.element(by.css('option:checked')).getText();
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
