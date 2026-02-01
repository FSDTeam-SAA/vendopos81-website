"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { Order, OrderItem } from "@/lib/types/orderSuccess"
import { addReview } from "@/lib/api/api"
import { toast } from "sonner"
import Image from "next/image"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
}

const ReviewModal = ({ isOpen, onClose, order }: ReviewModalProps) => {
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null)
  const [rating, setRating] = useState(4)
  const [comment, setComment] = useState("")

  const reviewMutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      toast.success("Review submitted successfully")
      onClose()
      setSelectedItem(null)
      setComment("")
      setRating(4)
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit review")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!order || !selectedItem) return

    reviewMutation.mutate({
      orderId: order._id,
      productId: selectedItem.product._id,
      rating,
      comment,
    })
  }

  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your feedback for order #ORD-{order._id.slice(-8).toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        {!selectedItem ? (
          <div className="space-y-4 mt-4 overflow-y-auto">
            <p className="text-sm font-medium text-gray-700">Select a product to review:</p>
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                    {item.product.images?.[0]?.url ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{item.product.title}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="text-primary text-sm font-medium hover:underline"
            >
              ← Back to products
            </button>

            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                    {selectedItem.product.images?.[0]?.url && (
                        <Image
                            src={selectedItem.product.images[0].url}
                            alt={selectedItem.product.title}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <h4 className="text-lg font-medium text-gray-900">{selectedItem.product.title}</h4>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Comment</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={reviewMutation.isPending}>
                {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ReviewModal
