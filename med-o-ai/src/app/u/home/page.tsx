import HomeTopbar from "@/components/HomeTopbar";
import PrescriptionsList from "@/components/PrescriptionsList";
import RecommendationList from "@/components/RecommendationList";

const Home = () => {
  return (
    <div className="min-h-screen mx-auto max-w-7xl">
      <HomeTopbar />
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <PrescriptionsList />
        <RecommendationList />
      </div>
    </div>
  );
};

export default Home;
