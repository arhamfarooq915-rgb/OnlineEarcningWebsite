import PageHeader from '../components/PageHeader';
import AboutComponent from '../components/AboutComponent';
import CompanyNumbers from '../components/CompanyNumbers';
import LogisticBeyondExpectation from '../components/LogisticBeyondExpectation';

export default function About() {
  return (
    <div>
      <PageHeader title="About Us" breadcrumb="About Us" />
      <AboutComponent />
      <CompanyNumbers />
      <LogisticBeyondExpectation />
    </div>
  );
}