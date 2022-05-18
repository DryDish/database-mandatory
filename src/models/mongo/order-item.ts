import { Schema, model } from "mongoose";
import {
  DECIMAL_15_2_MAX,
  DECIMAL_15_2_MIN,
} from "../../config/constants.config";
import { FrameInterface, frameSchema } from "./frame";
import { PaperTypeInterface, paperTypeSchema } from "./paper-type";

interface OrderItemInterface {
  orderItemPrice: number;
  priceSaved: number;
  amount: number;
  frame: FrameInterface;
  paperType: PaperTypeInterface;
}

const orderItemSchema = new Schema<OrderItemInterface>({
  orderItemPrice: {
    type: Schema.Types.Decimal128,
    min: DECIMAL_15_2_MIN,
    max: DECIMAL_15_2_MAX,
    required: true,
  },
  priceSaved: {
    type: Schema.Types.Decimal128,
    min: DECIMAL_15_2_MIN,
    max: DECIMAL_15_2_MAX,
    required: false,
  },
  amount: { type: Number, required: true },
  frame: { type: frameSchema, required: false },
  paperType: { type: paperTypeSchema, required: false },
});

export const OrderItem = model<OrderItemInterface>(
  "OrderItem",
  orderItemSchema
);