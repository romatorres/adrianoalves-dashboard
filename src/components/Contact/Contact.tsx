import { MapPin } from "lucide-react";
import Image from "next/image";

export function Contact() {
  return (
    <section
      id="contatos"
      className="py-12 md:py-16 lg:py-20 bg-black_secondary"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-primary font-normal text-primary mb-3">
            Contatos
          </h2>
          <div className="relative w-[96px] h-[22px] md:w-[120px] md:h-[28px]">
            <Image
              src="/img/bigode_primary.svg"
              alt="Bigode abaixo do titulo Serviços"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Endereço */}
          <div className="lg:text-start text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 font-secondary text-primary">
              Endereço
            </h3>
            <p className="text-white mb-6 md:text-xl text-lg font-secondary">
              Avenida Getúlio Vargas, 123 Centro - Feira de Santana - Ba
            </p>
            <a
              href="https://maps.app.goo.gl/kqbJLGPwqb2mLnwZ9?g_st=im"
              target="_blank"
              className="inline-flex items-center px-6 py-2 border-2 border-white text-white rounded-full 
                     hover:bg-secondary hover:text-black_secondary transition-colors duration-300"
            >
              <MapPin className="mr-2" size={20} />
              Localização
            </a>
          </div>

          {/* Horário */}
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 font-secondary text-primary">
              Horário de Funcionamento
            </h3>
            <div className="font-secondary text-white md:text-xl text-lg">
              <p className=" mb-3">Segunda a Sexta - 07 às 20hrs</p>
              <hr className="w-full h-1" />
              <p className="my-3">Sábado - 07 às 16hrs</p>
              <hr className="w-full h-1" />
            </div>
          </div>
          {/* Contatos */}
          <div className="lg:text-end text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 font-secondary text-primary">
              Contatos
            </h3>
            <div className="text-white font-secondary md:text-xl text-lg">
              <a
                href="https://wa.me/75988460046"
                target="_blank"
                className="inline-flex items-center hover:text-primary mb-1"
              >
                <Image
                  src="img/whatsapp.svg"
                  alt="Icone whatsapp"
                  width={24}
                  height={24}
                  className="mr-1"
                />
                75 98846-0046
              </a>
              <p className="mb-4">
                <a href="https://gmail.com" target="_blank">
                  caioadrianoteixeira@gmail.com
                </a>
              </p>
            </div>
            <div className="flex lg:justify-end justify-center space-x-6">
              <a href="https://www.instagram.com/adriano.alves.barbearia/">
                <Image
                  src="img/icon_insta_footer.svg"
                  alt="Icone Instagram"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </a>
              <a href="#">
                <Image
                  src="img/icon_X_footer.svg"
                  alt="Icone X"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </a>
              <a href="#">
                <Image
                  src="img/icon_face_footer.svg"
                  alt="Icone Face"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
