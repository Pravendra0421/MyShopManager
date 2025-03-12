import { IoIosArrowForward } from "react-icons/io";
import { GiShop } from "react-icons/gi";
import { FaMapMarkerAlt, FaCity, FaFlag, FaMapPin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/Api";
import { useEffect, useState } from "react";
import img from "../../assets/ez-logo.jpg";

const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<{
        full_name?: string;
    profile_image?: string;
    shop_number?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    }|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#d4d6d8] to-[#bbdefb] p-5">
            {/* Header */}
            <div className="flex justify-between items-center">
                <img src={img} className="w-10 h-10 rounded-full" alt="Logo" />
                <h2 className="text-3xl font-bold">Profile</h2>
                <IoIosArrowForward className="text-2xl cursor-pointer" onClick={() => navigate('/')} />
            </div>

            {/* Profile Image Section */}
            <div className="w-full flex mt-10 justify-center">
                <div className="relative">
                    <img src={profile?.profile_image || img} className="w-24 h-24 rounded-full shadow-lg border-4 border-white" />
                </div>
            </div>

            {/* User Name */}
            <h3 className="text-black text-2xl font-bold text-center mt-4">{profile?.full_name}</h3>

            {/* Edit Profile Button */}
            <div className="w-full flex justify-center mt-5">
                <button 
                    className="bg-black text-white px-8 py-2 rounded-full shadow-lg hover:bg-gray-800 transition" 
                    onClick={() => navigate('/updateProfile')}>
                    Edit Profile
                </button>
            </div>

            {/* Shop Info (Outside Container) */}
            <div className="mt-10 px-6">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                    <GiShop className="text-blue-600 text-2xl" /> Shop Info
                </h4>
                <div className="border-b-[2px] border-gray-400 my-3 w-[80%]"></div>

                <div className="flex flex-col gap-3 text-gray-800">
                    <div className="flex items-center gap-2">
                        <GiShop className="text-gray-600 text-lg" />
                        <span className="font-medium">Shop Name:</span> {profile?.shop_number || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-600 text-lg" />
                        <span className="font-medium">Address:</span> {profile?.address || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCity className="text-gray-600 text-lg" />
                        <span className="font-medium">City:</span> {profile?.city || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaFlag className="text-gray-600 text-lg" />
                        <span className="font-medium">State:</span> {profile?.state || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaFlag className="text-gray-600 text-lg" />
                        <span className="font-medium">Country:</span> {profile?.country || "N/A"}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapPin className="text-gray-600 text-lg" />
                        <span className="font-medium">Pincode:</span> {profile?.pincode || "N/A"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
