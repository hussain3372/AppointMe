"use client";
import React, { useState } from "react";
import PricingCard from "@/app/shared/PlanCard";
import Image from "next/image";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import { AnimatePresence, motion } from "framer-motion";
import AddPlanDrawer from "./AddPlanDrawer";
import EditPlanDrawer from "./EditPlanDrawer";

// Define proper types
type PlanType = "Basic" | "Pro" | "Enterprise" | string;
type BillingPeriod = "Monthly" | "Yearly";

interface PlanFeature {
  title: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySavings: string;
  features: string[];
  isProfessionalPlan?: boolean;
}

const SubscriptionCards: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("Pro");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanFeature | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("Monthly");
  const [checkedFeatures, setCheckedFeatures] = useState<Record<string, boolean>>({});
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [planToCancel, setPlanToCancel] = useState<PlanType | null>(null);
  const [plans, setPlans] = useState<PlanFeature[]>([
    {
      title: "Basic",
      description: "Ideal for individuals or small teams starting with email outreach.",
      monthlyPrice: "$10",
      yearlyPrice: "$96",
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
      title: "Pro",
      description: "Best for growing teams that need multi-source lead management.",
      monthlyPrice: "$40",
      yearlyPrice: "$384",
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
      title: "Enterprise",
      description: "For agencies or large teams handling multiple campaigns and integrations.",
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
  ]);

  const handleAddDrawer = () => {
    setIsAddDrawerOpen(prev => !prev);
  };

  const handleEditDrawer = (plan: PlanFeature) => {
    setEditingPlan(plan);
    setIsEditDrawerOpen(true);
  };

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false);
    setEditingPlan(null);
  };

  const handleAddNewPlan = (newPlanData: {
    name: string;
    description: string;
    price: string;
    emailLimit: string;
    leadsCapacity: string;
    campaignLimit: string;
    selectedPlatforms: string[];
  }) => {
    const monthlyPriceNum = parseFloat(newPlanData.price.replace('$', '')) || 0;
    const yearlyPriceNum = monthlyPriceNum * 12 * 0.8;
    const yearlyPrice = `$${Math.round(yearlyPriceNum)}`;
    
    const features = [
      `Send up to ${newPlanData.emailLimit} emails/month`,
      `Manage up to ${newPlanData.leadsCapacity} leads`,
      `Campaign limit: ${newPlanData.campaignLimit}`,
      ...newPlanData.selectedPlatforms.map(platform => `Connect to ${platform}`),
      "Standard support",
    ];

    const newPlan: PlanFeature = {
      title: newPlanData.name,
      description: newPlanData.description,
      monthlyPrice: newPlanData.price,
      yearlyPrice: yearlyPrice,
      yearlySavings: "- 20%",
      features: features,
      isProfessionalPlan: false,
    };

    setPlans(prevPlans => [...prevPlans, newPlan]);
    setIsAddDrawerOpen(false);
  };

  const handleUpdatePlan = (updatedPlanData: {
    name: string;
    description: string;
    price: string;
    emailLimit: string;
    leadsCapacity: string;
    campaignLimit: string;
    selectedPlatforms: string[];
  }) => {
    if (!editingPlan) return;

    const monthlyPriceNum = parseFloat(updatedPlanData.price.replace('$', '')) || 0;
    const yearlyPriceNum = monthlyPriceNum * 12 * 0.8;
    const yearlyPrice = `$${Math.round(yearlyPriceNum)}`;
    
    const features: string[] = [];
    
    // Add email limit
    if (updatedPlanData.emailLimit) {
      features.push(`Send up to ${updatedPlanData.emailLimit} emails/month`);
    }
    
    // Add leads capacity
    if (updatedPlanData.leadsCapacity) {
      features.push(`Manage up to ${updatedPlanData.leadsCapacity} leads`);
    }
    
    // Add campaign limit
    if (updatedPlanData.campaignLimit) {
      features.push(`Campaign limit: ${updatedPlanData.campaignLimit}`);
    }
    
    // Add platforms
    if (updatedPlanData.selectedPlatforms.length > 0) {
      updatedPlanData.selectedPlatforms.forEach(platform => {
        features.push(`Connect to ${platform}`);
      });
    }
    
    // Always add standard support
    features.push("Standard support");

    const updatedPlan: PlanFeature = {
      ...editingPlan,
      title: updatedPlanData.name,
      description: updatedPlanData.description,
      monthlyPrice: updatedPlanData.price,
      yearlyPrice: yearlyPrice,
      features: features,
    };

    setPlans(prevPlans => 
      prevPlans.map(plan => 
        plan.title === editingPlan.title ? updatedPlan : plan
      )
    );
    setIsEditDrawerOpen(false);
    setEditingPlan(null);
  };

  const handleFeatureCheck = (feature: string) => {
    setCheckedFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const getPlanPrice = (plan: PlanFeature) => {
    if (billingPeriod === "Monthly") {
      return {
        price: plan.monthlyPrice,
        percentage: undefined,
      };
    } else {
      return {
        price: plan.yearlyPrice,
        percentage: plan.yearlySavings,
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
    setSelectedPlan("Basic");
    setIsCancelModalOpen(false);
    setIsSuccessModalOpen(true);
    setPlanToCancel(null);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  // Helper function to extract plan data for the edit form
  const extractPlanDataForEdit = (plan: PlanFeature) => {
    let emailLimit = "";
    let leadsCapacity = "";
    let campaignLimit = "";
    const selectedPlatforms: string[] = [];

    plan.features.forEach(feature => {
      if (feature.includes('emails/month')) {
        const match = feature.match(/Send up to (.+?) emails\/month/);
        if (match) {
          emailLimit = match[1];
        }
      }
      if (feature.includes('Manage up to') && feature.includes('leads')) {
        const match = feature.match(/Manage up to (.+?) leads/);
        if (match) {
          leadsCapacity = match[1];
        }
      }
      if (feature.includes('Campaign limit')) {
        campaignLimit = feature.replace('Campaign limit: ', '');
      }
      if (feature.includes('Connect to')) {
        const platform = feature.replace('Connect to ', '');
        selectedPlatforms.push(platform);
      }
      // Handle the existing format like "Connect 2 data platforms: Crunchbase & Apollo"
      if (feature.includes('Crunchbase')) {
        if (!selectedPlatforms.includes('Crunchbase')) {
          selectedPlatforms.push('Crunchbase');
        }
      }
      if (feature.includes('Apollo')) {
        if (!selectedPlatforms.includes('Apollo')) {
          selectedPlatforms.push('Apollo');
        }
      }
      if (feature.includes('LinkedIn Sales Navigator')) {
        if (!selectedPlatforms.includes('LinkedIn Sales Navigator')) {
          selectedPlatforms.push('LinkedIn Sales Navigator');
        }
      }
      if (feature.includes('Outreach')) {
        if (!selectedPlatforms.includes('Outreach')) {
          selectedPlatforms.push('Outreach');
        }
      }
    });

    const extractedData = {
      name: plan.title,
      description: plan.description,
      price: plan.monthlyPrice,
      emailLimit: emailLimit,
      leadsCapacity: leadsCapacity,
      campaignLimit: campaignLimit,
      selectedPlatforms: selectedPlatforms,
    };

    return extractedData;
  };

  return (
    <div>
      <div className="container mx-auto p-3 rounded-lg bg-[#F6F6F6]">
        <div className="flex w-full justify-between items-center flex-col sm:flex-row">
          <div className="flex flex-col items-start mb-6 gap-4">
            <motion.h2 
              className="heading-4 font-medium text-[#333]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Subscription plans
            </motion.h2>

            <div className="flex flex-wrap items-center gap-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200 relative">
              {/* Animated Slider Background */}
              <motion.div
                className="absolute bg-[#F2F2F2] border border-[#E2E3E5] shadow-sm rounded-md h-[calc(100%-8px)] top-1"
                animate={{
                  left: billingPeriod === "Monthly" ? "2px" : `calc(50% + 2px)`,
                  width: "calc(50% - 4px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
              
              <div className="relative flex gap-1 flex-1">
                <button
                  onClick={() => setBillingPeriod("Monthly")}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer font-normal heading-6 transition-colors duration-200 relative z-10 flex-1 rounded-md ${
                    billingPeriod === "Monthly" ? "text-[#111827]" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Image
                    src="/images/wallet.png"
                    width={18}
                    height={18}
                    alt="monthly"
                  />
                  Monthly
                </button>

                <button
                  onClick={() => setBillingPeriod("Yearly")}
                  className={`flex items-center font-normal heading-6 gap-2 px-4 py-2 cursor-pointer transition-colors duration-200 relative z-10 flex-1 rounded-md ${
                    billingPeriod === "Yearly" ? "text-[#111827]" : "text-gray-600 hover:text-gray-800"
                  }`}
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
          </div>
          <motion.div 
            className="min-w-full sm:min-w-[120px] pb-3 sm:pb-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <PrimaryBtn 
              label="Add plan" 
              imageSrc="/images/arrow-right.svg" 
              imagePosition="right" 
              onClick={handleAddDrawer}
            />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={billingPeriod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
          >
            {plans.map((plan, index) => {
              const { price, percentage } = getPlanPrice(plan);

              return (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <PricingCard
                    title={plan.title}
                    showFeature={true}
                    description={plan.description}
                    descriptionClass="pt-3"
                    priceSpacing="mt-3"
                    price={price}
                    percentage={percentage}
                    buttonText="Edit"
                    features={plan.features}
                    isProfessionalPlan={plan.isProfessionalPlan || false}
                    onBuyNow={() => handleEditDrawer(plan)}
                    bgColor={"bg-white"}
                    textColor={"text-[#111827]"}
                    titleColor={"text-[#111827]"}
                    descriptionColor={"text-[#70747D]"}
                    priceColor={"text-[#111827]"}
                    periodColor={"text-gray-600"}
                    featureColor={"text-black"}
                    buttonBg={"bg-[#11224E1F] flex items-center"}
                    buttonTextColor={"text-[#11224E] heading-7"}
                    enableHoverEffects={false}
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
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="my-5"></div>

      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Complete your payment"
        message="Securely subscribe to your selected plan through Stripe. You'll be redirected to the payment page to complete your purchase."
        confirmText="Pay $12"
        cancelText="Go back"
        icon="/images/pricing-modal.png"
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
      
      <AnimatePresence>
        {isAddDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 min-h-screen bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddDrawerOpen(false)}
            />
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <AddPlanDrawer onClose={handleAddDrawer} onAddPlan={handleAddNewPlan} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditDrawerOpen && editingPlan && (
          <>
            <motion.div
              className="fixed inset-0 min-h-screen bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseEditDrawer}
            />
            <motion.div
              className="bg-white w-[91vw] md:w-[40vw] top-0 overflow-auto hide-scrollbar fixed right-0 h-full z-50 pb-5 rounded-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <EditPlanDrawer 
                onClose={handleCloseEditDrawer} 
                onUpdatePlan={handleUpdatePlan}
                initialData={extractPlanDataForEdit(editingPlan)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionCards;