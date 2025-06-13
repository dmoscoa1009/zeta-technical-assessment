import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;
    const category = req.query.category as string;

    const skip = (page - 1) * limit;

    // Build where clause based on filters
    const where: any = {};
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }
    if (category) {
      where.categoryId = category;
    }

    // Get total count for pagination
    const total = await prisma.product.count({ where });

    // Get paginated products
    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    res.json({
      products,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
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
