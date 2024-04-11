import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/regions", "RegionsController.find");
    Route.get("/regions/:id", "RegionsController.find");
    Route.post("/regions", "RegionsController.create");
    Route.put("/regions/:id", "RegionsController.update");
    Route.delete("/regions/:id", "RegionsController.delete");
})