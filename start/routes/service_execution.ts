import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "ServiceExecutionsController.find");
  Route.get("/:id", "ServiceExecutionsController.find");
  Route.post("/", "ServiceExecutionsController.create");
  Route.put("/:id", "ServiceExecutionsController.update");
  Route.delete("/:id", "ServiceExecutionsController.delete");
}).prefix("/service_execution");
