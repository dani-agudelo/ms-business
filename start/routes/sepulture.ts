import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/sepultures", "SepulturesController.find");
    Route.get("/sepultures/:id", "SepulturesController.find");
    Route.post("/sepultures", "SepulturesController.create");
    Route.put("/sepultures/:id", "SepulturesController.update");
    Route.delete("/sepultures/:id", "SepulturesController.delete");
})