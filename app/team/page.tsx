import PageHeader from '../components/PageHeader';
import TeamComponent from '../components/TeamComponent';
import TeamLeadershipSection from '../components/TeamLeadershipSection';
import CareersSection from '../components/CareersSection';

export default function Team() {
  return (
    <div>
      <PageHeader 
        title="Our Team" 
        breadcrumb="Our Team" 
        backgroundImage="/teams/team.jpg"
      />
      <TeamLeadershipSection />
      <TeamComponent/>
      <CareersSection />
    </div>
  );
}