import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct: RequestHandler = async (req: any, res, next) => {
  try {
    const { name, description, price, categoryId } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      // Save the relative path for the client to use
      imageUrl = `/images/products/${req.file.filename}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        imageUrl,
        categoryId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (req: any, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId } = req.body;

    // Get the current product to keep the existing image if no new one is uploaded
    const currentProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!currentProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // If a new image is uploaded, use it; otherwise, keep the existing one
    let imageUrl = currentProduct.imageUrl;
    if (req.file) {
      imageUrl = `/images/products/${req.file.filename}`;
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        imageUrl,
        categoryId,
      },
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
