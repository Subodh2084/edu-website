"use client";

import { useState } from "react";
import TestimonialHeader from "@/components/admin/Testimonials/TestimonialHeader";
import TestimonialCard from "@/components/admin/Testimonials/TestimonialCard";
import type { Testimonial } from "@/types/testimonial";

const initialTestimonials: Testimonial[] = [
    {
        id: "1",
        student_name: "Sandip Gaire",
        profile_image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
        course_id: "1",
        course: "Full Stack Web Development",
        review:
            "The course was practical and helped me understand modern web development much better.",
        rating: 5,
        designation: "Frontend Developer",
        is_featured: true,
        is_active: true,
        display_order: 1,
    },
    {
        id: "2",
        student_name: "Aayush Sharma",
        profile_image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
        course_id: "2",
        course: "UI/UX Design Masterclass",
        review:
            "The instructors were supportive and the projects gave me useful real-world experience.",
        rating: 4,
        designation: "Web Designer",
        is_featured: false,
        is_active: true,
        display_order: 2,
    },
    {
        id: "3",
        student_name: "Sujan Karki",
        profile_image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
        course_id: "1",
        course: "Full Stack Web Development",
        review:
            "I really liked the practical approach and structured learning process.",
        rating: 5,
        designation: "Junior Developer",
        is_featured: true,
        is_active: true,
        display_order: 3,
    },
];

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] =
        useState<Testimonial[]>(initialTestimonials);

    const handleDelete = (id: string) => {
        setTestimonials((current) =>
            current.filter((testimonial) => testimonial.id !== id),
        );
    };

    return (
        <div className="space-y-6">
            <TestimonialHeader />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}