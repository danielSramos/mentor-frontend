import SkillBadge from "../components/badges/SkillBadge";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Testimonial from "../components/layouts/Testimonals";
import CardTutorSmall from "../components/tutor/CardTutorSmall";
import developers from "../mocks/tutores.json";
import testimonials from "../mocks/testimonials.json";
import { useNavigate } from "react-router";
import { Pricing } from "../components/Prices";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Testimonial testimonials={testimonials} />
      <section className="px-8 md:px-0">
        <div className="container mx-auto py-14">
          <h2 className="text-3xl font-bold text-slate-900">
            Busque em 5.400+<span className="block">mentores disponíveis</span>
          </h2>
        </div>
        <div className="container mx-auto pb-14">
          <div className="grid md:grid-cols-3 gap-6">
            {developers.map((dev) => (
              <CardTutorSmall
                name={dev.name}
                role={dev.role}
                rating={dev.rating}
                skills={dev.skills}
                photo={dev.photo}
                key={dev.id}
              />
            ))}
          </div>
        </div>
      </section>
      <Pricing />
      <Footer />
    </>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col justify-center py-14 px-8 md:px-0">
      <div className="flex flex-col text-center gap-6">
        <h3 className="text-md md:text-xl">
          Aprenda uma nova habilidade, lance um projeto e evolua na carreira
        </h3>
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Mentoria{" "}
          <span className="underline decoration-dashed decoration-blue-600">
            especializada
          </span>{" "}
          1 para 1
        </h1>
        <h2 className="text-md md:text-xl text-gray-600">
          Encontre um mentor hoje:
        </h2>

        <div className="flex w-full md:w-1/3 mx-auto gap-4 px-8">
          <input
            className="border h-14 rounded-lg w-full md:w-3/4 px-4"
            type="text"
            placeholder="Busque por habilidades, tecnologias, etc..."
          />
          <button
            onClick={() => navigate("/list")}
            className="md:w-1/4 px-6 bg-blue-600 text-white font-bold rounded-lg"
          >
            Buscar
          </button>
        </div>

        <div className="md:w-1/3 mx-auto">
          <SkillBadge
            skills={[
              "tecnologia",
              "ux/ui design",
              "gestão",
              "negócios",
              "financeiro",
              "startups",
            ]}
            is_small={false}
          />
        </div>

        <div className="container mx-auto py-6">
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-6 md:gap-24">
            <div className="flex flex-col items-start gap-3">
              <div className="text-3xl md:text-5xl font-bold">5.400+</div>
              <div className="text-md md:text-lg text-gray-600">
                Mentores disponíveis
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="text-3xl md:text-5xl font-bold">23.100+</div>
              <div className="text-md md:text-lg text-gray-600">
                Parcerias firmadas
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="text-3xl md:text-5xl font-bold">130+</div>
              <div className="text-md md:text-lg text-gray-600">
                Países representados
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
