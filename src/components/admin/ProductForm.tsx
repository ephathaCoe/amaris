import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/lib/store";
import { X, Plus } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product) => void;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: "",
      name: "",
      category: "",
      subcategory: "",
      description: "",
      specifications: {},
      features: [""],
      applications: [""],
      images: [""],
      priceRange: "",
    }
  );

  const [specs, setSpecs] = useState<{ key: string; value: string | number }[]>(
    Object.entries(formData.specifications || {}).map(([key, value]) => ({
      key,
      value,
    }))
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "features" | "applications" | "images"
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: "features" | "applications" | "images") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (
    index: number,
    field: "features" | "applications" | "images"
  ) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSpecChange = (index: number, key: string, value: string) => {
    const newSpecs = [...specs];
    if (key !== undefined) newSpecs[index].key = key;
    if (value !== undefined) newSpecs[index].value = value;
    setSpecs(newSpecs);
  };

  const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const removeSpec = (index: number) => {
    const newSpecs = [...specs];
    newSpecs.splice(index, 1);
    setSpecs(newSpecs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert specs array back to object
    const specifications = specs.reduce((acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    }, {} as Record<string, string | number>);
    
    onSubmit({
      ...formData,
      specifications,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category*</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="generators">Generators</SelectItem>
              <SelectItem value="excavators">Excavators</SelectItem>
              <SelectItem value="loaders">Loaders</SelectItem>
              <SelectItem value="cranes">Cranes</SelectItem>
              <SelectItem value="drilling">Drilling Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Input
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceRange">Price Range*</Label>
          <Input
            id="priceRange"
            name="priceRange"
            value={formData.priceRange}
            onChange={handleChange}
            placeholder="$10,000 - $15,000"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Specifications</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSpec}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Specification
          </Button>
        </div>
        {specs.map((spec, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Input
              placeholder="Name (e.g., Power)"
              value={spec.key}
              onChange={(e) => handleSpecChange(index, e.target.value, spec.value as string)}
              className="flex-1"
            />
            <Input
              placeholder="Value (e.g., 500kW)"
              value={spec.value}
              onChange={(e) => handleSpecChange(index, spec.key, e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeSpec(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Features</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem("features")}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Feature
          </Button>
        </div>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Input
              value={feature}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "features")
              }
              placeholder="Feature description"
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeArrayItem(index, "features")}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Applications</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem("applications")}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Application
          </Button>
        </div>
        {formData.applications.map((application, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Input
              value={application}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "applications")
              }
              placeholder="Application description"
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeArrayItem(index, "applications")}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Images</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem("images")}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Image URL
          </Button>
        </div>
        {formData.images.map((image, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Input
              value={image}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "images")
              }
              placeholder="Image URL"
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeArrayItem(index, "images")}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}