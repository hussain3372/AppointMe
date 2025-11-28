// "use client";
// import React, { useState, useRef, ChangeEvent } from "react";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
// import Image from "next/image";
// import ConfirmationModal from "@/app/shared/ConfirmationModal";
// import ActionDropdown from "@/app/shared/ActionDropdown";
// import Link from "next/link";
// import { LucideMenu } from "lucide-react";

// interface UploadedFile {
//   name: string;
//   type: string;
//   preview: string | null;
//   isImage: boolean;
// }

// interface Message {
//   id: string;
//   type: "user" | "ai";
//   content?: string;
//   file?: UploadedFile;
// }

// const chats = [
//   {
//     messages: [
//       "Icons names ...",
//       "Write description...",
//       "Job search......",
//       "Keyword suggestions ...",
//       "AI tools...",
//       "Icons names...",
//       "AI tools...",
//       "Job search...",
//       "Icons name...",
//       "Job search ...",
//       "Icons names...",
//       "Job search...",
//       "AI tools...",
//       "Icons names ...",
//     ],
//   },
// ];

// const Skeleton = () => (
//   <motion.div
//     className="space-y-3 w-full"
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//   >
//     {[1, 2, 3].map((i) => (
//       <motion.div
//         key={i}
//         className="h-4 bg-gray-200 rounded"
//         style={{ width: `${100 - i * 20}%` }}
//         animate={{ opacity: [0.5, 1, 0.5] }}
//         transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//       />
//     ))}
//   </motion.div>
// );

// const FileIcon = ({ type }: { type: string }) => {
//   const getIcon = () => {
//     if (type.includes("pdf")) return "📄";
//     if (type.includes("video")) return "🎬";
//     if (type.includes("audio")) return "🎵";
//     if (type.includes("zip") || type.includes("rar")) return "📦";
//     if (type.includes("text") || type.includes("doc")) return "📝";
//     if (type.includes("sheet") || type.includes("excel")) return "📊";
//     return "📎";
//   };
//   return <span className="text-2xl">{getIcon()}</span>;
// };

// export default function Content() {
//   const [inputValue, setInputValue] = useState("");
//   const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
//   const [isHoveringFile, setIsHoveringFile] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   // const [isLiked, setIsLiked] = useState(false);
//   // const [isDisLiked, setIsDisLiked] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [messageReactions, setMessageReactions] = useState<{
//   [key: string]: { liked: boolean; disliked: boolean };
// }>({});
//   const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const OpenModal = () => {
//     setIsModalOpen(true);
//   };
//   const CloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const [editableIndex, setEditableIndex] = useState<number | null>(null);
//   const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);

//   const handleEdit = (index: number) => {
//     setEditableIndex(index);
//     // Use setTimeout to ensure the element is rendered and focusable
//     setTimeout(() => {
//       titleRefs.current[index]?.focus();
//     }, 0);
//   };

//   const handleBlur = () => {
//     setEditableIndex(null);
//   };

//   const handleKey = (e: React.KeyboardEvent, index: number) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       setEditableIndex(null);
//     }
//   };

//   const showIntro = messages.length === 0 && !isLoading;

//   const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setInputValue(e.target.value);
//   };

//  const handleLike = (messageId: string) => {
//   setMessageReactions(prev => ({
//     ...prev,
//     [messageId]: { 
//       liked: !prev[messageId]?.liked, 
//       disliked: false 
//     }
//   }));
// };

// const handleDisLike = (messageId: string) => {
//   setMessageReactions(prev => ({
//     ...prev,
//     [messageId]: { 
//       liked: false, 
//       disliked: !prev[messageId]?.disliked 
//     }
//   }));
// };

//   const handleCopy = (messageId: string, content: string = "") => {
//     navigator.clipboard
//       .writeText(
//         content ||
//           "Thanks for trying this chatbot but its still in building process and will be available soon . Thanks for your patience"
//       )
//       .then(() => {
//         setCopiedMessageId(messageId);
//         setTimeout(() => setCopiedMessageId(null), 2000);
//       });
//   };

//   const handleRegenerate = () => {
//     // Find the last user message
//     const lastUserMessage = [...messages]
//       .reverse()
//       .find((msg) => msg.type === "user");

