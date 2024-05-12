import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "DriversController.find");
  Route.get("/:id", "DriversController.find");
  Route.post("/", "DriversController.create");
  Route.put("/:id", "DriversController.update");
  Route.delete("/:id", "DriversController.delete");
}).prefix("/drivers");
