

'use client';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectContent,
} from "@/components/ui/select";
import { FaSpinner } from 'react-icons/fa';

const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
];
const identityOptions = [
    { label: 'Aadhaar', value: 'Aadhaar' },
    { label: 'PAN', value: 'PAN' },
    { label: 'Voter Card', value: 'VoterCard' },
    { label: 'Passport', value: 'Passport' },
];

export default function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState({});
    const [editLoading, setEditLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState("");
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const res = await fetch(`${apiUrl}/users/profile/full`, {
                    credentials: "include",
                    headers,
                });
                if (!res.ok) throw new Error("Not authorized or error fetching profile");
                const data = await res.json();
                setProfile(data.data);
                setEditData({});
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [editSuccess]);

    const handleEditChange = (field, value) => {
        setEditData((prev) => ({ ...prev, [field]: value }));
    };

    const handleEditToggle = () => {
        setEditMode((prev) => !prev);
        setEditData({});
        setEditSuccess("");
    };

    const handleUpdate = async () => {
        if (!Object.keys(editData).length) return;
        setEditLoading(true);
        setEditSuccess("");
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            const headers = {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };
            const res = await fetch(`${apiUrl}/users/profile`, {
                method: "PUT",
                credentials: "include",
                headers,
                body: JSON.stringify(editData),
            });
            if (!res.ok) throw new Error("Update failed");
            setEditSuccess("Profile updated successfully!");
            setEditData({});
            setEditMode(false);
        } catch (err) {
            setEditSuccess(err.message);
        } finally {
            setEditLoading(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <FaSpinner label="Loading profile..." />
            </div>
        );
    if (error)
        return (
            <div className="p-8 text-center text-red-500 font-semibold">{error}</div>
        );
    if (!profile) return null;

    const { user, lastCibil, loans } = profile;


    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card className="mb-8">
                <CardHeader className="flex flex-col items-start gap-2">
                    <h2 className="text-xl font-bold">User Profile</h2>
                    <span className="text-xs text-gray-500">ID: {user.id}</span>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={handleEditToggle} disabled={editLoading}>
                            {editMode ? 'Cancel' : 'Edit'}
                        </Button>
                    </div>
                    <Input
                        placeholder="Phone Number"
                        value={user.phoneNumber || ""}
                        disabled
                        fullWidth
                    />
                    <div className="flex gap-4">
                        {editMode ? (
                            <Input
                                placeholder="First Name"
                                value={editData.firstName ?? user.firstName ?? ""}
                                onChange={(e) => handleEditChange("firstName", e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <div className="w-full"><b>First Name:</b> {user.firstName || <span className="text-gray-400">N/A</span>}</div>
                        )}
                        {editMode ? (
                            <Input
                                placeholder="Last Name"
                                value={editData.lastName ?? user.lastName ?? ""}
                                onChange={(e) => handleEditChange("lastName", e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <div className="w-full"><b>Last Name:</b> {user.lastName || <span className="text-gray-400">N/A</span>}</div>
                        )}
                    </div>
                    {editMode ? (
                        <Input
                            placeholder="Middle Name"
                            value={editData.middleName ?? user.middleName ?? ""}
                            onChange={(e) => handleEditChange("middleName", e.target.value)}
                            fullWidth
                        />
                    ) : (
                        <div><b>Middle Name:</b> {user.middleName || <span className="text-gray-400">N/A</span>}</div>
                    )}
                    <div className="flex gap-4">
                        {editMode ? (
                            <Input
                                placeholder="Date of Birth"
                                type="date"
                                value={editData.dateOfBirth ?? (user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "")}
                                onChange={(e) => handleEditChange("dateOfBirth", e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <div className="w-full"><b>Date of Birth:</b> {user.dateOfBirth ? user.dateOfBirth.split("T")[0] : <span className="text-gray-400">N/A</span>}</div>
                        )}
                        {editMode ? (
                            <Select
                                value={editData.gender ?? user.gender ?? ""}
                                onValueChange={val => handleEditChange("gender", val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genderOptions.map((g) => (
                                        <SelectItem key={g.value} value={g.value}>
                                            {g.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <div className="w-full"><b>Gender:</b> {user.gender || <span className="text-gray-400">N/A</span>}</div>
                        )}
                    </div>
                    {editMode ? (
                        <Input
                            placeholder="Address"
                            value={editData.address ?? user.address ?? ""}
                            onChange={(e) => handleEditChange("address", e.target.value)}
                            fullWidth
                        />
                    ) : (
                        <div><b>Address:</b> {user.address || <span className="text-gray-400">N/A</span>}</div>
                    )}
                    <div className="flex gap-4">
                        {editMode ? (
                            <Input
                                placeholder="State"
                                value={editData.state ?? user.state ?? ""}
                                onChange={(e) => handleEditChange("state", e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <div className="w-full"><b>State:</b> {user.state || <span className="text-gray-400">N/A</span>}</div>
                        )}
                        {editMode ? (
                            <Input
                                placeholder="Pincode"
                                value={editData.pincode ?? user.pincode ?? ""}
                                onChange={(e) => handleEditChange("pincode", e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <div className="w-full"><b>Pincode:</b> {user.pincode || <span className="text-gray-400">N/A</span>}</div>
                        )}
                    </div>

                </CardContent>
                {editMode && (
                    <CardFooter className="flex flex-col gap-2 items-start">
                        <Button onClick={handleUpdate} isLoading={editLoading} disabled={!Object.keys(editData).length}>
                            Update Profile
                        </Button>
                        {editSuccess && <span className="text-green-600 text-sm">{editSuccess}</span>}
                    </CardFooter>
                )}
                {!editMode && editSuccess && (
                    <CardFooter className="flex flex-col gap-2 items-start">
                        <span className="text-green-600 text-sm">{editSuccess}</span>
                    </CardFooter>
                )}
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <h3 className="font-semibold">Last Submitted CIBIL</h3>
                </CardHeader>
                <CardContent>
                    {lastCibil ? (
                        <div className="space-y-2">
                            <div><b>Score:</b> {lastCibil.score || "N/A"}</div>
                            <div><b>Status:</b> {lastCibil.status}</div>
                            <div><b>Submitted:</b> {lastCibil.isSubmitted ? "Yes" : "No"}</div>
                            <div><b>Date:</b> {new Date(lastCibil.createdAt).toLocaleString()}</div>
                        </div>
                    ) : (
                        <div className="text-gray-500">No submitted CIBIL data found.</div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <h3 className="font-semibold">Your Loans</h3>
                </CardHeader>
                <CardContent>
                    {loans && loans.length > 0 ? (
                        <ul className="list-disc ml-6">
                            {loans.map((loan) => (
                                <li key={loan.id} className="mb-2">
                                    <b>{loan.type}</b> - ₹{loan.amount || "N/A"} | Status: {loan.status} | Applied: {new Date(loan.createdAt).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-gray-500">No loans found.</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
