import { Application, Router } from "express";
import { access } from "server/middlewares/aclMiddleware";
import { createRouteAdapter } from "server/setup/createRouteAdapter";
import { makeUserController } from "./factory/makeController";

export default async function userRouter(app: Application, router: Router) {
  const controller = makeUserController();
  const adaptRoute = createRouteAdapter(controller);

  router.post("/authenticate", adaptRoute(controller.authenticate));

  router.get("/", access("read-user"), adaptRoute(controller.findAll));
  router.get("/:id", access("read-user"), adaptRoute(controller.findById));
  router.post("/", access("create-user"), adaptRoute(controller.create));
  router.put("/:id", access("update-user"), adaptRoute(controller.update));
  router.delete("/:id", access("delete-user"), adaptRoute(controller.delete));

  app.use("/users", router);
}
