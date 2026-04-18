'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const jobSalaries = [
  { job: "Food Packing", salary: "3150 CAD" },
  { job: "Light Driving", salary: "3500 CAD" },
  { job: "Heavy Driving", salary: "3800 CAD" },
  { job: "Forklift Operator", salary: "3850 CAD" },
  { job: "Carpenter", salary: "3450 CAD" },
  { job: "Plumper", salary: "3300 CAD" },
  { job: "Electricion", salary: "3200 CAD" },
  { job: "Society Guard", salary: "3550 CAD" },
  { job: "Office Boy", salary: "3100 CAD" },
  { job: "Store Keeper", salary: "3600 CAD" },
  { job: "Cooking", salary: "3650 CAD" },
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Viet Nam", "Yemen", "Zambia", "Zimbabwe"
];

// Upload image to Cloudinary and return URL
async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  const data = await res.json();
  if (!data.secure_url) throw new Error('Image upload failed');
  return data.secure_url;
}

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    passportNumber: '',
    country: '',
    occupation: '',
    email: '',
    experienceCvName: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData(prev => ({ ...prev, experienceCvName: file.name }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // 1. Upload photo to Cloudinary
      let photoUrl = '';
      if (photoFile) {
        photoUrl = await uploadToCloudinary(photoFile);
      }

      const date = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });

      // 2. Send emails via EmailJS
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
      
      const emailParams = {
        full_name: formData.fullName,
        passport_number: formData.passportNumber,
        country: formData.country,
        occupation: formData.occupation,
        email: formData.email,
        date: date,
        photo_url: photoUrl,
      };

      await emailjs.send(serviceId, templateId, emailParams, publicKey);

      // 3. Submit to Google Sheets
      try {
        const sheetRes = await fetch('/api/submit-to-sheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formType: 'application',
            ...formData,
            photoUrl
          }),
        });
        if (!sheetRes.ok) console.error('Sheet sync failed');
      } catch (sheetError) {
        console.warn('Google Sheets sync skipped:', sheetError);
      }

      setMessage('Application submitted successfully! You will be notified once approved.');
      setFormData({ fullName: '', passportNumber: '', country: '', occupation: '', email: '', experienceCvName: '' });
      setPhotoFile(null);
      setPhotoPreview('');
      if (formRef.current) formRef.current.reset();

    } catch (error: any) {
      console.error('Submission technical details:', error);
      // EmailJS errors often come in an object with a text or message property
      const detail = error?.text || error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      setMessage(`Submission failed: ${detail}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="w-full max-w-xl">
          <div className="bg-white shadow-lg p-8">

            {message && (
              <div className={`mb-6 p-4 text-center font-bold text-base ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-base font-bold text-gray-800 mb-1">Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-400 focus:outline-none text-base bg-white" required />
              </div>

              <div>
                <label className="block text-base font-bold text-gray-800 mb-1">Passport Number:</label>
                <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-400 focus:outline-none text-base bg-white" required />
              </div>

              <div>
                <label className="block text-base font-bold text-gray-800 mb-1">Country:</label>
                <select name="country" value={formData.country} onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-400 focus:outline-none text-base bg-white" required>
                  <option value="">Select Country</option>
                  {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-base font-bold text-gray-800 mb-1">Occupation:</label>
                <select name="occupation" value={formData.occupation} onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-400 focus:outline-none text-base bg-white" required>
                  <option value="">Select Occupation</option>
                  {jobSalaries.map((item, i) => (
                    <option key={i} value={`${item.job} - ${item.salary}`}>{item.job} - {item.salary}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-base font-bold text-gray-800 mb-1">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-400 focus:outline-none text-base bg-white" required />
              </div>

              <div>
                <label className="block text-base font-bold text-gray-800 mb-1">Upload Image (Passport Size Photo):</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange}
                  className="w-full text-base text-gray-700 file:mr-3 file:py-1 file:px-3 file:border file:border-gray-400 file:bg-gray-100 file:text-gray-700 file:cursor-pointer cursor-pointer" required />
                {photoPreview && (
                  <img src={photoPreview} alt="Preview" className="mt-3 w-24 h-28 object-cover border border-gray-300" />
                )}
              </div>

              <div>
                <label className="block text-base font-bold text-gray-800 mb-1">Upload Experience Cv:</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvChange}
                  className="w-full text-base text-gray-700 file:mr-3 file:py-1 file:px-3 file:border file:border-gray-400 file:bg-gray-100 file:text-gray-700 file:cursor-pointer cursor-pointer" required />
                {formData.experienceCvName && (
                  <p className="mt-1 text-sm text-green-600 font-semibold">Selected: {formData.experienceCvName}</p>
                )}
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting}
                  className="px-8 py-3 text-white font-bold text-base transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#f13005', borderRadius: 0 }}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
