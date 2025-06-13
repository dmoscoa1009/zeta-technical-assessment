"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct } from "@/services/products";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Pencil } from "lucide-react";
import type { Product } from "@/types/product";
import { Category } from "@/types/category";

interface ProductDialogProps {
  categories: Category[];
  product?: Product;
  editMode?: boolean;
}

export default function ProductDialog({
  categories,
  product,
  editMode = false,
}: ProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const router = useRouter();

  // Reset form when dialog opens/closes or product changes
  useEffect(() => {
    if (open && product) {
      setName(product.name);
      setPrice(product.price.toString());
      setDescription(product.description);
      setCategoryId(product.categoryId);
      setPreviewUrl(product.imageUrl || "");
    } else if (!open) {
      setName("");
      setPrice("");
      setDescription("");
      setCategoryId("");
      setImage(null);
      setPreviewUrl("");
    }
  }, [open, product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("categoryId", categoryId);

      // Only append image if a new one was selected
      if (image) {
        formData.append("image", image);
      }

      if (editMode && product) {
        await updateProduct(product.id, formData);
        toast.success("Product updated successfully");
      } else {
        await createProduct(formData);
        toast.success("Product created successfully");
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        editMode ? "Failed to update product" : "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {editMode ? (
          <Button variant="outline" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Edit Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!editMode}
            />
            {previewUrl && (
              <div className="w-32 h-auto mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-cover rounded-md border"
                />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? editMode
                ? "Updating..."
                : "Creating..."
              : editMode
              ? "Update Product"
              : "Create Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
