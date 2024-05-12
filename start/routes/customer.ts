import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "CustomersController.find");
  Route.get("/:id", "CustomersController.find");
  Route.post("/", "CustomersController.create");
  Route.put("/:id", "CustomersController.update");
  Route.delete("/:id", "CustomersController.delete");
}).prefix("/customers");
