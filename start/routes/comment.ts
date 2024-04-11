import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/comments", "CommentsController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    Route.get("/comments/:id", "CommentsController.find");
    Route.post("/comments", "CommentsController.create");
    Route.put("/comments/:id", "CommentsController.update");
    Route.delete("/comments/:id", "CommentsController.delete");
})