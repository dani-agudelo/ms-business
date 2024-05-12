import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "AdministratorsController.find");
  Route.get("/:id", "AdministratorsController.find");
  Route.post("/", "AdministratorsController.create");
  Route.put("/:id", "AdministratorsController.update");
  Route.delete("/:id", "AdministratorsController.delete");
}).prefix("/administrators");
