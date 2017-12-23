import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Warehouse e2e test', () => {

    let navBarPage: NavBarPage;
    let warehouseDialogPage: WarehouseDialogPage;
    let warehouseComponentsPage: WarehouseComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Warehouses', () => {
        navBarPage.goToEntity('warehouse-shp-mng');
        warehouseComponentsPage = new WarehouseComponentsPage();
        expect(warehouseComponentsPage.getTitle()).toMatch(/shopManagerApp.warehouse.home.title/);

    });

    it('should load create Warehouse dialog', () => {
        warehouseComponentsPage.clickOnCreateButton();
        warehouseDialogPage = new WarehouseDialogPage();
        expect(warehouseDialogPage.getModalTitle()).toMatch(/shopManagerApp.warehouse.home.createOrEditLabel/);
        warehouseDialogPage.close();
    });

    it('should create and save Warehouses', () => {
        warehouseComponentsPage.clickOnCreateButton();
        warehouseDialogPage.setAmountInput('5');
        expect(warehouseDialogPage.getAmountInput()).toMatch('5');
        warehouseDialogPage.setStaysInput('5');
        expect(warehouseDialogPage.getStaysInput()).toMatch('5');
        warehouseDialogPage.setModifiedInput(12310020012301);
        expect(warehouseDialogPage.getModifiedInput()).toMatch('2001-12-31T02:30');
        warehouseDialogPage.productSelectLastOption();
        warehouseDialogPage.save();
        expect(warehouseDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class WarehouseComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-warehouse-shp-mng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WarehouseDialogPage {
    modalTitle = element(by.css('h4#myWarehouseLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    amountInput = element(by.css('input#field_amount'));
    staysInput = element(by.css('input#field_stays'));
    modifiedInput = element(by.css('input#field_modified'));
    productSelect = element(by.css('select#field_product'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    }

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    }

    setStaysInput = function(stays) {
        this.staysInput.sendKeys(stays);
    }

    getStaysInput = function() {
        return this.staysInput.getAttribute('value');
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
