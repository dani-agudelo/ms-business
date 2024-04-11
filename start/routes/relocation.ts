import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/relocations", "RelocationsController.find");
    Route.get("/relocations/:id", "RelocationsController.find");
    Route.post("/relocations", "RelocationsController.create");
    Route.put("/relocations/:id", "RelocationsController.update");
    Route.delete("/relocations/:id", "RelocationsController.delete");
})