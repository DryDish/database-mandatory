import express from "express";
import { DiscountType } from "../models/discount-type";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const discountTypeList = await DiscountType.findAll();
    res.status(200).send({ discountCodeTypes: discountTypeList });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 500,
      message: "Unable to retrieve a list of discount code types.",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const discountType = await DiscountType.findByPk(id);

    if (discountType === null) {
      res.status(404).send({ error: 404, message: "Not found." });
    } else {
      res.status(200).send({ discountType: discountType });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 500,
      message: "Unable to retrieve discount code type.",
    });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newDiscountType = DiscountType.build({ name });

  try {
    await newDiscountType.save();
    res.status(200).send({ discountType: newDiscountType });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 500,
      message: "Unable to save new discount type.",
      description: "'name' must be either 'amount' or 'percent.'",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const discountType = await DiscountType.findByPk(id);

  if (!discountType) {
    res.status(404).send({ error: 404, message: "Not found." });
    return;
  }

  discountType.set({ name });
  try {
    await discountType.save();
    res.status(200).send({ discountType: DiscountType });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: 500,
      message: "Unable to save new discount type.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const discountType = await DiscountType.findByPk(id);

  if (!discountType) {
    res.status(404).send({ error: 404, message: "Not found." });
    return;
  }

  try {
    await discountType.destroy();
    res.status(200).send({ deleted: discountType });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: 500,
      message: "Unable to delete the discount type.",
    });
  }
});

export default router;