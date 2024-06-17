import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "MessagesController.find");
  Route.get("/chat/:id", "MessagesController.findByChat");
  Route.get("/:id", "MessagesController.find");
  Route.post("/", "MessagesController.create");
  Route.put("/:id", "MessagesController.update");
  Route.delete("/:id", "MessagesController.delete");
})
  .prefix("/messages")
  .middleware(["security"]);
