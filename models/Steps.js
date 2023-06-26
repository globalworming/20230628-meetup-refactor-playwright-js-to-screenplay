const { test } = require("@playwright/test");

const Steps = {
  clickOnProduct: async (actor) =>
    await actor.page.click(`text=${actor.memory.product}`),

  selectProductSize: async (actor) =>
    await actor.page
      .locator(".product-variants-item  select")
      .selectOption(actor.memory.size),

  clickBtn: (btn) => {
    async function clickBtn(actor) {
      await actor.page.click(`text=${btn}`);
    }
    return clickBtn;
  },

  clickLink: (link) => {
    async function clickLink(actor) {
      await actor.page
        .locator(`a:visible`)
        .filter({ hasText: `${link}` })
        .click();
    }
    return clickLink;
  },

  clickContinueBtn: async (actor) => {
    await actor.page.locator('button:visible[type="submit"]').waitFor();
    await actor.page.click('button:visible[type="submit"]');
  },
  clickProceedToCheckout: async (actor) => {
    await actor.page.click(".card-body .btn-primary");
  },
  clickProceedToCheckoutModal: async (actor) =>
    await actor.page.click(
      `#blockcart-modal > div > div > div.modal-footer > a`
    ),

  fillPersonalInformation: async (actor) => {
    await actor.page.click("text=Mr.");
    await actor.page.getByLabel("First Name").fill("Diego");
    await actor.page.getByLabel("Last Name").fill("Rubio");
    await actor.page.getByLabel("Email").first().fill(actor.memory.email);
    await actor.page.click("label:text-matches('I agree*')");
    await actor.page.click("label:text-matches('Customer data*')");
  },

  generateRandomEmail: async () =>
    await test.step(`Generate random email`, async () => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < 5) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result + "@gmail.com";
    }),

  fillAddressesInfo: async (actor) => {
    await actor.page.getByLabel("Zip/Postal Code").fill("12345");

    await actor.page.locator("input[name='address1']").waitFor();

    await actor.page.getByLabel("Address").first().fill("Albanistr. 10b");

    await actor.page.getByLabel("City").fill("Munich");

    await actor.page.selectOption("select[name='id_state']", "Alabama");
  },

  chooseShippingMethod: async (actor) => {
    await actor.page.click(`text=${actor.memory.shippingMethod}`);
  },

  choosePayment: async (actor) => {
    await actor.page.click(`text=${actor.memory.paymentMethod}`);
    await actor.page.locator("label:text-matches('I agree*')").last().click();
  },
  addComment: async (actor) => {
    await actor.page
      .locator("label:text-matches('If you would like*')")
      .fill("This is just a test order, dont worry");
  },

  navigateTo: async (actor) => {
    await actor.page.goto(actor.memory.adminPanelUrl);
  },

  changeEmailToSmtp: async (actor) => {
    await actor.attemptsTo(Steps.clickOnAdminMenu);

    await actor.page.click("#subtab-AdminAdvancedParameters a");
    await actor.page.click("#subtab-AdminEmails a");
    await actor.page.click("text=Set my own SMTP parameters");
    await actor.page
      .getByRole("textbox", { name: "form_smtp_config_server input" })
      .fill("mailcatcher");
    await actor.page.getByLabel("Port").fill("1025");
  },

  clickOnAdminMenu: async (actor) => {
    await actor.page.waitForLoadState("domcontentloaded");
    const menu = await actor.page.locator(".js-mobile-menu").evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue("display");
    });
    //Check if the test is in mobile or desktop to select different menus
    menu === "flex"
      ? await actor.page.click(".js-mobile-menu")
      : await actor.page.click(".menu-collapse");
  },

  acceptPayment: async (actor) => {
    //await this.clickOnAdminMenu()
    await actor.page.locator("#subtab-AdminParentOrders").click();
    await actor.page.locator("#subtab-AdminOrders").click();

    await await actor.page
      .getByRole("row", { name: `${actor.memory.reference}` })
      .getByRole("button", { name: "Awaiting bank wire payment" })
      .click();
    await actor.page.click('button:visible[data-value="2"]');
  },

  fillRegisterUserInputs: async (actor) => {
    await actor.page.click("text=Mr.");
    await actor.page.getByLabel("First Name").fill("Diego");
    await actor.page.getByLabel("Last Name").fill("Rubio");
    await actor.page.getByLabel("Email").first().fill(actor.memory.email);
    await actor.page.getByLabel("Password").fill("headissue123");
    await actor.page.click("label:text-matches('Customer data*')");
  },
};
module.exports = Steps;
