import { test } from "@playwright/test";
import Actions from "../models/Actions";
import Actor from "../models/Actor";

test.describe("Compliance", async () => {
  let page;
  let actor;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(`${process.env.BASE_URL}`);
    actor = new Actor(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.describe("Tests PrestaShop", async () => {
    test("Should be able to buy a product", async () => {
      await actor.attemptsTo(Actions.buyProductAsGuest);

      //Going to admin panel and changing payment status
      await actor.attemptsTo(Actions.acceptPaymentAsAdmin);

      //Ensuring the Order reference is in the most recent email
      await actor.attemptsTo(Actions.goToEmailAndCheck);
    });
    test("Should be able to register as new client and buy a product", async () => {
      //Register new user
      await actor.attemptsTo(Actions.registerNewUser);

      //Place the order as Register User
      await actor.attemptsTo(Actions.buyProductAsClient);

      //Going to admin panel and changing payment status
      await actor.attemptsTo(Actions.acceptPaymentAsAdmin);

      //Ensuring the Order reference is in the most recent email
      await actor.attemptsTo(Actions.goToEmailAndCheck);
    });
  });
});
