import PageHeader from "../components/PageHeader";
import JobApplicationForm from "../components/JobApplicationForm";

export default function Apply() {
  return (
    <div>
      <PageHeader 
        title="Job Application Form" 
        breadcrumb="Job Application Form" 
        backgroundImage="/generalImage.jpg"
      />
      <JobApplicationForm />
    </div>
  );
}