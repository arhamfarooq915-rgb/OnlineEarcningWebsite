import PageHeader from '../components/PageHeader';
import ContactInfoGrid from '../components/ContactInfoGrid';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div>
      <PageHeader title="Contact Us" breadcrumb="Contact Us" />
      <ContactInfoGrid />
      <ContactForm />
    </div>
  );
}