//     if (lastUserMessage) {
//       // Remove only the last AI response
//       const updatedMessages = messages.filter(
//         (msg) =>
//           msg.type !== "ai" || msg.id !== messages[messages.length - 1].id
//       );
//       setMessages(updatedMessages);

//       // Simulate AI response with the same static message
//       setIsLoading(true);
//       setTimeout(() => {
//         setIsLoading(false);
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: `ai-${Date.now()}`,
//             type: "ai",
//             content:
//               "Thanks for trying this chatbot but its still in building process and will be available soon . Thanks for your patience",
//           },
//         ]);
//       }, 2000);
//     }
//   };

  

//  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;
//   if (!files) return;
  
//   Array.from(files).forEach(file => {
//     const isImage = file.type.startsWith("image/");
//     if (isImage) {
//       const reader = new FileReader();
//       reader.onload = (ev: ProgressEvent<FileReader>) => {
//         const result = ev.target?.result;
//         if (typeof result === "string") {
//           setUploadedFiles(prev => [...prev, {
//             name: file.name,
//             type: file.type,
//             preview: result,
//             isImage: true,
//           }]);
//         }
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setUploadedFiles(prev => [...prev, {
//         name: file.name,
//         type: file.type,
//         preview: null,
//         isImage: false,
//       }]);
//     }
//   });
// };

//  const handleRemoveFile = (index: number) => {
//   setUploadedFiles(prev => prev.filter((_, i) => i !== index));
// };

//   const sidebarVariants: Variants = {
//     open: {
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//     closed: {
//       x: "-100%",
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30,
//       },
//     },
//   };

//   const handleSend = () => {
//     if (!inputValue.trim() && !uploadedFile) return;
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       type: "user",
//       content: inputValue.trim() || undefined,
//       file: uploadedFile || undefined,
//     };
//     setMessages((prev) => [...prev, newMessage]);
//     setInputValue("");
//     setUploadedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: `ai-${Date.now()}`,
//           type: "ai",
//           content:
//             "Thanks for trying this chatbot but its still in building process and will be available soon . Thanks for your patience",
//         },
//       ]);
//     }, 1000);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const AIActions = (index: number) => (
//     <ul className="py-1 text-sm text-gray-700">
//       <li>
//         <button
//           onClick={() => handleEdit(index)}
//           className="w-full text-left px-4 py-2 hover:bg-gray-100"
//         >
//           Rename
//         </button>
//       </li>

//       <li>
//         <button
//           onClick={OpenModal}
//           className="w-full text-left px-4 py-2 hover:bg-gray-100 "
//         >
//           Delete
//         </button>
//       </li>
//     </ul>
//   );

//   return (
//     <div className="h-screen p-5 flex flex-col justify-between sm:max-h-[calc(100vh-100px)] overflow-auto  bg-[#fef4ed]">
//       <button
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         className="p-2 inline lg:hidden bg-white  mb-3 w-[45px] rounded-md shadow-md border border-[#E2E3E5]"
//       >
//         <LucideMenu />
//       </button>
//       <div className="lg:hidden relative top-4 left-4 ">
//         {isModalOpen && (
//           <ConfirmationModal
//             onConfirm={CloseModal}
//             onClose={CloseModal}
//             cancelText="Cancel"
//             isOpen={isModalOpen}
//             title="Do you want to delete this chat"
//             confirmText="Delete"
//             icon="/images/delete.png"
//           />
//         )}

//         <AnimatePresence>
//           {isSidebarOpen && (
//             <motion.div
//               className="lg:hidden fixed inset-0 bg-black bg-opacity-50 overflow-auto z-40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsSidebarOpen(false)}
//             />
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <motion.div
//               className="lg:hidden  overflow-y-auto fixed left-0 top-0 h-full overflow-auto max-w-80 bg-white border-r border-[#E2E3E5] shadow-sm z-50 p-3"
//               variants={sidebarVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//             >
//               <div className="flex justify-end mb-4 lg:hidden">
//                 <button onClick={() => setIsSidebarOpen(false)} className="p-2">
//                   <Image
//                     src="/images/cross-notification.svg"
//                     alt="close"
//                     width={50}
//                     height={50}
//                   />
//                 </button>
//               </div>

//               <PrimaryBtn
//                 fontSize="12px"
//                 label="New chat"
//                 color="#FFFFFF"
//                 imageSrc="/images/arrow-right.svg"
//                 imagePosition="right"
//               />
//               <div className="pt-10 flex flex-col gap-1">
//                 {chats[0].messages.map((item, index) => (
//                   <div
//                     key={index}
//                     className="px-3 py-2 rounded-lg flex justify-between items-center max-h-[36px] group  hover:bg-[#F4F4F4]"
//                   >
//                     <p
//                       contentEditable={editableIndex === index}
//                       ref={(el) => {
//                         titleRefs.current[index] = el;
//                       }}
//                       onBlur={handleBlur}
//                       onKeyDown={(e) => handleKey(e, index)}
//                       className="heading-6 font-regular cursor-pointer  text-[#70747D]  outline-none "
//                       suppressContentEditableWarning={true}
//                     >
//                       {item}
//                     </p>
//                     <div className="hidden group-hover:block">
//                       <ActionDropdown
//                         row={""}
//                         actions={() => AIActions(index)}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <Link
//                 href="/ai-outreach/email-templates"
//                 className="mt-20 cursor-pointer flex items-center gap-2 bg-[#F4F4F4] border border-[#E2E3E5] rounded-md p-3"
//               >
//                 <Image
//                   src="/images/file-text.png"
//                   alt="templates"
//                   height={20}
//                   width={20}
//                 />
//                 <p className="heading-6 font-regular text-[#414652]">
//                   Email templates
//                 </p>
//               </Link>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//       <div
//         className={`flex ${
//           showIntro ? "h-1/2" : ""
//         }  flex-col  max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-368px)] hide-scrollbar justify-end items-center`}
//       >
//         <AnimatePresence mode="wait">
//           {showIntro ? (
//             <motion.div
//               key="intro"
//               className="space-y-7 flex flex-col items-center"
//               initial={{ opacity: 1, y: 0 }}
//               exit={{
//                 opacity: 0,
//                 y: -30,
//                 transition: { duration: 0.4, ease: "easeOut" },
//               }}
//             >
//               <img src="/images/ai-logo.png" alt="AI" height={56} width={56} />
//               <div className="space-y-2">
//                 <h2 className="heading-2 font-medium text-[#11224E] text-center">
//                   Reach leads. Build{" "}
//                   <span className="text-[#F87B1B]">connections.</span>
//                 </h2>
//                 <p className="heading-5 font-regular text-[#70747D] max-w-[532px] text-center">
//                   Create and send smart, personalized emails to your leads
//                   effortlessly to boost engagement and drive higher conversions.
//                 </p>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="messages"
//               className="w-full overflow-y-auto space-y-3 hide-scrollbar max-h-full pb-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <AnimatePresence>
//                 {messages.map((msg) => (
//                   <motion.div
//                     key={msg.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className={`flex ${
//                       msg.type === "user" ? "justify-end" : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`body-2 font-regular mt-3 sm:mt-0 rounded-2xl px-4 py-3 flex-wrap max-w-[500px] break-words whitespace-pre-wrap ${
//                         msg.type === "user"
//                           ? "bg-[#FFFFFF] text-[#70747D]"
//                           : "text-[#414652]"
//                       }`}
//                     >
//                       {msg.file && (
//                         <div className="mb-2 flex justify-center sm:justify-start">
//                           {msg.file.isImage && msg.file.preview ? (
//                             <Image
//                               src={msg.file.preview}
//                               alt={msg.file.name}
//                               height={64}
//                               width={64}
//                               className=" rounded-lg object-cover"
//                             />
//                           ) : (
//                             <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
//                               <FileIcon type={msg.file.type} />
//                               <span className="text-sm truncate max-w-[150px] wrap-break-word">
//                                 {msg.file.name}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                       {msg.content && (
//                         <p
//                           className={`text-sm ${
//                             msg.type === "user"
//                               ? "max-w-[200px] sm:max-w-none"
//                               : ""
//                           } `}
//                         >
//                           {msg.content}
//                         </p>
//                       )}
//                       <div
//                         className={` ${
//                           msg.type === "user" ? "hidden" : ""
//                         } flex pt-5 gap-3`}
//                       >
//                         <svg
//                           onClick={() => msg.type === 'ai' && handleLike(msg.id)}

//                           className="cursor-pointer"
//                           width="28"
//                           height="28"
//                           viewBox="0 0 28 28"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M9.83341 12.3327V22.3327M16.5001 8.89935L15.6667 12.3327H20.5251C20.7838 12.3327 21.039 12.3929 21.2704 12.5086C21.5019 12.6243 21.7032 12.7924 21.8584 12.9993C22.0137 13.2063 22.1186 13.4466 22.1649 13.7012C22.2111 13.9558 22.1975 14.2176 22.1251 14.466L20.1834 21.1327C20.0824 21.4789 19.8719 21.783 19.5834 21.9994C19.2949 22.2157 18.944 22.3327 18.5834 22.3327H7.33341C6.89139 22.3327 6.46746 22.1571 6.1549 21.8445C5.84234 21.532 5.66675 21.108 5.66675 20.666V13.9993C5.66675 13.5573 5.84234 13.1334 6.1549 12.8208C6.46746 12.5083 6.89139 12.3327 7.33341 12.3327H9.63341C9.94348 12.3325 10.2474 12.2459 10.5109 12.0824C10.7744 11.919 10.9871 11.6854 11.1251 11.4077L14.0001 5.66602C14.3931 5.67088 14.7799 5.76449 15.1316 5.93985C15.4833 6.1152 15.7909 6.36777 16.0313 6.67868C16.2716 6.9896 16.4387 7.35082 16.5199 7.73535C16.601 8.11989 16.5943 8.51779 16.5001 8.89935Z"
//                             stroke="#414652"
//                             fill={messageReactions[msg.id]?.liked ? "black" : ""}

//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                           />
//                         </svg>

//                         <svg
//                           onClick={() => msg.type === 'ai' && handleDisLike(msg.id)}

//                           className="cursor-pointer"
//                           width="28"
//                           height="28"
//                           viewBox="0 0 28 28"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M18.1667 15.666V5.66602M11.5 19.0994L12.3333 15.666H7.47502C7.21627 15.666 6.96109 15.6058 6.72966 15.4901C6.49823 15.3743 6.29693 15.2063 6.14168 14.9993C5.98644 14.7924 5.88152 14.5521 5.83523 14.2975C5.78895 14.0429 5.80257 13.7811 5.87502 13.5327L7.81668 6.86602C7.91766 6.51982 8.12819 6.21572 8.41668 5.99935C8.70518 5.78298 9.05607 5.66602 9.41668 5.66602H20.6667C21.1087 5.66602 21.5326 5.84161 21.8452 6.15417C22.1578 6.46673 22.3333 6.89065 22.3333 7.33268V13.9993C22.3333 14.4414 22.1578 14.8653 21.8452 15.1779C21.5326 15.4904 21.1087 15.666 20.6667 15.666H18.3667C18.0566 15.6662 17.7527 15.7528 17.4892 15.9162C17.2257 16.0797 17.013 16.3133 16.875 16.591L14 22.3327C13.607 22.3278 13.2202 22.2342 12.8685 22.0589C12.5168 21.8835 12.2092 21.6309 11.9688 21.32C11.7284 21.0091 11.5614 20.6479 11.4802 20.2633C11.3991 19.8788 11.4058 19.4809 11.5 19.0994Z"
//                             stroke="#414652"
//                             fill={messageReactions[msg.id]?.disliked ? "black" : ""}

//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                           />
//                         </svg>
//                         <div className="bg-[#FFFFFF] p-1 rounded-sm">
//                           <Image
//                             className="cursor-pointer"
//                             src="/images/copy.svg"
//                             alt="copy"
//                             height={20}
//                             width={20}
//                             onClick={() => handleCopy(msg.id, msg.content)}
//                           />
//                         </div>
//                         {msg.type === "ai" && (
//                           <Image
//                             className="cursor-pointer"
//                             src="/images/regenerate.png"
//                             alt="regenerate"
//                             height={28}
//                             width={28}
//                             onClick={handleRegenerate}
//                           />
//                         )}
//                       </div>
//                       {copiedMessageId === msg.id && (
//                         <motion.div
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0 }}
//                           className="text-xs text-green-600 mt-2"
//                         >
//                           Copied!
//                         </motion.div>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               <AnimatePresence>
//                 {isLoading && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="flex justify-start"
//                   >
//                     <div className="bg-white shadow-md rounded-2xl px-4 py-3 w-64">
//                       <Skeleton />
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <div className="flex h-1/2 flex-col justify-end items-center">
//         <div className="bg-white rounded-3xl w-full p-4">
//           <div className="relative">
//             <textarea
//               placeholder='"Write a welcome email for new leads...."'
//               rows={4}
//               value={inputValue}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//               name="Prompt section"
//               id="Prompt manager"
//               className="w-full body-2 font-regular placeholder:text-[#70747D] outline-none resize-none bg-[#F5F5F5] p-4 rounded-2xl border border-[#00000014] hide-scrollbar"
//               style={{ paddingBottom: "16px" }}
//             />
//           <AnimatePresence>
//   <div className="flex flex-wrap gap-2">
//     {uploadedFiles.map((file, index) => (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md cursor-pointer"
//         onMouseEnter={() => setIsHoveringFile(true)}
//         onMouseLeave={() => setIsHoveringFile(false)}
//         onClick={() => handleRemoveFile(index)}
//       >
//         {file.isImage && file.preview ? (
//           <>
//             <img
//               src={file.preview}
//               alt={`Uploaded preview ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//             <AnimatePresence>
//               {isHoveringFile && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//                 >
//                   <span className="text-white text-2xl font-bold">×</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </>
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F5] border border-[#00000014] relative">
//             <FileIcon type={file.type} />
//             <span className="text-[8px] text-[#70747D] truncate max-w-[56px] px-1">
//               {file.name}
//             </span>
//             <AnimatePresence>
//               {isHoveringFile && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center"
//                 >
//                   <span className="text-white text-xl font-bold">×</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         )}
//       </motion.div>
//     ))}
//   </div>
// </AnimatePresence>
//           </div>
//           <div className="flex justify-between">
//             <div
//               className="flex gap-2 p-3 cursor-pointer rounded-lg bg-white shadow-lg items-center"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <div className="bg-[#F87B1B] rounded-sm p-1">
//                 <img
//                   src="/images/file.svg"
//                   alt="upload something"
//                   height={16}
//                   width={16}
//                 />
//               </div>
//               <p className="heading-5 font-medium text-[#000000CC]">Upload</p>
//             </div>
//           <input
//   ref={fileInputRef}
//   type="file"
//   accept="*/*"
//   multiple  // Add this
//   onChange={handleFileUpload}
//   className="hidden"
// />

//             <div className="max-w-[77px]">
//               <PrimaryBtn
//                 fontSize="12px"
//                 onClick={handleSend}
//                 color="#FFFFFF"
//                 imageSrc="/images/arrow-right.svg"
//                 imagePosition="right"
//                 label="Send"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import PrimaryBtn from "@/app/ui/buttons/PrimaryBtn";
import Image from "next/image";
import ConfirmationModal from "@/app/shared/ConfirmationModal";
import ActionDropdown from "@/app/shared/ActionDropdown";
import Link from "next/link";
import { LucideMenu } from "lucide-react";

interface UploadedFile {
  name: string;
  type: string;
  preview: string | null;
  isImage: boolean;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content?: string;
  files?: UploadedFile[];
}

const chats = [
  {
    messages: [
      "Icons names ...",
      "Write description...",
      "Job search......",
      "Keyword suggestions ...",
      "AI tools...",
      "Icons names...",
      "AI tools...",
      "Job search...",
      "Icons name...",
      "Job search ...",
      "Icons names...",
      "Job search...",
      "AI tools...",
      "Icons names ...",
    ],
  },
];

const Skeleton = () => (
  <motion.div
    className="space-y-3 w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="h-4 bg-gray-200 rounded"
        style={{ width: `${100 - i * 20}%` }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </motion.div>
);

const FileIcon = ({ type }: { type: string }) => {
  const getIcon = () => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("video")) return "🎬";
    if (type.includes("audio")) return "🎵";
    if (type.includes("zip") || type.includes("rar")) return "📦";
    if (type.includes("text") || type.includes("doc")) return "📝";
    if (type.includes("sheet") || type.includes("excel")) return "📊";
    return "📎";
  };
  return <span className="text-2xl">{getIcon()}</span>;
};

