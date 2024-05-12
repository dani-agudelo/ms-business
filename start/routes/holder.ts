import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", ":HoldersController.find");
  Route.get("/:id", "HoldersController.find");
  Route.post("/", "HoldersController.create");
  Route.put("/:id", "HoldersController.update");
  Route.delete("/:id", "HoldersController.delete");
}).prefix("/holder");
