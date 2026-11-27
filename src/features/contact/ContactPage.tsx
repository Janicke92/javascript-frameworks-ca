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
        <section className="mx-auto w-full max-w-2xl">
            <h1 className="mb-6 text-3xl">Contact Us</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="fullName" className="form-label">
                        Full Name
                    </label>

                    <input
                        id="fullName"
                        type="text"
                        {...register("fullName")}
                        className="form-input"
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
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="form-input"
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
                        className="form-input"
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
                    <label htmlFor="message" className="form-label">
                        Message
                    </label>

                    <textarea
                        id="message"
                        {...register("message")}
                        className="form-input min-h-32"
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
                <div className="flex flex-col items-center gap-3">
                    <button
                        type="submit"
                        className="cursor-pointer rounded bg-green-200 px-4 py-3 font-semibold text-slate-900 transition-colors hover:bg-green-600 hover:text-white"
                    >
                        Send Message
                    </button>
                    {isSubmitted && (
                        <p role="status" className="text-green-600">
                            Your message has been submitted successfully!
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}

export default ContactPage;
