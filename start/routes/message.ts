import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/messages", "CityController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    Route.get("/messages/:id", "MessagesController.find");
    Route.post("/messages", "MessagesController.create");
    Route.put("/messages/:id", "MessagesController.update");
    Route.delete("/messages/:id", "MessagesController.delete");
})