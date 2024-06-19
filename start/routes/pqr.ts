import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/pqr", "PqrController.find");
  Route.get("/pqr/:id", "PqrController.find");
  Route.post("/pqr", "PqrController.create");
  Route.put("/pqr/:id", "PqrController.update");
  Route.delete("/pqr/:id", "PqrController.delete");
})