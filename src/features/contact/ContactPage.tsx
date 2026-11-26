import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "./contactSchema";
import type { ContactFormData } from "./contactSchema";
import { useState } from "react";

function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
    });

    const onSubmit = (data: ContactFormData) => {
        console.log("Contact form submitted:", data);
        setIsSubmitted(true);
        reset();
    };

    return (
        <section>
            <h1>Contact Us</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="fullName">Full Name</label>

                    <input
                        id="fullName"
                        type="text"
                        {...register("fullName")}
                        className="border border-gray-400 rounded p-2"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={
                            errors.fullName ? "fullNameError" : undefined
                        }
                    />

                    {errors.fullName && (
                        <p
                            id="fullNameError"
                            role="alert"
                            className="text-red-600"
                        >
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="border border-gray-400 rounded p-2"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                            errors.email ? "emailError" : undefined
                        }
                    />

                    {errors.email && (
                        <p
                            id="emailError"
                            role="alert"
                            className="text-red-600"
                        >
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="subject">Subject</label>

                    <input
                        id="subject"
                        type="text"
                        {...register("subject")}
                        className="border border-gray-400 rounded p-2"
                        aria-invalid={!!errors.subject}
                        aria-describedby={
                            errors.subject ? "subjectError" : undefined
                        }
                    />

                    {errors.subject && (
                        <p
                            id="subjectError"
                            role="alert"
                            className="text-red-600"
                        >
                            {errors.subject.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="message">Message</label>

                    <textarea
                        id="message"
                        {...register("message")}
                        className="border border-gray-400 rounded p-2"
                        aria-invalid={!!errors.message}
                        aria-describedby={
                            errors.message ? "messageError" : undefined
                        }
                    />

                    {errors.message && (
                        <p
                            id="messageError"
                            role="alert"
                            className="text-red-600"
                        >
                            {errors.message.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    Send Message
                </button>
            </form>
            {isSubmitted && (
                <p role="status" className="text-green-600">
                    Your message has been submitted successfully!
                </p>
            )}
        </section>
    );
}

export default ContactPage;
