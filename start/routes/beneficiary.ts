import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/", "BeneficiariesController.find");
  Route.get("/:id", "BeneficiariesController.find");
  Route.post("/", "BeneficiariesController.create");
  Route.put("/:id", "BeneficiariesController.update");
  Route.delete("/:id", "BeneficiariesController.delete");
}).prefix("/beneficiaries");
