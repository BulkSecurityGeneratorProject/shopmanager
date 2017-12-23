import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Product e2e test', () => {

    let navBarPage: NavBarPage;
    let productDialogPage: ProductDialogPage;
    let productComponentsPage: ProductComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product-shp-mng');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle()).toMatch(/shopManagerApp.product.home.title/);

    });

    it('should load create Product dialog', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage = new ProductDialogPage();
        expect(productDialogPage.getModalTitle()).toMatch(/shopManagerApp.product.home.createOrEditLabel/);
        productDialogPage.close();
    });

    it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage.setLabelInput('label');
        expect(productDialogPage.getLabelInput()).toMatch('label');
        productDialogPage.setBuyingPriceInput('5');
        expect(productDialogPage.getBuyingPriceInput()).toMatch('5');
        productDialogPage.setModifiedInput(12310020012301);
        expect(productDialogPage.getModifiedInput()).toMatch('2001-12-31T02:30');
        productDialogPage.save();
        expect(productDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product-shp-mng div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductDialogPage {
    modalTitle = element(by.css('h4#myProductLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    labelInput = element(by.css('input#field_label'));
    buyingPriceInput = element(by.css('input#field_buyingPrice'));
    modifiedInput = element(by.css('input#field_modified'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLabelInput = function(label) {
        this.labelInput.sendKeys(label);
    }

    getLabelInput = function() {
        return this.labelInput.getAttribute('value');
    }

    setBuyingPriceInput = function(buyingPrice) {
        this.buyingPriceInput.sendKeys(buyingPrice);
    }

    getBuyingPriceInput = function() {
        return this.buyingPriceInput.getAttribute('value');
    }

    setModifiedInput = function(modified) {
        this.modifiedInput.sendKeys(modified);
    }

    getModifiedInput = function() {
        return this.modifiedInput.getAttribute('value');
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
