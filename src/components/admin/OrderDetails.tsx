import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Printer, Send } from "lucide-react";

interface OrderDetailsProps {
  order: any;
  onStatusChange: (orderId: number, status: string) => void;
}

export function OrderDetails({ order, onStatusChange }: OrderDetailsProps) {
  const [status, setStatus] = useState(order.status);
  const [note, setNote] = useState("");

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onStatusChange(order.id, newStatus);
  };

  const handleAddNote = () => {
    if (note.trim()) {
      // In a real app, this would send the note to the backend
      alert("Note added: " + note);
      setNote("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-slate-500">
            Placed on {new Date(order.date).toLocaleDateString()} at{" "}
            {new Date(order.date).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Customer Information</h4>
            <p className="font-semibold">{order.customerName}</p>
            <p>{order.customerEmail}</p>
            <p>{order.customerPhone}</p>
            {order.company && <p>Company: {order.company}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Order Summary</h4>
            <div className="flex justify-between mb-1">
              <span>Items:</span>
              <span>{order.items.length}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Status:</span>
              <Badge
                className={
                  status === "pending"
                    ? "bg-yellow-500"
                    : status === "processing"
                    ? "bg-blue-500"
                    : status === "completed"
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h4 className="font-medium mb-3">Order Items</h4>
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price Range
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={item.image || "https://placehold.co/100x100?text=No+Image"}
                          alt={item.name}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 capitalize">
                      {item.category}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {item.priceRange}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Customer Message</h4>
        <div className="bg-slate-50 p-4 rounded-md">
          <p>{order.message || "No message provided."}</p>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="note">Add Internal Note</Label>
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about this order..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleAddNote} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}