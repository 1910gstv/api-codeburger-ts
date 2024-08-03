import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    // Create order items
    const orderItems = req.body.orderItems;
    const orderItemsIds = await Promise.all(
      orderItems.map(async (orderItem: { quantity: number, product: string }) => {
        const newOrderItem = await prisma.orderItem.create({
          data: {
            quantity: orderItem.quantity,
            product: {
              connect: { id: orderItem.product }
            }
          }
        });
        return newOrderItem.id;
      })
    );

    // Calculate total price
    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await prisma.orderItem.findUnique({
          where: { id: orderItemId },
          include: {
            product: {
              select: {
                price: true
              }
            }
          }
        });
        if (!orderItem || !orderItem.product) {
          throw new Error('Order item or product not found');
        }
        return orderItem.product.price * orderItem.quantity;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    // Create order
    const order = await prisma.order.create({
      data: {
        orderItems: {
          connect: orderItemsIds.map(id => ({ id }))
        },
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: {
          connect: { id: req.body.user }
        }
      }
    });

    res.send(order);
  } catch (error) {
    res.status(400).send('The order cannot be created!');
  }
});

export default router;


// https://github.com/bluebits-academy/nodejs-eshop-api-course/blob/main/models/order.js
// https://github.com/bluebits-academy/nodejs-eshop-api-course/blob/main/models/order-item.js
// https://github.com/bluebits-academy/nodejs-eshop-api-course/blob/main/routes/orders.js