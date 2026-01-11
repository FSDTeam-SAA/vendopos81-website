"use client"

import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { VendorRegistrationFormData } from "@/lib/schemas"
import { Upload } from "lucide-react"
import { useState, useEffect } from "react"


interface VendorPresenterProps {
  form: UseFormReturn<VendorRegistrationFormData>
  onSubmit: (data: VendorRegistrationFormData) => void
  isLoading?: boolean
}

const VendorPresenter = ({ form, onSubmit, isLoading = false }: VendorPresenterProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [documentName, setDocumentName] = useState<string | null>(null)

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview)
      }
    }
  }, [logoPreview])

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-4xl overflow-hidden ">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="bg-primary text-white p-6 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Join as a Supplier</h1>
                <p className="text-white/90 text-sm mt-1">Complete your profile information</p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-8">
              {/* Business Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Business Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="shopName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Shop Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your shop name"
                            {...field}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Brand Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your brand name"
                            {...field}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1  gap-6 items-start mt-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Business Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your business, products, and services..."
                            {...field}
                            rows={4}
                            className="border-gray-300 focus:border-primary focus:ring-primary resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="">

                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Upload Logo</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                            <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                field.onChange(file || null)
                                
                                // Create preview for image
                                if (file) {
                                  // Revoke previous URL if exists
                                  if (logoPreview) {
                                    URL.revokeObjectURL(logoPreview)
                                  }
                                  const objectUrl = URL.createObjectURL(file)
                                  setLogoPreview(objectUrl)
                                } else {
                                  setLogoPreview(null)
                                }
                              }}
                              className="hidden"
                              id="logo-upload"
                            />
                            <label htmlFor="logo-upload" className="cursor-pointer">
                              <p className="text-sm text-primary font-medium">Upload an image</p>
                              <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                            </label>
                          </div>
                        </FormControl>
                        {logoPreview && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-700 font-medium mb-2">Preview:</p>
                            <img 
                              src={logoPreview} 
                              alt="Logo preview" 
                              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                            />
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            {...field}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="vendor@example.com"
                            {...field}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Warehouse Location */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Warehouse Location
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="warehouseLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Warehouse Name/Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Main warehouse, Distribution center, etc."
                            {...field}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Street *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main Street, Suite 100"
                            {...field}
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Address *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Address"
                              {...field}
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Location *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Location"
                              {...field}
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">State *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="State"
                              {...field}
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Postal Code *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="12345"
                              {...field}
                              className="border-gray-300 focus:border-primary focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h2 className="text-lg font-semibold overflow-hidden text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documents
                </h2>
                <FormField
                  control={form.control}
                  name="documents"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8  text-center hover:border-primary transition-colors">
                          <Upload className="w-12 h-12 text-primary mx-auto mb-3" />
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              field.onChange(file || null)
                              
                              // Store file name for display
                              if (file) {
                                setDocumentName(file.name)
                              } else {
                                setDocumentName(null)
                              }
                            }}
                            className="hidden"
                            id="documents-upload"
                          />
                          <label htmlFor="documents-upload" className="cursor-pointer">
                            <p className="text-primary font-medium">Upload documents</p>
                            <p className="text-sm text-gray-500 mt-1">or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-2">
                              Business license, Tax ID, Insurance certificates, etc.
                            </p>
                            <p className="text-xs text-gray-400">
                              PDF, DOC, JPG, PNG up to 10MB each
                            </p>
                          </label>
                        </div>
                      </FormControl>
                      {documentName && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-medium">Selected:</span>
                          <span className="text-gray-600">{documentName}</span>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => form.reset()}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  {isLoading ? "Submitting..." : "Submit Registration"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default VendorPresenter
