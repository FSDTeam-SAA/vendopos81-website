"use client"

import { useState } from "react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null)

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "How do I create a business account?",
      answer:
        "Click 'Sign Up' to register your food business. You'll need to provide valid business details. Once approved, you can start ordering immediately.",
    },
    {
      id: "faq-2",
      question: "Is there a minimum order requirement?",
      answer:
        "Minimum order quantities (MOQ) or values are determined by each individual supplier. These details are clearly listed on product pages and in your cart.",
    },
    {
      id: "faq-3",
      question: "Can I order from multiple suppliers in one go?",
      answer:
        "Absolutely. Our platform allows you to shop from multiple vendors in a single checkout session, simplifying your procurement process.",
    },
    {
      id: "faq-4",
      question: "How are shipping rates calculated?",
      answer:
        "Shipping rates vary based on the supplier's location, your delivery address, and the total weight/volume of the order. You'll see the exact cost at checkout.",
    },
    {
      id: "faq-5",
      question: "What is your return policy for damaged goods?",
      answer:
        "If you receive damaged or incorrect items, please report it through our support portal within 24 hours of delivery. We work with suppliers to resolve issues quickly.",
    },
    {
      id: "faq-6",
      question: "Do you offer credit terms for businesses?",
      answer:
        "We offer flexible payment terms for qualified businesses. Please contact our finance team after registration to apply for credit verification.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#f9fff9]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Frequently asked questions
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Everything you need to know about the product and billing.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 md:space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 md:px-8 py-4 md:py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors text-left"
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="text-base md:text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-lg transition-transform duration-300 ${
                    openId === faq.id ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 md:px-8 py-4 md:py-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ
