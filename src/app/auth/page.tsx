import Image from 'next/image'

import { GithubIcon } from '../assets/github-icon'
import { GoogleIcon } from '../assets/google-icon'
import loginImage from '../assets/login-image.png'
import { RocketIcon } from '../assets/rocket-icon'

export default function Login() {
  return (
    <main className="max-h-screen flex p-5">
      <div className="flex items-center gap-56">
        <Image src={loginImage} alt="" className="h-full w-auto" />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-gray-100 text-2xl font-bold">Boas vindas!</h1>
            <h2 className="text-gray-200">
              Faça seu login ou acesse como visitante.
            </h2>
          </div>

          <div className="w-[372px] flex flex-col gap-4 text-gray-100">
            <div className="p-5 flex items-center gap-5 font-bold bg-gray-600 rounded-lg hover:cursor-pointer">
              <GoogleIcon />
              <p>Entrar com Google</p>
            </div>
            <div className="p-5 flex items-center gap-5 font-bold bg-gray-600 rounded-lg hover:cursor-pointer">
              <GithubIcon />
              <p>Entrar com GitHub</p>
            </div>
            <div className="p-5 flex items-center gap-5 font-bold bg-gray-600 rounded-lg hover:cursor-pointer">
              <RocketIcon />
              <p>Acessar como visitante</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
