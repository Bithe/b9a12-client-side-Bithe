import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axiosSecure.get('/dashboard/admin/payments');
        setPayments(data);
      } catch (error) {
        setError(error.message);
        toast.error('Error fetching payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [axiosSecure]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto lg:px-20 lg:py-8">
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Email</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Amount</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Transaction ID</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Status</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Role</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border-b border-gray-200">{payment.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">${(payment.price / 100).toFixed(2)}</td>
              <td className="py-2 px-4 border-b border-gray-200">{payment.transactionId}</td>
              <td className="py-2 px-4 border-b border-gray-200">{payment.status}</td>
              <td className="py-2 px-4 border-b border-gray-200">{payment.role}</td>
              <td className="py-2 px-4 border-b border-gray-200">{new Date(payment.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPayments;
