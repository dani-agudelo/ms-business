import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/rooms", "RoomsController.find");
  Route.get("/rooms/:id", "RoomsController.find");
  Route.get(
    "/rooms/headquarter/:headquarter_id",
    "RoomsController.getRoomsByHeadquarter",
  );
  Route.get("/rooms/:id/sepultures", "RoomsController.getSepulturesByRoom");
  Route.get("/rooms/:id/cremations", "RoomsController.getCremationsByRoom");
  Route.post("/rooms", "RoomsController.create");
  Route.put("/rooms/:id", "RoomsController.update");
  Route.delete("/rooms/:id", "RoomsController.delete");
})
.middleware(["security"]);

