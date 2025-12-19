import HeroSection from '../components/HeroSection'
import SkillsSection from '../components/SkillsSection'
import StatsSection from '../components/StatsSection'
import ProjectsShowcase from '../components/ProjectsShowcase'
import BlogPreview from '../components/BlogPreview'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'
import FloatingIcons from '../components/FloatingIcons'

const Home = () => {
  return (
    <div className="min-h-screen">
      <FloatingIcons />
      <HeroSection />
      <StatsSection />
      <SkillsSection />
      <ProjectsShowcase />
      <BlogPreview />
      <Testimonials />
      <CTASection />
    </div>
  )
}

export default Home
