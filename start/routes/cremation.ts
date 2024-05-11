import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/cremations", "CremationsController.find");
    Route.get("/cremations/:id", "CremationsController.find");
    Route.post("/cremations", "CremationsController.create");
    Route.put("/cremations/:id", "CremationsController.update");
    Route.delete("/cremations/:id", "CremationsController.delete");
})