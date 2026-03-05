import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>

      {/* Intro */}
      <div className="mb-10  rounded-lg ">
        <p className="mb-4">
          Your data is protected. We use secure systems and strict data-handling practices to safeguard your business and personal information at all times.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, store, and protect your information when you use our B2B marketplace platform that connects store owners with multiple suppliers.
        </p>
      </div>
            {/* CTA Section */}
      <div className="mt-16  pb-12">
        <h2 className="text-2xl font-bold mb-6">Discover Our Platform</h2>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {ctaOptions.map((cta, index) => (
            <div
              key={index}
              className="rounded-xl   transition"
            >
              <h3 className="font-semibold text-lg mb-2">{cta.title}</h3>
              <p className="font-medium mb-2">{cta.headline}</p>
              <p className="text-sm text-muted-foreground">{cta.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8">
        {policySections.map((section, index) => (
          <div key={index} className="rounded-lg ">
            <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
            <div className="space-y-3 text-muted-foreground">
              {section.content}
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

const policySections = [
  {
    title: "What information do we collect?",
    content: (
      <>
        <p>
          We collect information necessary to create and manage your account, including business name, contact details, and login credentials.
        </p>
        <p>
          We also collect transactional data such as orders, supplier interactions, and platform usage to improve performance and service quality.
        </p>
      </>
    )
  },
  {
    title: "How do we use your information?",
    content: (
      <>
        <p>
          Your information is used to operate and improve our B2B ordering platform, process transactions, manage supplier relationships, and provide customer support.
        </p>
        <p>
          We may also use your information to communicate important updates, service notices, and security alerts.
        </p>
      </>
    )
  },
  {
    title: "Do we use cookies and other tracking technologies?",
    content: (
      <p>
        Yes. We use cookies and similar technologies to enhance functionality, analyze platform usage, and improve user experience. You can control cookie preferences through your browser settings.
      </p>
    )
  },
  {
    title: "How long do we keep your information?",
    content: (
      <p>
        We retain your information only as long as necessary to provide our services and comply with legal or regulatory requirements.
      </p>
    )
  },
  {
    title: "How do we keep your information safe?",
    content: (
      <p>
        We implement encryption, access controls, and secure infrastructure to protect your business and personal data from unauthorized access, misuse, or disclosure.
      </p>
    )
  },
  {
    title: "What are your privacy rights?",
    content: (
      <p>
        You have the right to access, update, or request deletion of your personal information, subject to applicable laws.
      </p>
    )
  },
  {
    title: "How can you contact us about this policy?",
    content: (
      <>
        <p>
          If you have questions or concerns about this Privacy Policy, you can contact our support team.
        </p>
        <ol className="list-decimal pl-5 mt-4 space-y-2">
          <li>Request access to your stored information</li>
          <li>Request corrections or updates to your data</li>
          <li>Report privacy or security concerns</li>
        </ol>
      </>
    )
  }
]

const ctaOptions = [
  {
    title: "Clean & Professional",
    headline: "One platform. Multiple suppliers. Unlimited choice.",
    description:
      "Order African, Caribbean, Latino, Canadian, and Mediterranean food products in one place — built for restaurants and grocery stores."
  },
  {
    title: "Value-Driven",
    headline: "Simplify how you buy food for your business.",
    description:
      "Access trusted suppliers, real-time inventory, and culturally diverse products through one powerful B2B ordering platform."
  },
  {
    title: "Growth-Focused",
    headline: "Everything your store needs. One smart platform.",
    description:
      "Buy directly from approved suppliers and get faster, more reliable access to multicultural food products."
  },
  {
    title: "Tech + Trust",
    headline: "Modern food sourcing for growing businesses.",
    description:
      "A B2B marketplace connecting store owners with multiple suppliers — transparent pricing, real-time availability, simple ordering."
  },
  {
    title: "Bold & Direct",
    headline: "Stop calling suppliers. Start ordering smarter.",
    description:
      "One B2B platform for all your food sourcing — diverse products, trusted suppliers, faster fulfillment."
  }
]

export default PrivacyPolicyPage
