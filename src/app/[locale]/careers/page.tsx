"use client";

import { Header } from "@/components/layout/Header";
import Footer  from "@/section/landing/Footer";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";

// Mock job data
const jobOpenings = [
	{
		id: 1,
		title: "Senior Frontend Developer",
		department: "Engineering",
		location: "Remote / San Francisco",
		type: "Full-time",
		experience: "5+ years",
		description:
			"We're looking for a senior frontend developer to join our team and help build the next generation of our platform.",
		requirements: [
			"5+ years of experience with React and TypeScript",
			"Experience with Next.js and modern frontend tooling",
			"Strong understanding of web performance optimization",
			"Experience with design systems and component libraries",
			"Excellent communication and collaboration skills",
		],
		benefits: [
			"Competitive salary and equity",
			"Health, dental, and vision insurance",
			"Flexible work arrangements",
			"Professional development budget",
			"Unlimited PTO",
		],
		posted: "2024-01-15",
	},
	{
		id: 2,
		title: "Product Manager",
		department: "Product",
		location: "New York / Remote",
		type: "Full-time",
		experience: "3+ years",
		description:
			"Join our product team to drive the vision and strategy for our core platform features.",
		requirements: [
			"3+ years of product management experience",
			"Experience with B2B SaaS products",
			"Strong analytical and problem-solving skills",
			"Experience with user research and data analysis",
			"Excellent written and verbal communication",
		],
		benefits: [
			"Competitive salary and equity",
			"Health, dental, and vision insurance",
			"Flexible work arrangements",
			"Professional development budget",
			"Unlimited PTO",
		],
		posted: "2024-01-12",
	},
	{
		id: 3,
		title: "DevOps Engineer",
		department: "Engineering",
		location: "Remote",
		type: "Full-time",
		experience: "4+ years",
		description:
			"Help us scale our infrastructure and improve our deployment processes as we grow.",
		requirements: [
			"4+ years of DevOps/Infrastructure experience",
			"Experience with AWS, Docker, and Kubernetes",
			"Knowledge of CI/CD pipelines and automation",
			"Experience with monitoring and observability tools",
			"Strong scripting skills (Python, Bash, etc.)",
		],
		benefits: [
			"Competitive salary and equity",
			"Health, dental, and vision insurance",
			"Flexible work arrangements",
			"Professional development budget",
			"Unlimited PTO",
		],
		posted: "2024-01-10",
	},
	{
		id: 4,
		title: "UX Designer",
		department: "Design",
		location: "San Francisco / Remote",
		type: "Full-time",
		experience: "3+ years",
		description:
			"Create beautiful and intuitive user experiences that delight our customers.",
		requirements: [
			"3+ years of UX/UI design experience",
			"Proficiency in Figma and design systems",
			"Experience with user research and usability testing",
			"Strong portfolio showcasing design process",
			"Collaborative mindset and excellent communication",
		],
		benefits: [
			"Competitive salary and equity",
			"Health, dental, and vision insurance",
			"Flexible work arrangements",
			"Professional development budget",
			"Unlimited PTO",
		],
		posted: "2024-01-08",
	},
];

const departments = [
	"All",
	"Engineering",
	"Product",
	"Design",
	"Marketing",
	"Sales",
];
const locations = ["All", "Remote", "San Francisco", "New York"];
const jobTypes = ["All", "Full-time", "Part-time", "Contract"];

