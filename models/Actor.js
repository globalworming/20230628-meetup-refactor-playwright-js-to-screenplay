import { test, expect } from "@playwright/test";
class Actor {
  constructor(page) {
    this.page = page;
  }

  /**
   *
   * @param action {Function}
   * @returns {Promise<void>}
   */
  attemptsTo = async (action) => {
    await test.step(this.camelToSnakeCase(action.name), async () => {
      await action(this);
    });
  };

  asksFor = async (question) =>
    await test.step(
      "asks " + this.camelToSnakeCase(question.name),
      async () => {
        return await question(this);
      }
    );

  camelToSnakeCase = (str) =>
    str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
  ensureThat = async (question, matcher, arg) => {
    await test.step(
      "actor ensures " +
        this.camelToSnakeCase(question.name) +
        " " +
        this.camelToSnakeCase(matcher) +
        "  " +
        arg,
      async () => {
        const actual = await this.asksFor(question);

        expect(actual)[matcher](arg);
      }
    );
  };

  memory = {
    product: "Hummingbird printed t-shirt",
    size: "L",
    shippingMethod: "My carrier",
    paymentMethod: "Pay by bank wire",
    adminPanelUrl: "localhost:8881/admdev",
  };

  remember = async (key, value) => {
    await test.step(`remember the ${key}`, async () => {
      this.memory[key] = value;
    });
  };
}
export default Actor;
