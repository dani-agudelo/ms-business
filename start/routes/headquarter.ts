import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/headquarters", "HeadquartersController.find");
    Route.get("/headquarters/:id", "HeadquartersController.find");
    Route.get("/headquarters/:headquarter_id/rooms", "HeadquartersController.findRoomsByHeadquarter");
    Route.post("/headquarters", "HeadquartersController.create");
    Route.put("/headquarters/:id", "HeadquartersController.update");
    Route.delete("/headquarters/:id", "HeadquartersController.delete");
})
// .middleware(["security"])
