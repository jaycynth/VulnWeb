'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NotifyError, NotifySuccess } from "@/components/Toast/Notification";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Cookies from "js-cookie";

export default function Dashboard() {
    const token =  Cookies.get("Token")
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
      alert("Please upload a document.");
      return;
    }

    const formData = new FormData();
    formData.append("document", image);
    formData.append("kyc_data", JSON.stringify({
      document_type: "jpg",
      document_number: "82892",
      issue_date: "2024-06-14",
      expiry_date: "2024-06-14"
    }));

    fetch('http://localhost:8888/api/kyc', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        NotifySuccess('Document uploaded successfully!');
      })
      .catch(error => {
        console.error('Error uploading document:', error);
        NotifyError('Error uploading document. Please try again.');
      });
  };


  return (
    <DefaultLayout>
      <div className="max-w-md mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
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
              <img
                src={preview}
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
