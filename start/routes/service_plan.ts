import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/service_plans", "ServicePlansController.find");
    Route.get("/service_plans/:id", "ServicePlansController.find");
    Route.post("/service_plans", "ServicePlansController.create");
    Route.put("/service_plans/:id", "ServicePlansController.update");
    Route.delete("/service_plans/:id", "ServicePlansController.delete");
})