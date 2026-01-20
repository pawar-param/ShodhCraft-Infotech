import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaPlus, FaClipboardList, FaBriefcase } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanel = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [contactQueries, setContactQueries] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });
  const [activeTab, setActiveTab] = useState("applications");
  const [searchQuery, setSearchQuery] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${apiUrl}/applications`);
      if (Array.isArray(res.data.applications)) {
        setApplications(res.data.applications);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const fetchContactQueries = async () => {
    try {
      const res = await axios.get(`${apiUrl}/contact`);
      if (Array.isArray(res.data.queries)) {
        setContactQueries(res.data.queries);
      }
    } catch (err) {
      console.error("Error fetching contactQueries:", err);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${apiUrl}/jobs`);
      if (Array.isArray(res.data.jobs)) {
        setJobs(res.data.jobs);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobs();
    fetchContactQueries();
  }, []);

  const handleDownload = (dataUrl, fileName) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleAddJob = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const payload = {
        ...newJob,
        requirements: newJob.requirements.split(",").map((r) => r.trim()),
      };

      await axios.post(`${apiUrl}/jobs/create`, payload);
      toast.success("Job added successfully!");

      setNewJob({
        title: "",
        description: "",
        location: "",
        salary: "",
        requirements: "",
      });

      fetchJobs();
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        await axios.delete(`${apiUrl}/jobs/${id}`);
        fetchJobs();
      } catch (err) {
        console.error("Error deleting job:", err);
      }
    }
  };

  const filteredApplications = applications.filter((app) =>
    Object.values(app).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-6 font-sans bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin Dashboard
      </h2>

      {/* Tab Buttons */}
      <div className="flex justify-center gap-6 mb-6 flex-wrap">
        <button
          className={`flex items-center gap-2 cursor-pointer px-5 py-2 rounded-full shadow-md transition ${
            activeTab === "applications"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
          onClick={() => setActiveTab("applications")}
        >
          <FaClipboardList /> Applications
        </button>
        <button
          className={`flex items-center cursor-pointer gap-2 px-5 py-2 rounded-full shadow-md transition ${
            activeTab === "Contact"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
          onClick={() => setActiveTab("Contact")}
        >
          <FaClipboardList /> Contact Queries
        </button>
        <button
          className={`flex items-center cursor-pointer gap-2 px-5 py-2 rounded-full shadow-md transition ${
            activeTab === "postJob"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
          onClick={() => setActiveTab("postJob")}
        >
          <FaPlus /> Post a Job
        </button>
        <button
          className={`flex items-center cursor-pointer gap-2 px-5 py-2 rounded-full shadow-md transition ${
            activeTab === "currentOpenings"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
          onClick={() => setActiveTab("currentOpenings")}
        >
          <FaBriefcase /> Current Openings
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Applications
            </h3>
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applications..."
                className="px-3 py-2 text-sm outline-none w-48 sm:w-64"
              />
              <div className="bg-gray-100 px-3 py-2">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </div>

          {filteredApplications.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No applications found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Sr",
                      "Name",
                      "Email",
                      "Phone",
                      "Year",
                      "Skills",
                      "Education",
                      "Location",
                      "Avail.",
                      "Job",
                      "Resume",
                    ].map((col, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 border-b text-left text-gray-700 font-medium tracking-wide"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app, index) => (
                    <tr
                      key={app._id}
                      className="border-b last:border-b-0 hover:bg-orange-50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{app.name}</td>
                      <td className="px-4 py-3">{app.email}</td>
                      <td className="px-4 py-3">{app.phone}</td>
                      <td className="px-4 py-3">{app.year}</td>
                      <td className="px-4 py-3">{app.skills}</td>
                      <td className="px-4 py-3">{app.education}</td>
                      <td className="px-4 py-3">{app.currentLocation}</td>
                      <td className="px-4 py-3">{app.availability}</td>
                      <td className="px-4 py-3">{app.jobTitle || "N/A"}</td>
                      <td className="px-4 py-3">
                        {app.resume ? (
                          <button
                            onClick={() => handleDownload(app.resume, app.name)}
                            className="bg-orange-600 hover:bg-orange-700 cursor-pointer text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200"
                          >
                            Download
                          </button>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {activeTab === "Contact" && (
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Contact Queries
            </h3>
          </div>
          {contactQueries.length === 0 ? (
            <p className="text-gray-600">No applications found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {[
                      "Query No",
                      "Company",
                      "Subject",

                      "Email",
                      "Phone",
                      "Contact Person",
                      "Message",
                    ].map((col, i) => (
                      <th key={i} className="px-3 py-2 border text-left">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contactQueries.map((app, index) => (
                    <tr key={app._id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{app.company}</td>
                      <td className="px-3 py-2">{app.subject}</td>

                      <td className="px-3 py-2">{app.email}</td>
                      <td className="px-3 py-2">{app.phone}</td>
                      <td className="px-3 py-2">{app.fullName}</td>
                      <td className="px-3 py-2">{app.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Post Job Tab */}
      {activeTab === "postJob" && (
        <section className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Post a New Job
          </h3>
          <div className="space-y-4">
            {["title", "location", "salary", "requirements"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field[0].toUpperCase() + field.slice(1)}
                value={newJob[field]}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            ))}
            <textarea
              name="description"
              placeholder="Job Description"
              value={newJob.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              rows={4}
            />
            <button
              onClick={handleAddJob}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded shadow cursor-pointer"
            >
              Post Job
            </button>
          </div>
        </section>
      )}

      {/* Current Openings Tab */}
      {activeTab === "currentOpenings" && (
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Current Job Openings
          </h3>
          {jobs.length === 0 ? (
            <p className="text-gray-600">No jobs posted yet.</p>
          ) : (
            <ul className="space-y-6">
              {jobs.map((job) => (
                <li key={job._id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        {job.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {job.location} | ₹{job.salary}
                      </p>
                      <p className="text-gray-700 mt-2">{job.description}</p>
                      {job.requirements?.length > 0 && (
                        <ul className="text-sm text-gray-600 mt-2 list-disc ml-5">
                          {job.requirements.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Posted on: {new Date(job.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-2 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default AdminPanel;
