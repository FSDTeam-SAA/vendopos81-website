"use client"


import ChangePasswordContainer from "@/components/userprofile/changepassword/ChangePasswordContainer"
import OrderHistoryContainer from "@/components/userprofile/orderhistory/OrderHistoryContainer"
import PersonalInformmain from "@/components/userprofile/personalInformation/PersonalInformmain"
import UserNavbar from "@/components/userprofile/UserNavbar"
import UserSidebar from "@/components/userprofile/UserSidebar"
import { useState } from "react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <main className="bg-gray-50 min-h-screen">
      <UserNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <UserSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "personal" && <PersonalInformmain />}
            {activeTab === "password" && <ChangePasswordContainer />}
            {activeTab === "orders" && <OrderHistoryContainer />}
          </div>
        </div>
      </div>
    </main>
  )
}
