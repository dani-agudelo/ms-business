import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/", "ServicePlansController.find");
    Route.get("/:id", "ServicePlansController.find");
    Route.get("/plan/:plan_id", "ServicePlansController.findServicePlanByPlan");
    Route.post("", "ServicePlansController.create");
    Route.put("/:id", "ServicePlansController.update");
    Route.delete("/:id", "ServicePlansController.delete");
}).prefix("/service_plans").middleware(["security"])
