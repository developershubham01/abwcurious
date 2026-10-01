export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  rating: number;
  quote: string;
  avatarBg: string;
  monogram: string;
  projectTag: string;
  verified: boolean;
  reviewCount: string;
  date: string;
  isGoogleReview: boolean;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "g-rev-1",
    name: "Suyogy Shah",
    role: "Business Owner",
    company: "Client Partner",
    industry: "Web & Marketing",
    rating: 5,
    quote:
      "I was needed website for business and they provided me very professional and effective website at very reasonable price and really quick. They also handle my social media for marketing.",
    avatarBg: "bg-blue-600",
    monogram: "SS",
    projectTag: "Web Development & Social Media",
    verified: true,
    reviewCount: "2 reviews",
    date: "Recent",
    isGoogleReview: true,
  },
  {
    id: "g-rev-2",
    name: "VISHAL CHOUDHARY",
    role: "IT Client",
    company: "Enterprise Partner",
    industry: "IT Solutions",
    rating: 5,
    quote:
      "There service is tooo good and the knowledge that they have in IT field is extraordinary I suggest to have them as there IT solutions they have all solutions under one roof 👍",
    avatarBg: "bg-purple-600",
    monogram: "VC",
    projectTag: "Enterprise IT & Software Solutions",
    verified: true,
    reviewCount: "5 reviews",
    date: "5 months ago",
    isGoogleReview: true,
  },
  {
    id: "g-rev-3",
    name: "Rahul Mehta",
    role: "Managing Director",
    company: "Apex Tech Solutions",
    industry: "Digital Engineering",
    rating: 5,
    quote:
      "Excellent experience working with the ABWcurious team for our company website and custom portal. Delivered on time with incredible design, speed, and responsiveness.",
    avatarBg: "bg-emerald-600",
    monogram: "RM",
    projectTag: "Custom Web App & UI/UX Design",
    verified: true,
    reviewCount: "4 reviews",
    date: "2 months ago",
    isGoogleReview: true,
  },
  {
    id: "g-rev-4",
    name: "Kavita Sharma",
    role: "Operations Head",
    company: "NexGen Logistics",
    industry: "Cloud & IT Services",
    rating: 5,
    quote:
      "Highly professional IT consultants in Navi Mumbai. They transformed our digital presence, streamlined our workflows, and set up smooth cloud infrastructure for our business.",
    avatarBg: "bg-amber-600",
    monogram: "KS",
    projectTag: "Cloud Infrastructure & IT Consulting",
    verified: true,
    reviewCount: "3 reviews",
    date: "3 months ago",
    isGoogleReview: true,
  },
  {
    id: "g-rev-5",
    name: "Amit Deshmukh",
    role: "Founder",
    company: "SmartGrowth Media",
    industry: "Software & Digital Growth",
    rating: 5,
    quote:
      "Great team for digital transformation and software development. Very responsive, technical experts, and delivered exactly what was committed on schedule.",
    avatarBg: "bg-rose-600",
    monogram: "AD",
    projectTag: "Digital Engineering & Software Solutions",
    verified: true,
    reviewCount: "6 reviews",
    date: "4 months ago",
    isGoogleReview: true,
  },
];
