import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Surveys = () => {
    const axiosSecure = useAxiosSecure();
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
  
   // Fetch all surveys
   const { data: surveys = [], isLoading, error } = useQuery({
    queryKey:  ['recent-surveys', category, sort],
    queryFn: async () => {
      const response = await axiosSecure.get('/all-surveys', {
        params: { category, sort },
      });
      console.log(response.data);
      return response.data;
    },
  });
  
    if (isLoading) return <div>Loading surveys...</div>;
    if (error) return <div>Error loading surveys</div>;
  
    return (
      <div className="py-4 bg-white max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Zendesk | Surveys</title>
      </Helmet>
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          Available Surveys
        </h3>
        <div className="flex justify-center mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Product Quality">Product Quality</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Ambiance">Ambiance</option>
            <option value="Pricing">Pricing</option>
      
           
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Sort by</option>
            <option value="responseCount">Response Count</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys.map((survey) => (
          <div key={survey.qId} className="bg-white shadow-md rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">Title: {survey.title}</h4>
            <p className="text-gray-600 mb-4 font-bold">Description: {survey.description}</p>
            <p className="text-gray-600 mb-4 font-bold">Category: {survey.category}</p>
            <p className="text-gray-600 mb-4 font-bold">Total Votes: {survey.responseCount}</p>
            <Link to={`/survey/survey-view-details/${survey._id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
    );
  };

export default Surveys;