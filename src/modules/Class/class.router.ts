import { Application, Router } from "express";
import { access } from "server/middlewares/aclMiddleware";
import { createRouteAdapter } from "server/setup/createRouteAdapter";
import { makeClassController } from "./factory/makeController";

export default async function ClassRouter(app: Application, router: Router) {
  const controller = makeClassController();
  const adaptRoute = createRouteAdapter(controller);

  router.get(
    "/:id/students",
    access("read-class", "read-student"),
    adaptRoute(controller.classStudents)
  );
  router.put(
    "/:classId/add-teacher/:teacherId",
    access("update-class"),
    adaptRoute(controller.addTeacher)
  );

  router.get("/", access("read-class"), adaptRoute(controller.findAll));
  router.get("/:id", access("read-class"), adaptRoute(controller.findById));
  router.post("/", access("create-class"), adaptRoute(controller.create));
  router.put("/:id", access("update-class"), adaptRoute(controller.update));
  router.delete("/:id", access("delete-class"), adaptRoute(controller.delete));

  app.use("/classes", router);
}
