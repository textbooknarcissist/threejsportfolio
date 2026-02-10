
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
    'Systems Architecture',
    'UI/UX Strategy',
    'Frontend Engineering',
    'Performance Auditing',
    'Mobile Interfaces',
    'WebGL / 3D Development'
];

const ContactForm: React.FC = () => {
    const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.email.trim()) {
            newErrors.email = 'Required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }
        if (!formData.service) newErrors.service = 'Please select a service';
        if (!formData.message.trim() || formData.message.length < 10) {
            newErrors.message = 'Please share a few more details';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('SENDING');

        try {
            // Using Formspree as requested for direct mailbox delivery
            const response = await fetch('https://formspree.io/f/mfredebel@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('SUCCESS');
                setFormData({ name: '', email: '', service: '', message: '' });
            } else {
                setStatus('ERROR');
            }
        } catch (err) {
            setStatus('ERROR');
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto glass rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500">
            <AnimatePresence mode="wait">
                {status === 'SUCCESS' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center py-12"
                    >
                        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-8 border border-indigo-500/20">
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                                className="text-indigo-500"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </motion.svg>
                        </div>
                        <h3 className="text-2xl font-display italic mb-4">Transmission Received</h3>
                        <p className="text-foreground/30 max-w-sm text-sm">
                            Your vision has been captured. I will reach out within 24 hours to discuss the next steps.
                        </p>
                        <button
                            onClick={() => setStatus('IDLE')}
                            className="mt-10 text-[10px] uppercase tracking-[0.3em] font-bold py-3.5 px-10 border border-foreground/10 rounded-full hover:bg-foreground hover:text-background transition-all"
                        >
                            Send another
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold ml-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Fredebel Menoh"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full bg-foreground/[0.03] border ${errors.name ? 'border-red-500/50' : 'border-foreground/10'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-foreground/40 text-foreground`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold ml-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="mfredebel@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full bg-foreground/[0.03] border ${errors.email ? 'border-red-500/50' : 'border-foreground/10'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-foreground/40 text-foreground`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold ml-1">Select a Service</label>
                            <div className="relative group z-20">
                                <select
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                    className={`w-full appearance-none bg-foreground/[0.03] border ${errors.service ? 'border-red-500/50' : 'border-foreground/10'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all cursor-pointer text-foreground`}
                                >
                                    <option value="" disabled className="bg-background">Choose expertise...</option>
                                    {SERVICES.map(s => (
                                        <option key={s} value={s} className="bg-background text-foreground py-2">{s}</option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30 text-foreground">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold ml-1">Your Message</label>
                            <textarea
                                rows={4}
                                placeholder="Briefly describe your project goals..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className={`w-full bg-foreground/[0.03] border ${errors.message ? 'border-red-500/50' : 'border-foreground/10'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all resize-none placeholder:text-foreground/40 text-foreground`}
                            />
                        </div>

                        <button
                            disabled={status === 'SENDING'}
                            className="w-full py-5 rounded-2xl bg-foreground text-background font-bold uppercase tracking-[0.3em] text-[10px] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl border border-background/10"
                        >
                            {status === 'SENDING' ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                'Send Inquiry'
                            )}
                        </button>

                        {status === 'ERROR' && (
                            <p className="text-center text-red-500 text-[10px] uppercase font-bold tracking-widest">
                                An error occurred. Please try again.
                            </p>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactForm;
