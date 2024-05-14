/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

import "./routes/message";
import "./routes/comment";
import "./routes/room";
import "./routes/sepulture";
import "./routes/chat";
import "./routes/headquarter";
import "./routes/plan";
import "./routes/relocation";
import "./routes/service";
import "./routes/service_plan";
import "./routes/cremation";
import "./routes/customer";
import "./routes/beneficiary";
import "./routes/owner";
import "./routes/administrator";
import "./routes/driver";
import "./routes/service_execution";
import "./routes/payment";
import "./routes/subscription";