export default function CareersPage() {
	const [selectedJob, setSelectedJob] = useState<number | null>(null);
	const [departmentFilter, setDepartmentFilter] = useState("All");
	const [locationFilter, setLocationFilter] = useState("All");
	const [typeFilter, setTypeFilter] = useState("All");
	const [showApplicationForm, setShowApplicationForm] = useState(false);
	const [applicationData, setApplicationData] = useState({
		name: "",
		email: "",
		phone: "",
		coverLetter: "",
		resume: null as File | null,
	});

	const filteredJobs = jobOpenings.filter((job) => {
		return (
			(departmentFilter === "All" || job.department === departmentFilter) &&
			(locationFilter === "All" || job.location.includes(locationFilter)) &&
			(typeFilter === "All" || job.type === typeFilter)
		);
	});

	const handleApplicationSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send the application data to your API
		console.log("Application submitted:", applicationData);
		alert("Application submitted successfully!");
		setShowApplicationForm(false);
		setApplicationData({
			name: "",
			email: "",
			phone: "",
			coverLetter: "",
			resume: null,
		});
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setApplicationData((prev) => ({ ...prev, resume: file }));
	};

	return (
		<div className="min-h-screen">
			<Header />

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0 bg-gradient-to-br from-[#a000ff]/5 via-transparent to-[#ff006f]/5" />
				<div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#a000ff]/10 to-transparent rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#ff006f]/10 to-transparent rounded-full blur-3xl" />

				{/* Grid Pattern */}
				<div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `
              linear-gradient(rgba(160, 0, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(160, 0, 255, 0.1) 1px, transparent 1px)
            `,
							backgroundSize: "50px 50px",
						}}
					/>
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto"
					>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
							Join Our
							<span className="bg-gradient-to-r from-[#a000ff] to-[#ff006f] bg-clip-text text-transparent">
								{" "}
								Amazing Team
							</span>
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
							We're building the future of technology. Join us in creating
							innovative solutions that make a difference.
						</p>
						<div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
							<div className="flex items-center">
								<Icon
									icon="lucide:users"
									className="w-5 h-5 mr-2 text-[#a000ff]"
								/>
								<span>50+ Team Members</span>
							</div>
							<div className="flex items-center">
								<Icon
									icon="lucide:map-pin"
									className="w-5 h-5 mr-2 text-[#ff006f]"
								/>
								<span>Remote-First Culture</span>
							</div>
							<div className="flex items-center">
								<Icon
									icon="lucide:trending-up"
									className="w-5 h-5 mr-2 text-cyan-400"
								/>
								<span>Fast Growing</span>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Job Listings Section */}
			<section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.1 }}
						className="mb-12"
					>
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
							Open Positions
						</h2>
						<p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
							Discover exciting opportunities to grow your career with us.
						</p>
					</motion.div>

					{/* Filters */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6"
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label
										htmlFor={departmentFilter}
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Department
								</label>
								<select
									id={departmentFilter}
									value={departmentFilter}
									onChange={(e) => setDepartmentFilter(e.target.value)}
									className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
								>
									{departments.map((dept) => (
										<option key={dept} value={dept}>
											{dept}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor={locationFilter}
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Location
								</label>
								<select
									id={locationFilter}
									value={locationFilter}
									onChange={(e) => setLocationFilter(e.target.value)}
									className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
								>
									{locations.map((location) => (
										<option key={location} value={location}>
											{location}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor={typeFilter}
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Job Type
								</label>
								<select
									id={typeFilter}
									value={typeFilter}
									onChange={(e) => setTypeFilter(e.target.value)}
									className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
								>
									{jobTypes.map((type) => (
										<option key={type} value={type}>
											{type}
										</option>
									))}
								</select>
							</div>
						</div>
					</motion.div>

					{/* Job Cards */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{filteredJobs.map((job, index) => (
							<motion.div
								key={job.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.1 * index }}
								className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-[#a000ff]/10 transition-all duration-300 group"
							>
								<div className="flex justify-between items-start mb-4">
									<div>
										<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#a000ff] transition-colors duration-300">
											{job.title}
										</h3>
										<div className="flex flex-wrap gap-2 mb-3">
											<span className="px-3 py-1 bg-[#a000ff]/10 text-[#a000ff] rounded-full text-sm font-medium">
												{job.department}
											</span>
											<span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
												{job.type}
											</span>
										</div>
									</div>
									<button
										onClick={() =>
											setSelectedJob(selectedJob === job.id ? null : job.id)
										}
										className="p-2 text-gray-400 hover:text-[#a000ff] transition-colors duration-300"
									>
										<Icon
											icon={
												selectedJob === job.id
													? "lucide:chevron-up"
													: "lucide:chevron-down"
											}
											className="w-5 h-5"
										/>
									</button>
								</div>

								<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
									<div className="flex items-center">
										<Icon icon="lucide:map-pin" className="w-4 h-4 mr-1" />
										<span>{job.location}</span>
									</div>
									<div className="flex items-center">
										<Icon icon="lucide:briefcase" className="w-4 h-4 mr-1" />
										<span>{job.experience}</span>
									</div>
									<div className="flex items-center">
										<Icon icon="lucide:calendar" className="w-4 h-4 mr-1" />
										<span>{new Date(job.posted).toLocaleDateString()}</span>
									</div>
								</div>

								<p className="text-gray-600 dark:text-gray-300 mb-4">
									{job.description}
								</p>

								{selectedJob === job.id && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.3 }}
										className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4"
									>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<h4 className="font-semibold text-gray-900 dark:text-white mb-3">
													Requirements
												</h4>
												<ul className="space-y-2">
													{job.requirements.map((req, idx) => (
														<li
															key={idx}
															className="flex items-start text-sm text-gray-600 dark:text-gray-300"
														>
															<Icon
																icon="lucide:check"
																className="w-4 h-4 text-[#a000ff] mr-2 mt-0.5 flex-shrink-0"
															/>
															<span>{req}</span>
														</li>
													))}
												</ul>
											</div>
											<div>
												<h4 className="font-semibold text-gray-900 dark:text-white mb-3">
													Benefits
												</h4>
												<ul className="space-y-2">
													{job.benefits.map((benefit, idx) => (
														<li
															key={idx}
															className="flex items-start text-sm text-gray-600 dark:text-gray-300"
														>
															<Icon
																icon="lucide:star"
																className="w-4 h-4 text-[#ff006f] mr-2 mt-0.5 flex-shrink-0"
															/>
															<span>{benefit}</span>
														</li>
													))}
												</ul>
											</div>
										</div>
										<div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
											<button
												onClick={() => setShowApplicationForm(true)}
												className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#a000ff]/25 transition-all duration-300"
											>
												Apply for this Position
											</button>
										</div>
									</motion.div>
								)}
							</motion.div>
						))}
					</div>

					{filteredJobs.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center py-12"
						>
							<Icon
								icon="lucide:search-x"
								className="w-16 h-16 text-gray-400 mx-auto mb-4"
							/>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								No positions found
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Try adjusting your filters to see more opportunities.
							</p>
						</motion.div>
					)}
				</div>
			</section>

			{/* Application Form Modal */}
			{showApplicationForm && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
					>
						<div className="flex justify-between items-center mb-6">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
								Apply for Position
							</h3>
							<button
								onClick={() => setShowApplicationForm(false)}
								className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
							>
								<Icon icon="lucide:x" className="w-6 h-6" />
							</button>
						</div>

						<form onSubmit={handleApplicationSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="applicant-name"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>
										Full Name *
									</label>
									<input
										id={applicationData.name}
										type="text"
										required
										value={applicationData.name}
										onChange={(e) =>
											setApplicationData((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
										className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
										placeholder="Enter your full name"
									/>
								</div>
								<div>
									<label
										htmlFor="applicant-email"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>
										Email Address *
									</label>
									<input
										id={applicationData.email}
										type="email"
										required
										value={applicationData.email}
										onChange={(e) =>
											setApplicationData((prev) => ({
												...prev,
												email: e.target.value,
											}))
										}
										className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
										placeholder="Enter your email"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="applicant-phone"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Phone Number
								</label>
								<input
									id={applicationData.phone}
									type="tel"
									value={applicationData.phone}
									onChange={(e) =>
										setApplicationData((prev) => ({
											...prev,
											phone: e.target.value,
										}))
									}
									className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
									placeholder="Enter your phone number"
								/>
							</div>

							<div>
								<label
										htmlFor={applicationData.resume?.name}
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Resume/CV *
								</label>
								<div className="relative">
									<input
										id={applicationData.resume?.name}
										type="file"
										required
										accept=".pdf,.doc,.docx"
										onChange={handleFileChange}
										className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300"
									/>
									<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
										<Icon
											icon="lucide:upload"
											className="w-5 h-5 text-gray-400"
										/>
									</div>
								</div>
								<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
									Accepted formats: PDF, DOC, DOCX (Max 5MB)
								</p>
							</div>

							<div>
								<label
									htmlFor="applicant-cover-letter"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
								>
									Cover Letter *
								</label>
								<textarea
									id={applicationData.coverLetter}
									required
									rows={6}
									value={applicationData.coverLetter}
									onChange={(e) =>
										setApplicationData((prev) => ({
											...prev,
											coverLetter: e.target.value,
										}))
									}
									className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a000ff]/50 focus:border-[#a000ff]/50 transition-all duration-300 resize-none"
									placeholder="Tell us why you're interested in this position and what makes you a great fit..."
								/>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 pt-4">
								<button
									type="button"
									onClick={() => setShowApplicationForm(false)}
									className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="flex-1 px-6 py-3 bg-gradient-to-r from-[#a000ff] to-[#ff006f] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#a000ff]/25 transition-all duration-300"
								>
									Submit Application
								</button>
							</div>
						</form>
					</motion.div>
				</div>
			)}

			{/* Company Culture Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Why Work With Us?
						</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							We believe in creating an environment where everyone can thrive
							and do their best work.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								icon: "lucide:zap",
								title: "Innovation First",
								description:
									"Work on cutting-edge projects that push the boundaries of technology.",
								color: "from-[#a000ff] to-[#ff006f]",
							},
							{
								icon: "lucide:users",
								title: "Collaborative Culture",
								description:
									"Join a team that values collaboration, diversity, and inclusive thinking.",
								color: "from-[#ff006f] to-cyan-400",
							},
							{
								icon: "lucide:trending-up",
								title: "Growth Opportunities",
								description:
									"Continuous learning and career development with mentorship programs.",
								color: "from-cyan-400 to-[#a000ff]",
							},
							{
								icon: "lucide:home",
								title: "Work-Life Balance",
								description:
									"Flexible schedules and remote work options to fit your lifestyle.",
								color: "from-[#a000ff] to-[#ff006f]",
							},
							{
								icon: "lucide:heart",
								title: "Comprehensive Benefits",
								description:
									"Health insurance, equity, unlimited PTO, and professional development budget.",
								color: "from-[#ff006f] to-cyan-400",
							},
							{
								icon: "lucide:globe",
								title: "Global Impact",
								description:
									"Build products that are used by millions of people around the world.",
								color: "from-cyan-400 to-[#a000ff]",
							},
						].map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.1 * index }}
								className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-[#a000ff]/10 transition-all duration-300 group"
							>
								<div
									className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
								>
									<Icon icon={item.icon} className="w-6 h-6 text-white" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
									{item.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									{item.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
