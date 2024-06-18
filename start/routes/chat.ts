import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "ChatsController.find");
  Route.get("/:id", "ChatsController.find");
  Route.get(
    "/service_executions/:service_execution_id",
    "ChatsController.findChatByServiceExecution",
  );
  Route.post("", "ChatsController.create");
  Route.put("/:id", "ChatsController.update");
  Route.delete("/:id", "ChatsController.delete");
}).prefix("/chats")
// .middleware(["security"]);
