import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/chats", "ChatController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    Route.get("/chats/:id", "ChatsController.find");
    Route.post("/chats", "ChatsController.create");
    Route.put("/chats/:id", "ChatsController.update");
    Route.delete("/chats/:id", "ChatsController.delete");
})