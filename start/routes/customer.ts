import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "CustomersController.find");
  Route.get("/:id", "CustomersController.find");
  Route.get(
    "/:id/subscriptions",
    "CustomersController.getSubscriptionByCustomer",
  );
  Route.get(
    "/:id/service_executions/:service_execution_id/chats",
    "CustomersController.getChatByServiceExecution",
  );
  Route.get(
    "/:id/service_executions/:service_execution_id/comments",
    "CustomersController.getCommentByServiceExecution",
  );
  Route.post("/", "CustomersController.create");
  Route.put("/:id", "CustomersController.update");
  Route.delete("/:id", "CustomersController.delete");
}).prefix("/customers");
