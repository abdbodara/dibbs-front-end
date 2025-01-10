"use client";
import { addFaq, fetchFaqs, updateFaq } from "@/store/slices/faqslice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const faqId = parseInt(params.addnew);
  const { data, loading, error } = useSelector((state) => state.faqs);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    status: "",
  });
  const currentPage = useSelector((state) => state.customer?.currentPage);

  useEffect(() => {
    dispatch(fetchFaqs(currentPage));
  }, [dispatch]);

  useEffect(() => {
    if (faqId && data?.data?.length > 0) {
      const faq = data?.data?.find((f) => f.auto_id === parseInt(faqId));
      if (faq) {
        setFormData({
          question: faq.question,
          answer: faq.answer,
          status: faq.status,
        });
      }
    }
  }, [faqId, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (faqId) {
        await dispatch(
          updateFaq({
            faqId,
            faqData: {
              question: formData.question,
              answer: formData.answer,
              status: formData.status,
            },
          })
        ).unwrap();
        toast.success("FAQ updated successfully!");
      } else {
        await dispatch(
          addFaq({
            question: formData.question,
            answer: formData.answer,
            status: formData.status,
          })
        ).unwrap();
        toast.success("FAQ added successfully!");
      }

      setFormData({ question: "", answer: "", status: "" });
      router.push("/admin/faqs");
    } catch (error) {
      toast.error(error?.message || "Failed to save FAQ");
    }
  };

  return (
    <div className="h-screen">
      <h6 className="text-[30px] font-[600] mb-[25px]">FAQs</h6>
      <div className="shadow-custom w-full flex bg-white my-16  p-[30px]">
        <div className="mx-auto w-full lg:w-auto">
          <h4 className="mb-3 text-[#3d4465]">Add / Update FAQs</h4>
          <form className="w-full xl:w-[725px]">
            <p
              className="text-grey text-[16px] capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Question
            </p>
            <input
              type="text"
              className="border-[1px] w-full border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="Enter Question"
              required=""
            />

            <p
              className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Answer
            </p>
            <textarea
              name="answer"
              className="border-[1px]  w-full border-[#f0f1f5] min-h-[50px] focus:outline-none p-[6px_12px]"
              value={formData.answer}
              onChange={handleInputChange}
              placeholder="Enter Answer"
              required=""
            />

            <p
              className="text-grey text-[16px] mt-3 capitalize font-[400] mb-[8px]"
              htmlFor="caption"
            >
              Status
            </p>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border-[1px] w-full bg-white border-[#f0f1f5] h-[56px] focus:outline-none p-[6px_12px]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <hr className="my-4" />
            <button
              className="bg-sky w-full h-[61px] capitalize text-[18px] rounded-3xl text-white"
              type="submit"
              onClick={handleSubmit}
            >
              Add/Update FAQs
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
