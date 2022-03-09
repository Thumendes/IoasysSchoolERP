import { Application, Router } from "express";
import { access } from "server/middlewares/aclMiddleware";
import { createRouteAdapter } from "server/setup/createRouteAdapter";
import { makeSubjectController } from "./factory/makeController";

export default async function SubjectRouter(app: Application, router: Router) {
  const controller = makeSubjectController();
  const adaptRoute = createRouteAdapter(controller);

  router.get(
    "/:id/teachers",
    access("read-subject", "read-teacher"),
    adaptRoute(controller.subjectTeachers)
  );

  router.get("/", access("read-subject"), adaptRoute(controller.findAll));
  router.get("/:id", access("read-subject"), adaptRoute(controller.findById));
  router.post("/", access("create-subject"), adaptRoute(controller.create));
  router.put("/:id", access("update-subject"), adaptRoute(controller.update));
  router.delete(
    "/:id",
    access("delete-subject"),
    adaptRoute(controller.delete)
  );

  app.use("/subjects", router);
}
