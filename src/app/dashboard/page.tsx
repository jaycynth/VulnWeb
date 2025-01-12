"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  NotifyError,
  NotifySuccess,
  NotifyWarning,
} from "@/components/Toast/Notification";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function Dashboard() {
  const token = Cookies.get("Token");

  const { userData } = useUser();
  console.log(userData);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [documentNumber, setDocumentNumber] = useState("");
  const [documentType, setDocumentType] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      NotifyWarning("Please upload a document.");
      return;
    }

    const formData = new FormData();
    formData.append("document", image);
    formData.append(
      "kyc_data",
      JSON.stringify({
        document_type: documentType,
        document_number: documentNumber,
        issue_date: "2024-06-14",
        expiry_date: "2024-06-14",
      })
    );

    fetch(`${process.env.NEXT_PUBLIC_API_URL}kyc`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        NotifySuccess("Document uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading document:", error);
        NotifyError("Error uploading document. Please try again.");
      });
  };

  return (
    <DefaultLayout>
      <h1 className="text-black  text-2xl">Upload your documents</h1>

      <div className="max-w-md mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Document Number
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Document Number"
                value={documentNumber}
                required
                onChange={(e) => setDocumentNumber(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Document Type
            </label>
            <div className="relative">
              <select
                value={documentType}
                required
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="" disabled>
                  Select Document Type
                </option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {preview && (
            <div className="mb-4">
              <Image
                src={preview}
                width={100}
                height={100}
                alt="Image Preview"
                className="w-full h-auto"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
