import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { user } = useContext(AuthContext);
    const [selectedRole, setSelectedRole] = useState("");
    const axiosSecure = useAxiosSecure();

    // Mutation for updating user role
    const { mutateAsync } = useMutation({
      mutationFn: async (userData) => {
        const { data } = await axiosSecure.patch(`/users/update/${userData.email}`, userData);
        return data;
      },
      onSuccess: (data) => {
        refetch();
        console.log(data);
        toast.success("User role updated successfully!");
      },
    });

    // Fetch users data
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure('/users');
            return data;
        },
    });

    // Handle update role
    const handleUpdateRole = async (selectedUser) => {
        const { value: role } = await Swal.fire({
            title: "Manage user role",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update!",
            html: `
                <div class="mb-4">
                    <select name="role" id="selectedRole" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required>
                        <option value="">Select Role</option>
                        <option value="surveyor">Surveyor</option>
                        <option value="user">User</option>
                    </select>
                </div>
            `,
            preConfirm: () => {
                const role = document.getElementById('selectedRole').value;
                if (!role) {
                    Swal.showValidationMessage('Please select a role');
                }
                return role;
            }
        });

        if (role) {
            if (selectedUser.email === user.email) {
                toast.error('Action Not Allowed');
                return;
            }

            const userRole = {
                email: selectedUser.email,
                role,
                status: 'Verified',
            };

            try {
                await mutateAsync(userRole);
            } catch (err) {
                toast.error(err.message);
            }
        }
    };

    // Handle role filter change
    const handleRoleFilterChange = (e) => {
        setSelectedRole(e.target.value);
    };

    // Filtered users based on selected role
    const filteredUsers = selectedRole ? users.filter(user => user.role === selectedRole) : users;

    return (
        <div className="py-4 bg-white max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Admin | Manage Users</title>
            </Helmet>
            <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Users
                </h3>
            </div>

            {/* Role Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleFilter">
                    Filter by Role
                </label>
                <select
                    id="roleFilter"
                    value={selectedRole}
                    onChange={handleRoleFilterChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                    <option value="">All Roles</option>
                    <option value="surveyor">Surveyor</option>
                    <option value="user">User</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    {user.email}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    {user.role}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    {user.status}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleUpdateRole(user)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        Update Role
                                    </button>
                                    <span>|</span>
                                    <button
                                        className="text-red-600 hover:text-red-900 ml-4"
                                        // onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