export default function Content() {
  const [inputValue, setInputValue] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [hoveredFileIndex, setHoveredFileIndex] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messageReactions, setMessageReactions] = useState<{
    [key: string]: { liked: boolean; disliked: boolean };
  }>({});
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };
  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const handleEdit = (index: number) => {
    setEditableIndex(index);
    setTimeout(() => {
      titleRefs.current[index]?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setEditableIndex(null);
  };

  const handleKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditableIndex(null);
    }
  };

  const showIntro = messages.length === 0 && !isLoading;

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleLike = (messageId: string) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: { 
        liked: !prev[messageId]?.liked, 
        disliked: false 
      }
    }));
  };

  const handleDisLike = (messageId: string) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: { 
        liked: false, 
        disliked: !prev[messageId]?.disliked 
      }
    }));
  };

  const handleCopy = (messageId: string, content: string = "") => {
    navigator.clipboard
      .writeText(
        content ||
          "Thanks for trying this chatbot but its still in building process and will be available soon . Thanks for your patience"
      )
      .then(() => {
        setCopiedMessageId(messageId);
        setTimeout(() => setCopiedMessageId(null), 2000);
      });
  };

  const handleRegenerate = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.type === "user");

    if (lastUserMessage) {
      const updatedMessages = messages.filter(
        (msg) =>
          msg.type !== "ai" || msg.id !== messages[messages.length - 1].id
      );
      setMessages(updatedMessages);

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            type: "ai",
            content:
              "Thanks for trying this chatbot but its still in building process and will be available soon . Thanks for your patience",
          },
        ]);
      }, 2000);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const isImage = file.type.startsWith("image/");
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          const result = ev.target?.result;
          if (typeof result === "string") {
            setUploadedFiles(prev => [...prev, {
              name: file.name,
              type: file.type,
              preview: result,
              isImage: true,
            }]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setUploadedFiles(prev => [...prev, {
          name: file.name,
          type: file.type,
          preview: null,
          isImage: false,
        }]);
      }
    });
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const sidebarVariants: Variants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const handleSend = () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim() || undefined,
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setUploadedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          type: "ai",
          content:
            "Thanks for trying this chatbot but its still in building process and will be available soon . Thanks for your patience",
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const AIActions = (index: number) => (
    <ul className="py-1 text-sm text-gray-700">
      <li>
        <button
          onClick={() => handleEdit(index)}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Rename
        </button>
      </li>

      <li>
        <button
          onClick={OpenModal}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 "
        >
          Delete
        </button>
      </li>
    </ul>
  );

  return (
    <div className="h-screen p-5 flex flex-col justify-between sm:max-h-[calc(100vh-100px)] overflow-auto  bg-[#fef4ed]">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 inline lg:hidden bg-white  mb-3 w-[45px] rounded-md shadow-md border border-[#E2E3E5]"
      >
        <LucideMenu />
      </button>
      <div className="lg:hidden relative top-4 left-4 ">
        {isModalOpen && (
          <ConfirmationModal
            onConfirm={CloseModal}
            onClose={CloseModal}
            cancelText="Cancel"
            isOpen={isModalOpen}
            title="Do you want to delete this chat"
            confirmText="Delete"
            icon="/images/delete.png"
          />
        )}

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 overflow-auto z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="lg:hidden  overflow-y-auto fixed left-0 top-0 h-full overflow-auto max-w-80 bg-white border-r border-[#E2E3E5] shadow-sm z-50 p-3"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex justify-end mb-4 lg:hidden">
                <button onClick={() => setIsSidebarOpen(false)} className="p-2">
                  <Image
                    src="/images/cross-notification.svg"
                    alt="close"
                    width={50}
                    height={50}
                  />
                </button>
              </div>

              <PrimaryBtn
                fontSize="12px"
                label="New chat"
                color="#FFFFFF"
                imageSrc="/images/arrow-right.svg"
                imagePosition="right"
              />
              <div className="pt-10 flex flex-col gap-1">
                {chats[0].messages.map((item, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-lg flex justify-between items-center max-h-[36px] group  hover:bg-[#F4F4F4]"
                  >
                    <p
                      contentEditable={editableIndex === index}
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                      onBlur={handleBlur}
                      onKeyDown={(e) => handleKey(e, index)}
                      className="heading-6 font-regular cursor-pointer  text-[#70747D]  outline-none "
                      suppressContentEditableWarning={true}
                    >
                      {item}
                    </p>
                    <div className="hidden group-hover:block">
                      <ActionDropdown
                        row={""}
                        actions={() => AIActions(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/ai-outreach/email-templates"
                className="mt-20 cursor-pointer flex items-center gap-2 bg-[#F4F4F4] border border-[#E2E3E5] rounded-md p-3"
              >
                <Image
                  src="/images/file-text.png"
                  alt="templates"
                  height={20}
                  width={20}
                />
                <p className="heading-6 font-regular text-[#414652]">
                  Email templates
                </p>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        className={`flex ${
          showIntro ? "h-1/2" : ""
        }  flex-col  max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-368px)] hide-scrollbar justify-end items-center`}
      >
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              className="space-y-7 flex flex-col items-center"
              initial={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -30,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              <img src="/images/ai-logo.png" alt="AI" height={56} width={56} />
              <div className="space-y-2">
                <h2 className="heading-2 font-medium text-[#11224E] text-center">
                  Reach leads. Build{" "}
                  <span className="text-[#F87B1B]">connections.</span>
                </h2>
                <p className="heading-5 font-regular text-[#70747D] max-w-[532px] text-center">
                  Create and send smart, personalized emails to your leads
                  effortlessly to boost engagement and drive higher conversions.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              className="w-full overflow-y-auto space-y-3 hide-scrollbar max-h-full pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`body-2 font-regular mt-3 sm:mt-0 rounded-2xl px-4 py-3 flex-wrap max-w-[500px] break-words whitespace-pre-wrap ${
                        msg.type === "user"
                          ? "bg-[#FFFFFF] text-[#70747D]"
                          : "text-[#414652]"
                      }`}
                    >
                      {msg.files && msg.files.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                          {msg.files.map((file, index) => (
                            <div key={index} className="flex justify-center sm:justify-start">
                              {file.isImage && file.preview ? (
                                <Image
                                  src={file.preview}
                                  alt={file.name}
                                  height={64}
                                  width={64}
                                  className="rounded-lg object-cover"
                                />
                              ) : (
                                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
                                  <FileIcon type={file.type} />
                                  <span className="text-sm truncate max-w-[150px] wrap-break-word">
                                    {file.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {msg.content && (
                        <p
                          className={`body-2 font-normal ${
                            msg.type === "user"
                              ? "max-w-[200px] sm:max-w-none"
                              : ""
                          } `}
                        >
                          {msg.content}
                        </p>
                      )}
                      <div
                        className={` ${
                          msg.type === "user" ? "hidden" : ""
                        } flex pt-5 gap-3`}
                      >
                        <svg
                          onClick={() => msg.type === 'ai' && handleLike(msg.id)}
                          className="cursor-pointer"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.83341 12.3327V22.3327M16.5001 8.89935L15.6667 12.3327H20.5251C20.7838 12.3327 21.039 12.3929 21.2704 12.5086C21.5019 12.6243 21.7032 12.7924 21.8584 12.9993C22.0137 13.2063 22.1186 13.4466 22.1649 13.7012C22.2111 13.9558 22.1975 14.2176 22.1251 14.466L20.1834 21.1327C20.0824 21.4789 19.8719 21.783 19.5834 21.9994C19.2949 22.2157 18.944 22.3327 18.5834 22.3327H7.33341C6.89139 22.3327 6.46746 22.1571 6.1549 21.8445C5.84234 21.532 5.66675 21.108 5.66675 20.666V13.9993C5.66675 13.5573 5.84234 13.1334 6.1549 12.8208C6.46746 12.5083 6.89139 12.3327 7.33341 12.3327H9.63341C9.94348 12.3325 10.2474 12.2459 10.5109 12.0824C10.7744 11.919 10.9871 11.6854 11.1251 11.4077L14.0001 5.66602C14.3931 5.67088 14.7799 5.76449 15.1316 5.93985C15.4833 6.1152 15.7909 6.36777 16.0313 6.67868C16.2716 6.9896 16.4387 7.35082 16.5199 7.73535C16.601 8.11989 16.5943 8.51779 16.5001 8.89935Z"
                            stroke="#414652"
                            fill={messageReactions[msg.id]?.liked ? "black" : ""}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <svg
                          onClick={() => msg.type === 'ai' && handleDisLike(msg.id)}
                          className="cursor-pointer"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.1667 15.666V5.66602M11.5 19.0994L12.3333 15.666H7.47502C7.21627 15.666 6.96109 15.6058 6.72966 15.4901C6.49823 15.3743 6.29693 15.2063 6.14168 14.9993C5.98644 14.7924 5.88152 14.5521 5.83523 14.2975C5.78895 14.0429 5.80257 13.7811 5.87502 13.5327L7.81668 6.86602C7.91766 6.51982 8.12819 6.21572 8.41668 5.99935C8.70518 5.78298 9.05607 5.66602 9.41668 5.66602H20.6667C21.1087 5.66602 21.5326 5.84161 21.8452 6.15417C22.1578 6.46673 22.3333 6.89065 22.3333 7.33268V13.9993C22.3333 14.4414 22.1578 14.8653 21.8452 15.1779C21.5326 15.4904 21.1087 15.666 20.6667 15.666H18.3667C18.0566 15.6662 17.7527 15.7528 17.4892 15.9162C17.2257 16.0797 17.013 16.3133 16.875 16.591L14 22.3327C13.607 22.3278 13.2202 22.2342 12.8685 22.0589C12.5168 21.8835 12.2092 21.6309 11.9688 21.32C11.7284 21.0091 11.5614 20.6479 11.4802 20.2633C11.3991 19.8788 11.4058 19.4809 11.5 19.0994Z"
                            stroke="#414652"
                            fill={messageReactions[msg.id]?.disliked ? "black" : ""}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="bg-[#FFFFFF] p-1 rounded-sm">
                          <Image
                            className="cursor-pointer"
                            src="/images/copy.svg"
                            alt="copy"
                            height={20}
                            width={20}
                            onClick={() => handleCopy(msg.id, msg.content)}
                          />
                        </div>
                        {msg.type === "ai" && (
                          <Image
                            className="cursor-pointer"
                            src="/images/regenerate.png"
                            alt="regenerate"
                            height={28}
                            width={28}
                            onClick={handleRegenerate}
                          />
                        )}
                      </div>
                      {copiedMessageId === msg.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-green-600 mt-2"
                        >
                          Copied!
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white shadow-md rounded-2xl px-4 py-3 w-64">
                      <Skeleton />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex h-1/2 flex-col justify-end items-center">
        <div className="bg-white rounded-3xl w-full p-4">
          <div className="relative">
            <textarea
              placeholder='"Write a welcome email for new leads...."'
              rows={4}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              name="Prompt section"
              id="Prompt manager"
              className="w-full body-2 font-regular placeholder:text-[#70747D] outline-none resize-none bg-[#F5F5F5] p-4 rounded-2xl border border-[#00000014] hide-scrollbar"
              style={{ paddingBottom: "16px" }}
            />
            <AnimatePresence>
              <div className="flex flex-wrap gap-2 mt-2">
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-16 h-16 rounded-lg overflow-hidden shadow-md cursor-pointer"
                    onMouseEnter={() => setHoveredFileIndex(index)}
                    onMouseLeave={() => setHoveredFileIndex(null)}
                    onClick={() => handleRemoveFile(index)}
                  >
                    {file.isImage && file.preview ? (
                      <>
                        <img
                          src={file.preview}
                          alt={`Uploaded preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <AnimatePresence>
                          {hoveredFileIndex === index && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                            >
                              <span className="text-white text-2xl font-bold">×</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F5] border border-[#00000014] relative">
                        <FileIcon type={file.type} />
                        <span className="text-[8px] text-[#70747D] truncate max-w-[56px] px-1">
                          {file.name}
                        </span>
                        <AnimatePresence>
                          {hoveredFileIndex === index && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center"
                            >
                              <span className="text-white text-xl font-bold">×</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
          <div className="flex justify-between">
            <div
              className="flex gap-2 p-3 cursor-pointer rounded-lg bg-white shadow-lg items-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="bg-[#F87B1B] rounded-sm p-1">
                <img
                  src="/images/file.svg"
                  alt="upload something"
                  height={16}
                  width={16}
                />
              </div>
              <p className="heading-5 font-medium text-[#000000CC]">Upload</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="*/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="max-w-[77px]">
              <PrimaryBtn
                fontSize="12px"
                onClick={handleSend}
                color="#FFFFFF"
                imageSrc="/images/arrow-right.svg"
                imagePosition="right"
                label="Send"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}