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
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we will provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      id: "faq-2",
      question: "Can I change my plan later?",
      answer:
        "Of course! You can change or cancel your plan at any time. Changes will take effect at the next billing cycle.",
    },
    {
      id: "faq-3",
      question: "What is your cancellation policy?",
      answer:
        "We offer a 30-day money-back guarantee on all our plans. If you are not satisfied with our service, you can cancel anytime and receive a full refund.",
    },
    {
      id: "faq-4",
      question: "Can other info be added to an invoice?",
      answer:
        "Yes, you can customize your invoices with additional information such as company details, purchase order numbers, and payment terms.",
    },
    {
      id: "faq-5",
      question: "How does billing work?",
      answer:
        "We offer monthly and annual billing options. You will be charged based on your selected plan, and you can manage your billing information at any time in your account settings.",
    },
    {
      id: "faq-6",
      question: "How do I change my account email?",
      answer:
        'You can change your email address in your account settings under "Email and Password". Make sure to verify your new email address before confirming the change.',
    },
  ]

  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
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
                <span className="text-base md:text-lg font-semibold text-gray-900">{faq.question}</span>
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
                  <p className="text-gray-600 text-base leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
