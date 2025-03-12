// import React, { useState } from "react";
import { updateProfile } from "../../services/Api";
import img from "../../assets/ez-logo.jpg";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
interface ProfileState {
  full_name: string;
  phone_number: string;
  shop_number: string;
  country: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  profileimage?: string;
}
const UpdateProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileState>({
    full_name: "",
    phone_number: "",
    shop_number: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    profileimage: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const navigate = useNavigate();

  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle profile update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(profile).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (selectedImage) {
      formData.append("profile_image", selectedImage);
    }
    try {
        const response = await updateProfile(formData);
        console.log("full Response",response);
        const profileImage = response?.data?.profile_image || response?.profile_image;
        if (profileImage) {
          // alert("Profile updated successfully!");
          setProfile((prev) => ({ ...prev, profile_image:profileImage }));
        } else {
          console.error("Profile image not found in response:", response);
          alert("Profile updated, but image not found.");
        }
      } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update profile.");
      }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-b from-[#d4d6d8] to-[#bbdefb] shadow-md rounded-lg">
      <IoIosArrowBack onClick={()=>navigate('/profile')}/>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Update Profile</h2>

      {/* Profile Image Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24">
          <img
            src={previewImage || profile.profileimage || img}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
          />
          <input type="file" accept="image/*" className="hidden" id="fileInput" onChange={handleImageChange} />
          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
          >
            📷
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="full_name" placeholder="Full Name" value={profile.full_name} onChange={handleChange} required className="w-full p-3 border rounded-md" />
        <input type="text" name="phone_number" placeholder="Phone Number" value={profile.phone_number} onChange={handleChange} required className="w-full p-3 border rounded-md" />
        <input type="text" name="shop_number" placeholder="Shop Name" value={profile.shop_number} onChange={handleChange} required className="w-full p-3 border rounded-md" />
        <input type="text" name="country" placeholder="Country" value={profile.country} onChange={handleChange} required className="w-full p-3 border rounded-md" />
        <input type="text" name="state" placeholder="State" value={profile.state} onChange={handleChange} required className="w-full p-3 border rounded-md" />
        <input type="text" name="city" placeholder="City" value={profile.city} onChange={handleChange} required className="w-full p-3 border rounded-md" />
        <input type="text" name="address" placeholder="Address" value={profile.address} onChange={handleChange} required className="w-full p-3 border rounded-md" />
        <input type="text" name="pincode" placeholder="Pincode" value={profile.pincode} onChange={handleChange} required className="w-full p-3 border rounded-md" />

        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
