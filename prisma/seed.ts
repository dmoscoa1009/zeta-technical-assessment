import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  const password = await bcrypt.hash("admin123", 10);

  // Create admin user
  await prisma.user.upsert({
    where: { email: "admin@arki.tech" },
    update: {},
    create: {
      name: "ARKI Admin",
      email: "admin@arki.tech",
      password,
      role: "ADMIN",
    },
  });

  // Create categories
  const audio = await prisma.category.upsert({
    where: { name: "Audio" },
    update: {},
    create: { name: "Audio" },
  });

  const lighting = await prisma.category.upsert({
    where: { name: "Lighting" },
    update: {},
    create: { name: "Lighting" },
  });

  const accessories = await prisma.category.upsert({
    where: { name: "Accessories" },
    update: {},
    create: { name: "Accessories" },
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: "ARKI One",
        description:
          "Mini smart speaker with circular design and touch control.",
        price: 129.0,
        imageUrl: "/images/products/arki-one.png",
        categoryId: audio.id,
      },
      {
        name: "ARKI Light",
        description: "Desk lamp with frosted glass dome and aluminum base.",
        price: 99.0,
        imageUrl: "/images/products/arki-light.png",
        categoryId: lighting.id,
      },
      {
        name: "ARKI Dock",
        description: "Aluminum USB-C dock with 6 ports and SD card reader.",
        price: 89.0,
        imageUrl: "/images/products/arki-dock.png",
        categoryId: accessories.id,
      },
      {
        name: "ARKI Note",
        description:
          "Ultra-minimalist e-ink writing tablet with magnetic stylus.",
        price: 349.0,
        imageUrl: "/images/products/arki-note.png",
        categoryId: accessories.id,
      },
    ],
  });

  console.log("🌱 Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
