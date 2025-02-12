import Link from "next/link";
import Image from "next/image";

export function About() {
  return (
    <section id="quem-somos">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="bg-background w-full py-12 md:py-16">
          {/* Titulo */}
          <div className="mb-12 md:mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-6xl font-primary font-normal text-primary mb-3">
              Quem Somos
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

          {/* Seção Caracteristicas */}
          <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-0 lg:gap-10">
            {/* Col 1 */}
            <div className="flex flex-col items-center p-5 md:p-8 text-center max-w-96">
              <div className="flex justify-center mb-6 relative w-24 h-24">
                <Image
                  src="/img/iconMedalha.svg"
                  alt="Icone Medalha"
                  fill
                  className="md:w-24 w-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-secondary font-semibold mb-4 text-primary">
                TIME QUALIFICADO
              </h3>
              <p className="text-secondary font-tertiary">
                Nossa equipe de profissionais é apaixonada pelo que faz. Com
                criatividade, proporcionamos cortes e serviços de alta
                qualidade, priorizando a satisfação dos nossos clientes.
              </p>
            </div>
            {/* Col 2 */}
            <div className="flex flex-col items-center p-8 text-center max-w-96">
              <div className="flex justify-center mb-6 relative w-24 h-24">
                <Image
                  src="/img/iconProdutos.svg"
                  alt="Icone Produtos"
                  fill
                  className="md:w-24 w-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-secondary font-semibold mb-4 text-primary">
                PRODUTOS PREMIUM
              </h3>
              <p className="text-secondary font-tertiary">
                Na nossa barbearia, oferecemos produtos de alta qualidade, como
                pomadas, óleos e loções, todos formulados para cuidar do cabelo
                e da barba, garantindo estilo e saúde para nossos clientes.
              </p>
            </div>
            {/* Col 3 */}
            <div className="flex flex-col items-center p-8 text-center max-w-96">
              <div className="flex justify-center mb-6 relative w-24 h-24">
                <Image
                  src="/img/iconAmbiente.svg"
                  alt="Icone Ambiente"
                  fill
                  className="md:w-24 w-20 object-contain"
                />
              </div>
              <h3 className="text-xl font-secondary font-semibold mb-4 text-primary">
                AMBIENTE AGRADÁVEL
              </h3>
              <p className="text-secondary font-tertiary">
                A barbearia está situada no centro da cidade, com um ambiente
                acolhedor e descontraído, ideal para relaxar e cuidar do visual.
                Venha nos visitar e aproveite a experiência!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Nossa Historia */}
      <div className="bg-black_secondary w-full">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center py-12 md:py-16 lg:py-20">
            {/* Foto - Aparece primeiro no mobile */}
            <div className=" lg:order-2 lg:px-0 px-3 relative h-[412px] w-[320px] mx-auto lg:mx-0">
              <Image
                src="/img/adriano_quemsomos.jpg"
                alt="Fundador da Barbearia"
                fill
                className="object-cover rounded-xl h"
              />
            </div>
            {/* Texto - Aparece segundo no mobile */}
            <div className="lg:w-[60%] w-full lg:order-1 lg:text-left text-center">
              <h3 className="text-2xl md:text-4xl font-secondary font-semibold mb-8 text-primary">
                NOSSA HISTÓRIA
              </h3>
              <p className="text-secondary font-tertiary mb-4 text-lg">
                Fundada em 2018 por Adriano Alves, com 24 anos de experiência na
                profissão, nossa barbearia é referência em cuidado e estilo.
                Combinamos tradição e modernidade para oferecer mais do que
                cortes de cabelo e barba: uma experiência única, pensada para
                valorizar o visual e a confiança de cada cliente. Venha
                descobrir o diferencial de um atendimento feito por
                especialistas apaixonados pelo que fazem.
              </p>
              <div className="text-secondary mb-16">
                <span className="font-semibold text-xl">Adriano Alves</span> -
                <span className="text-base">Diretor e Fundador</span>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start mt-12 md:mt-auto">
                <Link
                  href="https://avec.app/adrianoalves/"
                  target="_blank"
                  className="w-full sm:w-auto bg-primary text-black_secondary px-12 py-4 rounded-full font-semibold text-center hover:bg-background hover:text-secondary transition-colors duration-300"
                >
                  AGENDE UM HORÁRIO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
