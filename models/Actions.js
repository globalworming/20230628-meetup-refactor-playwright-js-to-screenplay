const Steps = require("./Steps");
const Asks = require("./Asks");

const Actions = {
  selectTheProductAndAddToCart: async (actor) => {
    await actor.attemptsTo(Steps.clickOnProduct);

    //Choose L size
    await actor.attemptsTo(Steps.selectProductSize);

    //Click Add to cart
    await actor.attemptsTo(Steps.clickBtn("Add to cart"));

    //Click Proceed to checkout x2
    await actor.attemptsTo(Steps.clickProceedToCheckoutModal);
  },

  goToCheckout: async (actor) => {
    //Check the basket for the item
    await actor.ensureThat(
      Asks.forCartProducts,
      "toContainText",
      "Hummingbird printed t-shirt"
    );
    await actor.attemptsTo(Steps.clickProceedToCheckout);
  },

  fillInfoAsNonRegisterUser: async (actor) => {
    await actor.remember("email", await Steps.generateRandomEmail());

    await actor.attemptsTo(await Steps.fillPersonalInformation);

    //Click continue
    await actor.attemptsTo(Steps.clickContinueBtn);
  },

  placeOrder: async (actor) => {
    //Fill Addresses
    await actor.attemptsTo(Steps.fillAddressesInfo);

    //Click continue
    await actor.attemptsTo(Steps.clickContinueBtn);

    //Shipping Method(Select My Carrier and add a comment in the order)
    await actor.attemptsTo(Steps.chooseShippingMethod);
    await actor.attemptsTo(Steps.addComment);

    //Click continue
    await actor.attemptsTo(Steps.clickContinueBtn);

    //Payment, select "Pay by Cash on Delivery"
    await actor.attemptsTo(Steps.choosePayment);

    //Click Place order
    await actor.attemptsTo(Steps.clickContinueBtn);

    await actor.remember(
      "reference",
      await actor.page.locator("#order-reference-value strong").textContent()
    );

    await actor.ensureThat(
      Asks.forOrderConfirmationMsg,
      "toContainText",
      "Your order is confirmed"
    );
    await actor.ensureThat(
      Asks.forOrderReference,
      "toBe",
      actor.memory.reference
    );
  },

  buyProductAsGuest: async (actor) => {
    await actor.attemptsTo(Actions.addToCartAndGoCheckout);

    await actor.attemptsTo(Actions.fillInfoAsNonRegisterUser);

    await actor.attemptsTo(Actions.placeOrder);
  },

  buyProductAsClient: async (actor) => {
    await actor.attemptsTo(Actions.addToCartAndGoCheckout);
    await actor.attemptsTo(Actions.placeOrder);
  },

  //GO to localhost:8881/admdev and sign-in admin panel.
  signInAsAdmin: async (actor) => {
    await actor.attemptsTo(Steps.navigateTo);

    await actor.page
      .getByLabel("Email address")
      .first()
      .fill("demo@prestashop.com");
    await actor.page.getByLabel("Password").first().fill("prestashop_demo");

    await actor.attemptsTo(Steps.clickBtn("Log in"));

    //await this.steps.clickBtn("Log in");
  },

  changeTheEmailSettings: async (actor) => {
    await actor.attemptsTo(Steps.changeEmailToSmtp);

    await actor.attemptsTo(Steps.clickBtn("Save"));
  },
  //Go to orders and change from "Awaiting bank wire payment" to "Payment accepted"
  changeThePaymentStatus: async (actor) => {
    await actor.attemptsTo(Steps.clickOnAdminMenu);
    await actor.attemptsTo(Steps.acceptPayment);
  },

  registerNewUser: async (actor) => {
    await actor.remember("email", await Steps.generateRandomEmail());

    await actor.page.click("a[title='Log in to your customer account']");
    await actor.attemptsTo(Steps.clickLink("I want to create an account"));

    await actor.attemptsTo(Steps.fillRegisterUserInputs);

    await actor.page.getByRole("button", { name: "Save" }).click();
  },
  addToCartAndGoCheckout: async (actor) => {
    await actor.attemptsTo(Actions.selectTheProductAndAddToCart);

    await actor.attemptsTo(Actions.goToCheckout);
  },

  acceptPaymentAsAdmin: async (actor) => {
    await actor.attemptsTo(Actions.signInAsAdmin);

    await actor.attemptsTo(Actions.changeTheEmailSettings);

    await actor.attemptsTo(Actions.changeThePaymentStatus);
  },

  goToEmailAndCheck: async (actor) => {
    await actor.page.goto("http://0.0.0.0:1080/");
    //Check the emails that have the email of the client, filter by "Payment accepted" and get the email number
    const emailNumber = await (
      await actor.page
        .getByRole("row", { name: `${actor.memory.email}` })
        .filter({ hasText: "Payment accepted" })
    ).getAttribute("data-message-id");

    await actor.page.goto(
      "http://0.0.0.0:1080/messages/" + emailNumber + ".plain"
    );

    await actor.page.waitForLoadState("domcontentloaded");
    await actor.ensureThat(
      Asks.forBody,
      "toContainText",
      actor.memory.reference
    );
    await actor.ensureThat(
      Asks.forBody,
      "toContainText",
      "successfully processed"
    );
  },
};
module.exports = Actions;
