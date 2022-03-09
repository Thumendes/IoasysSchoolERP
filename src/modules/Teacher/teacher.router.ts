import { Application, Router } from "express";
import { access } from "server/middlewares/aclMiddleware";
import { createRouteAdapter } from "server/setup/createRouteAdapter";
import { makeTeacherController } from "./factory/makeController";

export default async function TeacherRouter(app: Application, router: Router) {
  const controller = makeTeacherController();
  const adaptRoute = createRouteAdapter(controller);

  router.get("/", access("read-teacher"), adaptRoute(controller.findAll));
  router.get("/:id", access("read-teacher"), adaptRoute(controller.findById));
  router.post("/", access("create-teacher"), adaptRoute(controller.create));
  router.put("/:id", access("update-teacher"), adaptRoute(controller.update));
  router.delete(
    "/:id",
    access("delete-teacher"),
    adaptRoute(controller.delete)
  );

  app.use("/teachers", router);
}
