const express = require("express");
const router = express.Router();

const { auth, validation, ctrlWrapper, upload } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const {
  joiUserSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
} = require("../../models/user");

router.post("/singup", validation(joiUserSchema), ctrlWrapper(ctrl.singUp));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.get(
  "/verify",
  validation(verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);
router.post("/singin", validation(joiUserSchema), ctrlWrapper(ctrl.singIn));
router.get(
  "/singout",
  auth,
  validation(joiUserSchema),
  ctrlWrapper(ctrl.singOut)
);
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
