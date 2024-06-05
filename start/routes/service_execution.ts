import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "ServiceExecutionsController.find");
  Route.get("/:id", "ServiceExecutionsController.find");
  Route.get(
    "/customer/:customer_id",
    "ServiceExecutionsController.findByCustomer",
  );
  Route.post("/", "ServiceExecutionsController.create");
  Route.put("/:id", "ServiceExecutionsController.update");
  Route.delete("/:id", "ServiceExecutionsController.delete");
}).prefix("/service_executions");
