"use client";
import React, { useState } from "react";
import PricingCard from "../shared/PlanCard"; // adjust path
import Image from "next/image";
import BillingHistoryTable from "./BillingHistoryTable";
import ConfirmationModal from "../shared/ConfirmationModal"; // Import the modal

// Define proper types
type PlanType = "Basic" | "Pro" | "Enterprise";
type BillingPeriod = "Monthly" | "Yearly";

const SubscriptionPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("Pro");
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("Monthly");
  const [checkedFeatures, setCheckedFeatures] = useState<
    Record<string, boolean>
  >({});
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [planToCancel, setPlanToCancel] = useState<PlanType | null>(null);

  const handleFeatureCheck = (feature: string) => {
    setCheckedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const plans = [
    {
      title: "Basic" as PlanType,
      description:
        "Ideal for individuals or small teams starting with email outreach.",
      monthlyPrice: "$10",
      yearlyPrice: "$96", // $8 per month * 12 months (20% discount)
      yearlySavings: "- 20%",
      features: [
        "Connect 1 data platform: Crunchbase",
        "Send up to 500 emails/month",
        "AI email generation (limited to 50 per month)",
        "Manage up to 200 leads",
        "Standard support",
      ],
    },
    {
      title: "Pro" as PlanType,
      description:
        "Best for growing teams that need multi-source lead management.",
      monthlyPrice: "$40",
      yearlyPrice: "$384", // $32 per month * 12 months (20% discount)
      yearlySavings: "- 20%",
      features: [
        "Connect 2 data platforms: Crunchbase & Apollo",
        "Send up to 2,000 emails/month",
        "AI email generation & optimization (unlimited)",
        "Manage up to 1,000 leads",
        "Priority support",
      ],
      isProfessionalPlan: true,
    },
    {
      title: "Enterprise" as PlanType,
      description:
        "For agencies or large teams handling multiple campaigns and integrations.",
      monthlyPrice: "$65",
      yearlyPrice: "$624",
      yearlySavings: "- 20%",
      features: [
        "Connect all supported platforms: Crunchbase, Apollo, LinkedIn Sales Navigator",
        "Send up to 10,000 emails/month",
        "AI-powered campaign assistant",
        "Manage unlimited leads",
        "White-label branding",
        "Dedicated support",
      ],
    },
  ];

  // Calculate the current price and percentage based on billing period
  const getPlanPrice = (plan: (typeof plans)[0]) => {
    if (billingPeriod === "Monthly") {
      return {
        price: plan.monthlyPrice,
        percentage: undefined, // No percentage for monthly
        period: "per user/month, billed monthly",
      };
    } else {
      return {
        price: plan.yearlyPrice,
        percentage: plan.yearlySavings,
        period: "per user/month, billed yearly",
      };
    }
  };

  const handleCancelPlanClick = (planTitle: PlanType) => {
    setPlanToCancel(planTitle);
    setIsCancelModalOpen(true);
  };

  const handleGetStartedClick = (planTitle: PlanType) => {
    setSelectedPlan(planTitle);
  };

  const handleConfirmCancel = () => {
    console.log(`Cancelling plan: ${planToCancel}`);

    // Reset the selected plan
    setSelectedPlan("Basic"); // Set to default plan or null if you have a proper type for no selection

    // Close cancel modal and open success modal
    setIsCancelModalOpen(false);
    setIsSuccessModalOpen(true);

    setPlanToCancel(null);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto p-3 rounded-lg bg-[#F6F6F6] ">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h2 className="heading-4 font-medium text-[#333]">
            Subscription plans
          </h2>

          <div className="flex flex-wrap items-center gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => setBillingPeriod("Monthly")}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer font-semibold transition-all duration-300 
        ${
          billingPeriod === "Monthly"
            ? "bg-[#F2F2F2] border border-[#E2E3E5] text-[#111827] shadow-sm"
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        }
        rounded-md border-none outline-none focus:outline-none
      `}
            >
              <Image
                src="/images/wallet.png"
                width={18}
                height={18}
                alt="monthly"
              />
              Monthly
            </button>

            {/* Yearly Tab */}
            <button
              onClick={() => setBillingPeriod("Yearly")}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer font-semibold transition-all duration-300 
        ${
          billingPeriod === "Yearly"
            ? "bg-[#F2F2F2] border border-[#E2E3E5] text-[#111827] shadow-sm"
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        }
        rounded-md border-none outline-none focus:outline-none
      `}
            >
              <Image
                src="/images/wallet.png"
                width={18}
                height={18}
                alt="yearly"
              />
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const { price, percentage, period } = getPlanPrice(plan);

            return (
              <div key={plan.title} className="flex flex-col h-full">
                <PricingCard
                  title={plan.title}
                  description={plan.description}
                  price={price}
                  percentage={percentage}
                  isCurrentPlan={selectedPlan === plan.title}
                  period={period}
                  buttonText={
                    selectedPlan === plan.title ? "Cancel plan" : "Get started"
                  }
                  features={plan.features}
                  isProfessionalPlan={plan.isProfessionalPlan || false}
                  onBuyNow={() =>
                    selectedPlan === plan.title
                      ? handleCancelPlanClick(plan.title)
                      : handleGetStartedClick(plan.title)
                  }
                  bgColor={
                    plan.isProfessionalPlan
                      ? "#11224E"
                      : "bg-white bg-opacity-80"
                  }
                  textColor={
                    plan.isProfessionalPlan ? "text-white" : "text-[#111827]"
                  }
                  titleColor={
                    plan.isProfessionalPlan ? "text-white" : "text-[#111827]"
                  }
                  descriptionColor={
                    plan.isProfessionalPlan ? "text-gray-300" : "text-[#111827]"
                  }
                  priceColor={
                    plan.isProfessionalPlan ? "text-white" : "text-[#111827]"
                  }
                  periodColor={
                    plan.isProfessionalPlan ? "text-gray-300" : "text-gray-600"
                  }
                  featureColor={
                    plan.isProfessionalPlan ? "text-white" : "text-black"
                  }
                  buttonBg={
                    plan.isProfessionalPlan ? "bg-white" : "bg-[#11224E]"
                  }
                  buttonTextColor={
                    plan.isProfessionalPlan ? "text-[#11224E]" : "text-white"
                  }
                  hoverButtonBg={
                    plan.isProfessionalPlan ? "bg-gray-100" : "bg-white"
                  }
                  hoverButtonText={
                    plan.isProfessionalPlan
                      ? "text-[#11224E]"
                      : "text-[#111827]"
                  }
                  borderStyle="border border-[#FDD5B6]"
                  cardRadius="rounded-2xl"
                  padding="px-6 py-6"
                  priceSize="heading-1"
                  priceWeight="font-medium"
                  cardMaxWidth="w-full"
                  showCheckboxes={true}
                  checkedFeatures={checkedFeatures}
                  onFeatureCheck={handleFeatureCheck}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-5">
        <BillingHistoryTable />
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Complete your payment"
        message="Securely subscribe to your selected plan through Stripe. You'll be redirected to the payment page to complete your purchase."
        confirmText="Pay $12"
        cancelText="Go back"
        icon="/images/pricing-modal.png"
        // NEW PROPS
        showInput={true}
        inputPlaceholder="Enter details"
        inputLabel="Card details"
        paymentRecords={[
          {
            label: "Total amount",
            value: "$12.00 USD",
            bgColor: "#FEE5D1",
          },
        ]}
        highlightText="Stripe"
      />
      {/* Success Modal */}
      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        onConfirm={handleCloseSuccessModal}
        title="Plan Cancelled Successfully!"
        message="Your subscription has been cancelled. You will continue to have access to all features until the end of your current billing period."
        confirmText="Got it"
        cancelText="Go Back" 
        icon="/images/pricing-modal.png" 
      />
    </div>
  );
};

export default SubscriptionPlans;