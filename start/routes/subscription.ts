import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "SubscriptionsController.find");
  Route.get("/:id", "SubscriptionsController.find");
  Route.get(
    "/customer/:customer_id",
    "SubscriptionsController.findSubscriptionByCustomer",
  );
  Route.get("/plan/:plan_id", "SubscriptionsController.findSubscriptionByPlan");
  Route.get(
    "/:id/payments",
    "SubscriptionsController.getPaymentsBySubscription",
  );
  Route.post("", "SubscriptionsController.create");
  Route.put("/:id", "SubscriptionsController.update");
  Route.delete("/:id", "SubscriptionsController.delete");
}).prefix("/subscriptions")
// .middleware(["security"])
