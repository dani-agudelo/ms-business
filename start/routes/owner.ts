import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "OwnersController.find");
  Route.get("/:id", "OwnersController.find");
  Route.post("/", "OwnersController.create");
  Route.put("/:id", "OwnersController.update");
  Route.delete("/:id", "OwnersController.delete");
}).prefix("/owners").middleware(["security"])
