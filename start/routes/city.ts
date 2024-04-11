import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/cities", "CityController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    Route.get("/cities/:id", "CitiesController.find");
    Route.post("/cities", "CitiesController.create");
    Route.put("/cities/:id", "CitiesController.update");
    Route.delete("/cities/:id", "CitiesController.delete");
})