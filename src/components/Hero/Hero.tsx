import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative h-[640px] md:h-[680px] lg:h-[800px] bg-hero bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-background bg-opacity-50"></div>
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 h-full flex items-center">
        <div className="text-white w-full lg:w-4/5 mt-32">
          <h1 className="text-start text-primary text-5xl md:text-7xl lg:text-[130px] tracking-wider font-semibold font-quaternary">
            Corte perfeito, estilo único!
          </h1>
          <p className="lg:text-start text-center text-2xl md:text-3xl lg:text-4xl mb-20 max-w-5xl font-secondary">
            Desperte seu estilo com nossos serviços personalizados. Agende agora
            seu atendimento e transforme sua aparência...
          </p>
          <div className="flex flex-col md:flex-row items-center lg:justify-start md:justify-center gap-10 md:gap-24">
            <a
              href="https://avec.app/adrianoalves/"
              target="_blank"
              className="w-full sm:w-auto bg-primary text-black_secondary px-12 py-4 rounded-full font-semibold text-center
                     hover:bg-secondary transition-colors duration-300"
            >
              AGENDE UM HORÁRIO
            </a>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/adriano.alves.barbearia/"
                target="_blank"
              >
                <Image
                  src="/img/icon_insta.svg"
                  alt="Icone Instagam"
                  width={38}
                  height={38}
                />
              </a>
              <a href="#">
                <Image
                  src="/img/icon_X.svg"
                  alt="Icone Instagam"
                  width={38}
                  height={38}
                />
              </a>
              <a href="#">
                <Image
                  src="/img/icon_face.svg"
                  alt="Icone Instagam"
                  width={38}
                  height={38}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
