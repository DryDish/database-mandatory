import { DataTypes, Model, Sequelize } from "sequelize";
import { ContactInfo } from "./contact-info";
import { DiscountCode } from "./discount-code";
import { Invoice } from "./invoice";
import { OrderItem } from "./order-item";
import { Status } from "./status";
import { User } from "./user";

export class Order extends Model {}

export default (sequelize: Sequelize) => {
  Order.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "order_id",
      },
      orderPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        field: "order_price",
        defaultValue: 0,
      },
      totalPriceSaved: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        field: "total_price_saved",
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
      },
    },
    {
      sequelize,
      tableName: "orders",
    }
  );
};

export const defineOrderAssociations = () => {
  Order.belongsTo(DiscountCode, {
    foreignKey: {
      name: "discountCodeId",
      allowNull: true,
      field: "discount_code_id",
    },
  });
  Order.belongsTo(User, {
    foreignKey: {
      name: "userId",
      allowNull: false,
      field: "user_id",
    },
  });
  Order.belongsTo(ContactInfo, {
    foreignKey: {
      name: "billingContactInfoId",
      allowNull: false,
      field: "billing_contact_info_id",
    },
  });
  Order.belongsTo(Status, {
    foreignKey: {
      name: "statusId",
      allowNull: false,
      field: "status_id",
    },
  });

  Order.hasMany(Invoice, {
    foreignKey: {
      name: "invoiceId",
      allowNull: false,
      field: "invoice_id", 
    },
  });
  Order.hasMany(OrderItem, {
    foreignKey: {
      name: "orderId",
      allowNull: false,
      field: "order_id",
    },
  });
};
