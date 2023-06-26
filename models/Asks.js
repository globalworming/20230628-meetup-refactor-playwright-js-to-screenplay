const Asks = {
  forOrderConfirmationMsg: async (actor) =>
    await actor.page.locator("text=Your order is confirmed"),

  forCartProducts: async (actor) => await actor.page.locator(".cart-products"),

  forOrderReference: async (actor) =>
    await actor.page.locator("#order-reference-value strong").textContent(),

  forBody: async (actor) => await actor.page.locator("body"),
};

module.exports = Asks;
