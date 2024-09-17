import Image from 'next/image'

import loginImage from '../assets/login-image.png'
import { AccessOptions } from './components/access-options'

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

          <AccessOptions />
        </div>
      </div>
    </main>
  )
}
