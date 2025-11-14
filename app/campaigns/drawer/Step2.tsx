import Input from "@/app/ui/Input";
import Image from "next/image";

const Step2 = () => {
  return (
    <div className="space-y-8 pt-8">
      <div className="space-y-6">
        <h1 className="font-medium body-3 text-[#111827]">Email setup</h1>
        <div>
          <div className="flex items-start gap-3 p-3 bg-[#FEEFE4] border border-transparent hover:border-[#f8a86f] rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.10) inset]">
            <Image
              src="/images/select-template.svg"
              width={48}
              height={48}
              alt="check"
            />
            <div className="space-y-1">
              <h2 className="heading-5 text-[#111827]">Select template</h2>
              <p className="body-4 text-[#70747D]">
                Choose from your saved email templates to get started quickly.
              </p>
            </div>
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="#F87B1B"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="font-medium body-3 text-[#111827]">Schedule</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            title="Start date"
            placeholder="Enter Start date"
            className="w-full"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            title="Time"
            placeholder="Enter Time"
            className="w-full"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            title="Follow-ups"
            placeholder="Choose Follow-ups"
            className="w-full"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            title="Follow-up interval"
            placeholder="Choose Follow-up interval"
            className="w-full"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            title="Frequency"
            placeholder="Choose Frequency"
            className="w-full"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
